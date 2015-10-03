import React, {Component} from 'react';
import happycalculator from 'happycalculator';

import './calculator.scss';


export default class Calculator extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      result : 0
    }
  }

  handleSubmit(e) {
    const text = e.target.value.trim();

    if (e.which === 13) {
      try {
        this.setState({
          result : happycalculator.calculate(text)
        });
      } catch(error) {
        this.setState({
          result : error.message
        });
      }

    }
  }

  render() {

    const block = 'calculator';

    return (

      <div className={block}>

        <div className={`${block}__header`}>
          <input
            className={`${block}__input`}
            onKeyDown={this.handleSubmit.bind(this)}
            type="text"/>
        </div>

        <div className={`${block}__body`}>
          <div className={`${block}__result`}>
            <h1>{this.state.result}</h1>
          </div>
        </div>
      </div>

    );
  }
}



export default Calculator;