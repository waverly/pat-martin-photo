import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Slideshow from "./Slideshow";
import List from "./List";

import "../css/Home.css";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      animationDirection: "previous",
      listViewImages: []
    };
  }

  componentDidMount() {
    this.props.determineLoading(2000);
  }

  render() {
    if (!this.props.listView) {
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
    } else {
      return (
        <ReactCSSTransitionGroup
          transitionName="load"
          transitionAppear={true}
          transitionEnterTimeout={700}
          transitionAppearTimeout={700}
          transitionLeaveTimeout={700}
        >
          <List slides={this.props.slides} />
        </ReactCSSTransitionGroup>
      );
    }
  }
}

export default Home;
