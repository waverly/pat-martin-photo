import React from 'react';
import { Link } from 'react-router-dom';

import '../css/Nav.css';

class Nav extends React.Component {


  constructor(){
    super();

    this.handleInfo = this.handleInfo.bind(this);

    this.state = {
      showInfo: false,
    }

  }

  handleInfo(){
    console.log('handling info');
    const showInfo = !(this.state.showInfo);
    console.log(showInfo);
    this.setState({showInfo});
  }

  componentDidMount(){
  }

  render(){
    const path = this.props.location.pathname;

    return(
      <div className="nav-wrap">
        <div className="name" onClick={this.handleInfo}>
          <p className="name-p">Pat Martin</p>
          <div
            className={
              this.state.showInfo ? 'info reveal' : 'info hide'
            }
          >
              <p>is an artist and photographer from Los Angeles.</p>
            <div className="bottom-info">
              <div className="item">
                <p>1.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
              </div>
              <div className="item">
                <p>2.</p>
                <p>Personal</p>
                <p>hipatmartin@gmail.com</p>
              </div>
              <div className="item">
                <p>2.</p>
                <p>Instagram</p>
                <p>@patmartin__</p>
              </div>
            </div>
          </div>
        </div>

        {
          path === '/' ?
            ( <Link to={`/index`} className="index">Index</Link> )
            : (<Link to={`/`} className="home">Home</Link>)
        }

      </div>
    )
  }
}

export default Nav;
