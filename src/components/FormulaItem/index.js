import React, {Component} from 'react';


class FormulaItem extends Component {
  render() {
    return (
      <div>
        <p>id: {this.props.formula.id}</p>
        <p>name: {this.props.formula.name}</p>
        <p>content: {this.props.formula.content}</p>
      </div>
    )
  }
}


export default FormulaItem;