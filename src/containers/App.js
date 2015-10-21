import React, {Component, PropTypes} from 'react';

import Icon from '../components/Icon';
import ClearFix from '../components/ClearFix';

import './styles/app.scss';

class App extends Component {
  render() {

    const block = 'app';

    return (
      <div className={block}>
        <div className={`${block}__header`}>
          <Icon className={`${block}__logo`} name='calculator' size='l' />
          <h1 className={`${block}__title`}>happy calculator</h1>
          <ClearFix/>
        </div>
        <div className={`${block}__body`}>
          {this.props.children}
        </div>
      </div>

    );
  }
}



export default App;