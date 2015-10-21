import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';

import * as formulaActions from '../reducers/formulas';

import FormulaEditor from '../components/FormulaEditor';

class FormulaPage extends Component {


  render() {

    const {formulas, history, dispatch, params} = this.props;
    const actions = bindActionCreators(formulaActions, dispatch);
    let currentFormula = {
      id: '',
      name: '',
      content: ''
    };

    if(params.id) {
      currentFormula = _.find(formulas, {id : params.id});
    }

    return (
      <FormulaEditor actions={actions} history={history} formula={currentFormula}/>
    );
  }
}


FormulaPage.propTypes = {
  formulas: PropTypes.array.isRequired,
  dispatch : PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    formulas: state.formulas
  };
}

export default connect(mapStateToProps)(FormulaPage);


