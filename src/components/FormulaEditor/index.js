import React, {Component, PropTypes} from 'react';

import Modal from '../Modal';


import './formulaEditor.scss';


class FormulaEditor extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      name : '',
      content: '',
      modalIsOpen: this.props.isOpen
    };
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    })
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps);
    this.setState({
      modalIsOpen : newProps.isOpen
    });
  }

  handleSubmit() {
    let formula = {
      name : this.refs.formulaName.getDOMNode().value,
      content : this.refs.formulaContent.getDOMNode().value
    }

    this.props.save(formula);
    this.setState({
      modalIsOpen: false
    });
  }

  render() {

    const block = 'calculator';
    const modalBlock = 'calculator-modal';

    return (
      <Modal isOpen={this.state.modalIsOpen}>
        <div className={`${block}--controls ${modalBlock}__controls`}>
          <h1 className={`${modalBlock}__title`}>add a formula</h1>
        </div>
        <div className={`${block}--controls ${modalBlock}__controls`}>
          <input
            ref="formulaName"
            className={`${block}--input ${modalBlock}__input`}
            placeholder='Please Input Formula Name'
            type="text"/>
        </div>

        <div className={`${block}--controls ${modalBlock}__controls`}>
          <input
            ref="formulaContent"
            className={`${block}--input ${modalBlock}__input`}
            placeholder='Please Input Formula EXAMPLE: a+2+b'
            type="text"/>
        </div>

        <div className={`${block}--controls ${modalBlock}__controls`}>
          <button className={`${block}--button ${block}--button--primary`}
                  onClick={this.handleSubmit.bind(this)}>
            save
          </button>

          <button className={`${block}--button`}
                  onClick={this.closeModal.bind(this)}>
            cancel
          </button>
        </div>
      </Modal>
    );
  }
}

FormulaEditor.defaultProps = {
  isOpen: false
};

FormulaEditor.propTypes = {
  isOpen : PropTypes.bool.isRequired,
  save : PropTypes.func.isRequired
}

export default FormulaEditor;


