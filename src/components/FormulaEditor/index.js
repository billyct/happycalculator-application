import React, {Component} from 'react';

import History from 'history';

import { HAPPY } from '../../constants';

import Modal from '../Modal';


import './formulaEditor.scss';


class FormulaEditor extends Component {

  constructor(props, context) {

    super(props, context);

    this.state =  this.props.formula;
  }

  handleCancel() {
    this.props.history.pushState(null, `/calculator`);
  }

  handleChange(e) {
    let tmp = {};
    tmp[e.target.name] = e.target.value;
    this.setState(tmp);
  }


  handleSubmit() {

    const formula = this.state;
    const {actions} = this.props;

    if (formula.id !== '') {
      //edit
      actions.updateFormula(formula);
    } else {
      //create
      actions.createFormula(formula);
    }


    this.handleCancel();
  }

  render() {


    let formula = this.state;
    const block = 'formulaEditor';


    return (
      <div className={block}>
        <div className={`${HAPPY}--controls ${block}__controls`}>
          <h1 className={`${block}__title`}>add a formula</h1>
        </div>
        <div className={`${HAPPY}--controls ${block}__controls`}>
          <input
            value={formula.name}
            name='name'
            onChange={this.handleChange.bind(this)}
            className={`${HAPPY}--input ${block}__input`}
            placeholder='Please Input Formula Name'
            type="text"/>
        </div>

        <div className={`${HAPPY}--controls ${block}__controls`}>
          <input
            onChange={this.handleChange.bind(this)}
            value={formula.content}
            name='content'
            className={`${HAPPY}--input ${block}__input`}
            placeholder='Please Input Formula EXAMPLE: a+2+b'
            type="text"/>
        </div>

        <div className={`${HAPPY}--controls ${block}__controls`}>
          <input ref="formulaId" type='hidden' value={formula.id} />
          <button className={`${HAPPY}--button ${HAPPY}--button--primary`}
                  onClick={this.handleSubmit.bind(this)}>
            save
          </button>

          <button className={`${HAPPY}--button`}
                  onClick={this.handleCancel.bind(this)}>
            cancel
          </button>
        </div>
      </div>
    );
  }
}



export default FormulaEditor;


