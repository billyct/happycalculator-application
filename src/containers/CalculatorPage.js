import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as formulaActions from '../reducers/formulas';

import Calculator from '../components/Calculator';
import Icon from '../components/Icon';
import ClearFix from '../components/ClearFix';

import './styles/app.scss';

class CalculatorPage extends Component {
  render() {

    const {formulas, dispatch} = this.props;
    const actions = bindActionCreators(formulaActions, dispatch);
    const block = 'app';

    return (
      <div className={block}>
        <div className={`${block}__header`}>
          <Icon className={`${block}__logo`} name='calculator' size='l' />
          <h1 className={`${block}__title`}>happy calculator</h1>
          <ClearFix/>
        </div>

        <Calculator formulas={formulas} actions={actions}/>
      </div>

    );
  }
}

CalculatorPage.propTypes = {
  formulas: PropTypes.array.isRequired,
  dispatch : PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    formulas: state.formulas
  };
}

export default connect(mapStateToProps)(CalculatorPage);