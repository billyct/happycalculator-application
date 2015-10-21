import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as formulaActions from '../reducers/formulas';

import Calculator from '../components/Calculator';


class CalculatorPage extends Component {

  render() {

    const {formulas, dispatch} = this.props;
    const actions = bindActionCreators(formulaActions, dispatch);

    return (
      <Calculator formulas={formulas} actions={actions}/>
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