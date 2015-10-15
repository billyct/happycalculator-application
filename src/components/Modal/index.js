import React, {Component, PropTypes} from 'react';


import './modal.scss';

class Modal extends Component {
  render() {

    const block = 'modal';

    let style = {
      display: 'none'
    };

    if (this.props.isOpen) {
      style = {};
    }


    return (

      <div className={`${block}__overlay`} style={style}>
        <div className={`${block}__content`}>
          {this.props.children}
        </div>
      </div>

    )

  }
}

Modal.defaultProps = {
  isOpen: false
};

Modal.propTypes = {
  isOpen : PropTypes.bool.isRequired
}


export default Modal;


