import React, {Component} from 'react';
import happycalculator from 'happycalculator';
import Icon from '../Icon';
import ClearFix from '../ClearFix';
import Modal from '../Modal';

import FormulaEditor from '../FormulaEditor';
import FormulaItem from '../FormulaItem';

import './calculator.scss';

const block = 'calculator';
const modalBlock = 'calculator-modal';

export default class Calculator extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      result : 0,
      input: '',
      modalIsOpen: false
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


  openModal() {
    this.setState({
      modalIsOpen: true
    })
  }



  render() {


    return (

      <div className={block}>

        <FormulaEditor isOpen={this.state.modalIsOpen}
                       save={this.props.actions.createFormula}/>

        <div className={`${block}--controls`}>
          <div className={`${block}__result`}>{this.state.result}</div>
        </div>

        <div className={`${block}--controls`}>
          <input
            className={`${block}--input`}
            onChange={this.handleChange.bind(this)}
            onKeyDown={this.handleSubmitByKeyDown.bind(this)}
            autoFocus={true}
            value={this.state.input}
            type="text"/>
        </div>

        <div className={`${block}--controls`}>
          <button
            className={`${block}--button ${block}--button--primary`}
            onClick={this.handleSubmitByClick.bind(this)}>calculate</button>
        </div>

        <div className={`${block}--controls`}>
          <div className={`${block}__formulas`}>

            <div className={`${block}__formulas__header`}>
              <button className={`${block}--button ${block}--button--icon ${block}__formulas__header__button`}
                      onClick={this.openModal.bind(this)}>
                <Icon name="add" size="m"/>
              </button>

            </div>

            <div className={`${block}__formulas__body`}>

              {this.props.formulas.map(formula =>
                  <FormulaItem formula={formula} key={formula.id} remove={this.props.actions.removeFormula}/>
              )}


            </div>




          </div>
        </div>
      </div>

    );
  }
}



export default Calculator;