import React, {Component} from 'react';
import { Link } from 'react-router'
import happycalculator from 'happycalculator';
import elementClass from 'element-class';
import { COMMON_STYLE_CLASS } from '../../constants';
import { getCaretPosition, setSelectRange, getInputSelection, PrefixedEvent } from '../../helpers';

import Icon from '../Icon';
import ClearFix from '../ClearFix';
import confirm from '../Confirm';

import './calculator.scss';



export default class Calculator extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      result : 0,
      input: '',
    }
  }

  calculate(str) {
    try {
      let result = happycalculator.calculate(str);
      this.setState({
        result : result
      });
    } catch(error) {
      this.setState({
        result : error.message
      });
    }
  }

  handleChange(e) {
    this.setState({
      input : e.target.value
    })
  }

  handleSubmitByClick() {
    this.calculate(this.state.input);
  }

  handleSubmitByKeyDown(e) {
    if (e.which === 13) {
      if(!!this.state.input) {
        this.calculate(this.state.input)
      }
    }
  }

  handleRemoveFormula(formula) {
    //已经将confirm移动到reducer那边
    this.props.actions.removeFormulaWithConfirm(formula);
  }

  handleUseFormula(formula) {

    let inputState = this.state.input;
    let field = this.refs.calculatorInput.getDOMNode();
    let pos = getInputSelection(field);
    let params = _(happycalculator.convert(formula.content)).union().filter((param) => {
      //返回变量
      return /[^\d+\+\-\*\/\(\)]/.test(param);
    }).join(',');

    let inputFormula = `${formula.name}(${params})`;
    //将公式插入到input里面
    let newValue = `${inputState.substring(0, pos.start)}${formula.name}(${params})${inputState.substring(pos.end)}`;

    this.addFormula(formula, params);

    this.setState({
      input : newValue
    }, () => {
      //这里可以尝试高亮闪烁几下
      let selectionClassName = 'calculator__input--selection';


      if(elementClass(field).has(selectionClassName)) {
        elementClass(field).remove(selectionClassName);
      }

      elementClass(field).add(selectionClassName);

      PrefixedEvent(field, 'AnimationEnd', () => {
        elementClass(field).remove(selectionClassName);
      });

      setSelectRange(field, pos.start, pos.start + inputFormula.length);
      //可以尝试绑定两次关于tab键的参数跳转?

      //将formula添加到happy calculator



    });
  }

  addFormula(formula, params) {
    let tmp = {};
    let name = formula.name;
    let content = _.clone(formula.content);



    _.forEach(_.sortBy(params.split(','), (param) => {
      return -param.length;
    }), (param, key) => {
      content = content.replace(new RegExp(param, 'gm'), `$${key + 1}`);
    });


    tmp[name] = content;

    happycalculator.addFormulas(tmp);
  }


  renderFormulas() {

    let {formulas} = this.props;

    const block = 'formula';

    return (
      formulas.map(formula =>
          <div className={block} key={formula.id}>
            <div className={`${block}__header`}>
              <div className={`${block}__name`} onClick={this.handleUseFormula.bind(this, formula)}>
                {formula.name}
              </div>
              <div className={`${block}__toolbar`}>
                <Link to={`/formulas/${formula.id}`} className={`${COMMON_STYLE_CLASS}--button ${COMMON_STYLE_CLASS}--button--icon ${block}__button`}>
                  <Icon name="edit" size="s"/>
                </Link>
                <button className={`${COMMON_STYLE_CLASS}--button ${COMMON_STYLE_CLASS}--button--icon ${block}__button`}
                        onClick={this.handleRemoveFormula.bind(this, formula)}>
                  <Icon name="remove" size="s"/>
                </button>
              </div>

              <ClearFix />
            </div>

            <div className={`${block}__content`}>
              {formula.content}
            </div>
          </div>
      )
    );
  }



  render() {



    const block = 'calculator';


    return (

      <div className={block}>


        <div className={`${COMMON_STYLE_CLASS}--controls`}>
          <div className={`${block}__result`}>{this.state.result}</div>
        </div>

        <div className={`${COMMON_STYLE_CLASS}--controls`}>
          <input
            className={`${COMMON_STYLE_CLASS}--input ${block}__input`}
            onChange={this.handleChange.bind(this)}
            onKeyDown={this.handleSubmitByKeyDown.bind(this)}
            autoFocus={true}
            value={this.state.input}
            ref='calculatorInput'
            type="text"/>
        </div>

        <div className={`${COMMON_STYLE_CLASS}--controls`}>
          <button
            className={`${COMMON_STYLE_CLASS}--button ${COMMON_STYLE_CLASS}--button--primary`}
            onClick={this.handleSubmitByClick.bind(this)}
            disabled={!this.state.input}>calculate</button>
        </div>

        <div className={`${COMMON_STYLE_CLASS}--controls`}>
          <div className={`${block}__formulas`}>

            <div className={`${block}__formulas__header`}>

              <Link to='/formulas/create'
                    className={`${COMMON_STYLE_CLASS}--button ${COMMON_STYLE_CLASS}--button--icon ${block}__formulas__header__button`}>
                    <Icon name="add" size="m"/>
              </Link>


            </div>

            <div className={`${block}__formulas__body`}>

              {this.renderFormulas()}

            </div>
          </div>
        </div>
      </div>

    );
  }
}



export default Calculator;