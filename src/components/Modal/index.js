import React, {Component, PropTypes} from 'react';

import './modal.scss';

class Modal extends Component {
  render() {

    const block = 'modal';


    const styleContent = {
      width : this.props.width
    };
    
    let style = {
      display: 'none',
    };

    if (this.props.isOpen) {
      style = {};
    }


    return (

      <div className={`${block}__overlay`} style={style}>
        <div className={`${block}__content`} style={styleContent}>
          {this.props.children}
        </div>
      </div>

    )

  }
}

Modal.defaultProps = {
  isOpen: false,
  width : '400px'
};

Modal.propTypes = {
  isOpen : PropTypes.bool.isRequired,
  width : PropTypes.string.isRequired
}


export default Modal;


