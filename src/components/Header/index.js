import React, {Component} from 'react';
import {uuid} from '../../helpers';



class Header extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {text: ''};
  }

  handleSubmit(e) {
    let text = e.target.value.trim();
    if(e.which === 13) {
      this.props.onSave({
        id : uuid(),
        name : uuid(),
        content : text
      });

    }
  }


  render() {
    return (
      <div>
        <input type="text"  onKeyDown={this.handleSubmit.bind(this)}/>
      </div>
    )
  }
}


export default Header;