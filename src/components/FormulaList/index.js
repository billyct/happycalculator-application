import React, {Component} from 'react';
import FormulaItem from '../FormulaItem';
import Header from '../Header';


class FormulaList extends Component {
  render() {
    return (
      <div>
        <Header onSave={this.props.actions.createFormula}/>

        <ul>
          {this.props.formulas.map(formula =>
              <li key={formula.id}><FormulaItem formula={formula} /></li>
          )}
        </ul>
      </div>

    )
  }
}

export default FormulaList;
