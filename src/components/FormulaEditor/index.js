import React, {Component} from 'react';

import History from 'history';

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
    const block = 'calculator';
    const modalBlock = 'calculator-modal';


    return (
      <Modal isOpen={true}>
        <div className={`${block}--controls ${modalBlock}__controls`}>
          <h1 className={`${modalBlock}__title`}>add a formula</h1>
        </div>
        <div className={`${block}--controls ${modalBlock}__controls`}>
          <input
            value={formula.name}
            name='name'
            onChange={this.handleChange.bind(this)}
            className={`${block}--input ${modalBlock}__input`}
            placeholder='Please Input Formula Name'
            type="text"/>
        </div>

        <div className={`${block}--controls ${modalBlock}__controls`}>
          <input
            onChange={this.handleChange.bind(this)}
            value={formula.content}
            name='content'
            className={`${block}--input ${modalBlock}__input`}
            placeholder='Please Input Formula EXAMPLE: a+2+b'
            type="text"/>
        </div>

        <div className={`${block}--controls ${modalBlock}__controls`}>
          <input ref="formulaId" type='hidden' value={formula.id} />
          <button className={`${block}--button ${block}--button--primary`}
                  onClick={this.handleSubmit.bind(this)}>
            save
          </button>

          <button className={`${block}--button`}
                  onClick={this.handleCancel.bind(this)}>
            cancel
          </button>
        </div>
      </Modal>
    );
  }
}



export default FormulaEditor;


