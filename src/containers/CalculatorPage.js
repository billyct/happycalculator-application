import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as formulaActions from '../reducers/formulas';

import Calculator from '../components/Calculator';
import confirm from '../components/Confirm';


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


export default connect(
  state => ({
    formulas: state.formulas
  })
)(CalculatorPage);