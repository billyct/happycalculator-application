import React, {Component} from 'react';
import {SVG_URL} from '../../constants';

import './icon.scss';

class Icon extends Component {
  //from https://github.com/saulhoward/react-evil-icons/blob/master/src/Icon.js and some change

  render() {
    let block = 'icon';
    let classNameSize = this.props.size ? `${block}--${this.props.size}` : '';
    let classNameComponent = `${block} ${block}--${this.props.name} ${classNameSize} ${this.props.className}`;
    let useTag = `<use xlink:href="${SVG_URL}#icon--${this.props.name}" />`;

    let Icon = (
      <svg className={`${block}__cnt`} dangerouslySetInnerHTML={{__html: useTag}}></svg>
    );

    if (this.props.spinner !== '') {
      Icon = (
        <div className={`${block}__spinner ${block}__spinner--${this.props.spinner}`}>{Icon}</div>
      )
    }

    return (
      <div className={classNameComponent}>
        {Icon}
      </div>
    );
  }
}

Icon.defaultProps = {
  spinner : '',
  className : ''
};

Icon.propTypes = {
  spinner: React.PropTypes.string,
  size: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  className: React.PropTypes.string
};


export default Icon;