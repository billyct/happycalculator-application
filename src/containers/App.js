import React, {Component, PropTypes} from 'react';





class App extends Component {
  render() {

    const {history} = this.props;
    const block = 'app';

    return (
      {history}
    );
  }
}



export default App;