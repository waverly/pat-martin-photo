import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Slideshow from "./Slideshow";

import "../css/Home.css";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      animationDirection: "previous"
    };
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="load"
        transitionAppear={true}
        transitionEnterTimeout={700}
        transitionAppearTimeout={700}
        transitionLeaveTimeout={700}
      >
        <div className="slideshow-component">
          <Slideshow
            next={this.props.next}
            previous={this.props.previous}
            activeSlide={this.props.activeSlide}
            slides={this.props.slides}
          />
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default Home;
