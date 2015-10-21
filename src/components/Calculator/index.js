import React, {Component} from 'react';
import { Link } from 'react-router'
import happycalculator from 'happycalculator';
import { HAPPY } from '../../constants';

import Icon from '../Icon';
import ClearFix from '../ClearFix';
import Modal from '../Modal';

import FormulaEditor from '../FormulaEditor';
import FormulaItem from '../FormulaItem';

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
      this.calculate(this.state.input)
    }
  }

  handleRemoveFormula(formula) {
    this.props.actions.removeFormula(formula);
  }



  render() {

    let {formulas} = this.props;

    const block = 'calculator';


    return (

      <div className={block}>


        <div className={`${HAPPY}--controls`}>
          <div className={`${block}__result`}>{this.state.result}</div>
        </div>

        <div className={`${HAPPY}--controls`}>
          <input
            className={`${HAPPY}--input`}
            onChange={this.handleChange.bind(this)}
            onKeyDown={this.handleSubmitByKeyDown.bind(this)}
            autoFocus={true}
            value={this.state.input}
            type="text"/>
        </div>

        <div className={`${HAPPY}--controls`}>
          <button
            className={`${HAPPY}--button ${HAPPY}--button--primary`}
            onClick={this.handleSubmitByClick.bind(this)}>calculate</button>
        </div>

        <div className={`${HAPPY}--controls`}>
          <div className={`${block}__formulas`}>

            <div className={`${block}__formulas__header`}>

              <Link to='/formulas/create'
                    className={`${HAPPY}--button ${HAPPY}--button--icon ${block}__formulas__header__button`}>
                    <Icon name="add" size="m"/>
              </Link>


            </div>

            <div className={`${block}__formulas__body`}>

              {formulas.map(formula =>
                  <div className={`${block}__formula`} key={formula.id}>
                    <div className={`${block}__formula__name`}>
                      {formula.name}
                    </div>
                    <div className={`${block}__formula__toolbar`}>
                      <Link to={`/formulas/${formula.id}`} className={`${HAPPY}--button ${HAPPY}--button--icon ${block}__formula__button`}>
                        <Icon name="edit" size="s"/>
                      </Link>
                      <button className={`${HAPPY}--button ${HAPPY}--button--icon ${block}__formula__button`}
                              onClick={this.handleRemoveFormula.bind(this, formula)}>
                        <Icon name="remove" size="s"/>
                      </button>
                    </div>
                    <ClearFix />
                  </div>
              )}

            </div>
          </div>
        </div>
      </div>

    );
  }
}



export default Calculator;