import React from "react";
import { Link } from "react-router-dom";

import "../css/Nav.css";

const invertedStyles = {
  backgroundColor: "#121212"
};

const uninvertedStyles = {
  backgroundColor: "inherit"
};

class Nav extends React.Component {
  constructor() {
    super();

    this.handleInfo = this.handleInfo.bind(this);

    this.state = {
      showInfo: false
    };
  }

  handleInfo() {
    console.log("handling info");
    const showInfo = !this.state.showInfo;
    console.log(showInfo);
    this.setState({ showInfo });
  }

  componentDidMount() {}

  render() {
    const path = this.props.location.pathname;

    return (
      <div className="nav-wrap">
        <div className="name" onClick={this.handleInfo}>
          <p className="name-p">Pat Martin</p>
          <div
            className={this.state.showInfo ? "info reveal" : "info hide"}
            style={
              this.props.invert && this.state.showInfo
                ? invertedStyles
                : uninvertedStyles
            }
          >
            <p>IS A PHOTOGRAPHER FROM LOS ANGELES, CALIFORNIA.</p>
            <div className="bottom-info">
              <div className="item">
                <p>
                  FOR INQUIRIES OR TO SAY HI:
                  <br />
                  <a href="mailto:hipatmartin@gmail.com">
                    HIPATMARTIN@GMAIL.COM
                  </a>
                </p>
              </div>
              <div className="item">
                <p>
                  INSTAGRAM:
                  <a href="https://www.instagram.com/patmartin__/">
                    @PATMARTIN__
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {path === "/" ? (
          <div>
            <a className="listView" onClick={this.props.toggleListView}>
              {this.props.listView ? "Slideshow" : "List"}
            </a>
            <Link to={`/index`} className="index">
              Index
            </Link>
          </div>
        ) : (
          <Link to={`/`} className="home">
            Home
          </Link>
        )}
      </div>
    );
  }
}

export default Nav;
