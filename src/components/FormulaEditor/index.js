import React, {Component} from 'react';

import History from 'history';

import { COMMON_STYLE_CLASS, I18n } from '../../constants';

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
        <div className={`${COMMON_STYLE_CLASS}--controls ${block}__controls`}>
          <h1 className={`${block}__title`}>{I18n.get('FORMULA_EDITOR__ADD_A_FORMULA')}</h1>
        </div>
        <div className={`${COMMON_STYLE_CLASS}--controls ${block}__controls`}>
          <input
            value={formula.name}
            name='name'
            onChange={this.handleChange.bind(this)}
            className={`${COMMON_STYLE_CLASS}--input ${block}__input`}
            placeholder={I18n.get('FORMULA_EDITOR__NAME_PLACEHOLDER')}
            type="text"/>
        </div>

        <div className={`${COMMON_STYLE_CLASS}--controls ${block}__controls`}>
          <input
            onChange={this.handleChange.bind(this)}
            value={formula.content}
            name='content'
            className={`${COMMON_STYLE_CLASS}--input ${block}__input`}
            placeholder={I18n.get('FORMULA_EDITOR__CONTENT_PLACEHOLDER')}
            type="text"/>
        </div>

        <div className={`${COMMON_STYLE_CLASS}--controls ${block}__controls`}>
          <input ref="formulaId" type='hidden' value={formula.id} />
          <button className={`${COMMON_STYLE_CLASS}--button ${COMMON_STYLE_CLASS}--button--primary`}
                  onClick={this.handleSubmit.bind(this)}
                  disabled={!formula.name || !formula.content}>
            {I18n.get('COMMON__SAVE')}
          </button>

          <button className={`${COMMON_STYLE_CLASS}--button`}
                  onClick={this.handleCancel.bind(this)}>
            {I18n.get('COMMON__CANCEL')}
          </button>
        </div>
      </div>
    );
  }
}



export default FormulaEditor;


