import React, {Component, PropTypes} from 'react';

import { COMMON_STYLE_CLASS } from '../../constants';

import Modal from '../Modal';
import ClearFix from '../ClearFix';

import './confirm.scss';

class Confirm extends Component {

  componentDidMount() {
    React.findDOMNode(this.refs.confirm).focus();
  }

  cleanup() {
    let wrapper = React.findDOMNode(this).parentNode;
    //移除掉confirm
    React.unmountComponentAtNode(wrapper);
    setTimeout(() => wrapper.remove());
  }

  handle(callback) {
    callback();
    //不管你是ok 还是cancel 都要执行 移除掉
    this.cleanup();
  }


  render() {

    const {message, confirmLabel, abortLabel, confirmHandler, abortHandler} = this.props;
    const block = 'confirm';

    return (
      <Modal isOpen={true} width='500px'>
        <div className={block} ref='confirm'>
          <div className={`${COMMON_STYLE_CLASS}--controls ${block}__message`}>
            {message}
          </div>

          <div>

            <button className={`${COMMON_STYLE_CLASS}--button ${COMMON_STYLE_CLASS}--button--second ${block}__button`}
                    onClick={this.handle.bind(this, confirmHandler)}>
              {confirmLabel}
            </button>

            <button className={`${COMMON_STYLE_CLASS}--button ${block}__button`}
                    onClick={this.handle.bind(this, abortHandler)}>
              {abortLabel}
            </button>

            <ClearFix />

          </div>

        </div>
      </Modal>
    )
  }
}

Confirm.defaultProps = {
  confirmLabel: 'ok',
  abortLabel: 'cancel',
  confirmHandler : () => {},
  abortHandler : () => {}
};


Confirm.propTypes = {
  confirmLabel : PropTypes.string,
  abortLabel : PropTypes.string,
  confirmHandler : PropTypes.func,
  abortHandler : PropTypes.func
};


export default function confirm(message, options = {}) {
  let props = _.assign({
    message : message
  }, options);

  //将confirm 插进去
  let wrapper = document.body.appendChild(document.createElement('div'));
  React.render(React.createElement(Confirm, props), wrapper);


}