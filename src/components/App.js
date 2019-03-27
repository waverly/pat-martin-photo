import React, { Component } from "react";
import Prismic from "prismic-javascript";
import Nav from "./Nav";
import Index from "./Index";
import Home from "./Home";
import ColorToggle from "./ColorToggle";
import ReactCSSTransitionReplace from "react-css-transition-replace";
import "../css/App.css";

import { Switch, Route, HashRouter } from "react-router-dom";

const apiEndpoint = "https://patmartin.prismic.io/api/v2";

class App extends Component {
  constructor() {
    super();

    this.toggleWhite = this.toggleWhite.bind(this);
    this.toggleBlack = this.toggleBlack.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.handleIndexClick = this.handleIndexClick.bind(this);
    this.determineLoading = this.determineLoading.bind(this);
    this.toggleListView = this.toggleListView.bind(this);

    this.state = {
      slides: [],
      activeSlide: 0,
      invert: false,
      loaded: false,
      listView: false
    };
  }

  addData(item) {
    let counter = 0;
    const slides = { ...this.state.slides };
    item.forEach(d => {
      // console.log(d);
      // let timestamp = Date.now();
      // data[`item-${timestamp}`] = d;
      if (d.type === "image") {
        slides[counter] = d;
        counter++;
      }
      this.setState({ slides });
    });
  }

  toggleBlack() {
    const invert = true;
    this.setState({ invert });
  }

  toggleWhite() {
    const invert = false;
    this.setState({ invert });
  }

  toggleListView() {
    console.log("toggling list view");
    this.setState(prevState => ({
      listView: !prevState.listView
    }));
  }

  handleIndexClick(key) {
    console.log("clicked on index, key is", key);
    const activeSlide = parseFloat(key);
    console.log(activeSlide, key);
    this.setState({ activeSlide });
  }

  next() {
    const activeSlide =
      this.state.activeSlide === Object.keys(this.state.slides).length - 1
        ? 0
        : this.state.activeSlide + 1;
    this.setState({
      activeSlide
    });
  }

  previous() {
    const activeSlide =
      this.state.activeSlide === 0
        ? Object.keys(this.state.slides).length - 1
        : this.state.activeSlide - 1;
    this.setState({
      activeSlide
    });
  }

  determineLoading(time) {
    if (!this.state.loading) {
      setTimeout(() => {
        console.log("fading page in");
        this.setState({ loaded: true });
      }, time);
    }
  }

  componentDidMount() {
    // this.determineLoading();

    window.addEventListener("resize", () => {
      if (window.innerWidth > 999) {
        this.setState(prevState => ({
          listView: false
        }));
      }
    });

    Prismic.api(apiEndpoint).then(api => {
      api
        .query(Prismic.Predicates.at("document.type", "image"), {
          orderings: "[my.image.order]",
          pageSize: 100
        })
        .then(response => {
          // console.log(response); // response is the response object, response.results holds the documents
          // console.log(response.results);
          this.addData(response.results);
        });
    });

    Prismic.api(apiEndpoint).then(api => {
      api
        .query(Prismic.Predicates.at("document.type", "about"))
        .then(response => {
          console.log(response); // response is the response object, response.results holds the documents
          console.log(response.results);
          this.addData(response.results);
        });
    });
    // end of api
  }
  // end of didmount

  render() {
    return (
      <div className="router-ex">
        <HashRouter>
          <Route
            render={({ location }) => (
              <ReactCSSTransitionReplace
                transitionName="fade"
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}
              >
                <div
                  key={location.pathname}
                  className={this.state.invert ? "black" : "white"}
                >
                  <div
                    id="loading-screen"
                    className={this.state.loaded ? "loaded" : "not-loaded"}
                  />
                  <Route
                    path="/"
                    render={props => (
                      <Nav
                        toggleListView={this.toggleListView}
                        location={location}
                        invert={this.state.invert}
                        listView={this.state.listView}
                      />
                    )}
                  />
                  <Route
                    path="/"
                    render={props => (
                      <ColorToggle
                        toggleWhite={this.toggleWhite}
                        toggleBlack={this.toggleBlack}
                      />
                    )}
                  />
                  <Switch location={location}>
                    <Route
                      exact
                      path="/"
                      render={props => (
                        <Home
                          determineLoading={this.determineLoading}
                          next={this.next}
                          previous={this.previous}
                          activeSlide={this.state.activeSlide}
                          slides={this.state.slides}
                          listView={this.state.listView}
                        />
                      )}
                    />
                    <Route
                      exact
                      path="/index"
                      render={props => (
                        <Index
                          determineLoading={this.determineLoading}
                          slides={this.state.slides}
                          handleIndexClick={this.handleIndexClick}
                        />
                      )}
                    />
                  </Switch>
                </div>
              </ReactCSSTransitionReplace>
            )}
          />
        </HashRouter>
      </div>
    );
  }
}

export default App;
