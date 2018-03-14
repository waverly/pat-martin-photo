import React from 'react';

import '../css/ColorToggle.css';

class ColorToggle extends React.Component {


  constructor(){
    super();
    this.toggleState = this.toggleState.bind(this);
  }

  toggleState(){
    console.log('toggling color state');
  }

  componentDidMount(){
  }

  render(){

    return(
      <div className="toggle-wrap">
        <div onClick={this.props.toggleBlack} className="toggle black"></div>
        <div onClick={this.props.toggleWhite} className="toggle white"></div>
      </div>
    )
  }
}

export default ColorToggle;
