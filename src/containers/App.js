import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {languages} from '../constants';

import * as configActions from '../reducers/config';

import Icon from '../components/Icon';
import ClearFix from '../components/ClearFix';

import './styles/app.scss';

class App extends Component {


  handleChangeLanguage(e) {
    this.props.dispatch(configActions.updateConfigWithReload({
      language : e.target.value
    }));

  }

  render() {

    const {config} = this.props;
    const block = 'app';

    return (
      <div className={block}>
        <div className={`${block}__header`}>
          <div className={`${block}__language`}>
            <select value={config.language} onChange={this.handleChangeLanguage.bind(this)}>
              {languages.map(language =>
                <option key={language.name} value={language.name}>{language.label}</option>
              )}
            </select>
          </div>
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

App.propTypes = {
  config: PropTypes.object.isRequired,
  dispatch : PropTypes.func.isRequired
};


export default connect(
  state => ({
    config: state.config
  })
)(App);