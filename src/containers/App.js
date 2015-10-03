import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as formulaActions from '../reducers/formulas';

import FormulaList from '../components/FormulaList';

class App extends Component {
  render() {

    const {formulas, dispatch} = this.props;
    const actions = bindActionCreators(formulaActions, dispatch);

    return (
      <FormulaList formulas={formulas} actions={actions}/>
    );
  }
}

App.propTypes = {
  formulas: PropTypes.array.isRequired,
  dispatch : PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    formulas: state.formulas
  };
}


export default connect(mapStateToProps)(App);