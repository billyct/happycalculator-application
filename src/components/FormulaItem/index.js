import React, {Component} from 'react';
import Icon from '../Icon';
import ClearFix from '../ClearFix';


class FormulaItem extends Component {

  handleRemove(){
    this.props.removeHandler(this.props.formula);
  }

  handleEdit(){
    this.props.editHandler();
  }


  render() {

    const block = 'calculator';

    return (

      <div className={`${block}__formula`}>
        <div className={`${block}__formula__name`}>
          {this.props.formula.name}
        </div>
        <div className={`${block}__formula__toolbar`}>
          <button className={`${block}--button ${block}--button--icon ${block}__formula__button`}
                  onClick={this.handleEdit.bind(this)}>
            <Icon name="edit" size="s"/>
          </button>
          <button className={`${block}--button ${block}--button--icon ${block}__formula__button`}
                  onClick={this.handleRemove.bind(this)}>
            <Icon name="remove" size="s"/>
          </button>
        </div>
        <ClearFix />
      </div>

    )
  }
}


export default FormulaItem;