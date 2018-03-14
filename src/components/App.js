import React, { Component } from 'react';
import Prismic from 'prismic-javascript';
import Nav from './Nav';
import Index from './Index';
import Home from './Home';
import ColorToggle from './ColorToggle';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import '../css/App.css';

import { Switch, Route } from 'react-router-dom';

const apiEndpoint = 'https://patmartinclone.prismic.io/api/v2';

class App extends Component {

  constructor(){
    super();

    this.toggleWhite = this.toggleWhite.bind(this);
    this.toggleBlack = this.toggleBlack.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.handleIndexClick = this.handleIndexClick.bind(this);

    this.state = {
      images: {},
      activeSlide: 0,
      invert: false
    };
  }

  addData(item){
    let counter = 0;
    const images = {...this.state.images};
    item.forEach( (d) => {
      // let timestamp = Date.now();
      // data[`item-${timestamp}`] = d;
      if (d.type === "image"){
        images[counter] = d.data.image.url;
        counter++;
      }
      this.setState({ images });
    });
  }

  toggleBlack(){
    const invert = true;
    this.setState({ invert });
  }

  toggleWhite(){
    const invert = false;
    this.setState({ invert });
  }

  handleIndexClick(key){
    console.log('clicked on index, key is', key);
    const activeSlide = parseFloat(key);
    console.log(activeSlide, key);
    this.setState({activeSlide});
  }

  next() {
    const activeSlide = (this.state.activeSlide === Object.keys(this.state.images).length - 1) ? 0 : this.state.activeSlide + 1;
    this.setState({
      activeSlide
    })
  }

  previous() {
    const activeSlide = (this.state.activeSlide === 0) ? Object.keys(this.state.images).length - 1 : this.state.activeSlide - 1;
    this.setState({
      activeSlide
    })
  }

  componentDidMount(){
    Prismic.api(apiEndpoint).then(api => {
      api.query("")
      .then(response => {
        console.log(response)// response is the response object, response.results holds the documents
        this.addData(response.results)
      })
    });
    // end of api

  }
  // end of didmount


  render() {

    return (

      <div className="router-ex">
        <Route render={({location}) => (
          <ReactCSSTransitionReplace
            transitionName="fade"
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}
          >
            <div key={location.pathname} className={this.state.invert ? 'black' : 'white'}>
              <Route path="/" component={Nav}  />
              <Route path="/" render={(props) => (
                <ColorToggle toggleWhite={this.toggleWhite} toggleBlack={this.toggleBlack}/>
              )} />
              <Switch location={location}>
                <Route exact path='/' render={(props) => (
                  <Home
                    next={this.next}
                    previous={this.previous}
                    activeSlide={this.state.activeSlide}
                    images={this.state.images}/>
                )} />
                <Route exact path='/index' render={(props) => (
                  <Index
                    images={this.state.images}
                    handleIndexClick={this.handleIndexClick}
                  />
                )} />
              </Switch>
            </div>
          </ReactCSSTransitionReplace>
            )}/>
      </div>





        // <div className={this.state.invert ? 'black' : 'white'}>
        //   <Route path="/" component={Nav}  />
        //   <Route path="/" render={(props) => (
        //     <ColorToggle toggleWhite={this.toggleWhite} toggleBlack={this.toggleBlack}/>
        //   )} />
        //   <Switch>
        //     <Route exact path='/' render={(props) => (
        //       <Home images={this.state.images}/>
        //     )} />
        //     <Route exact path='/index' render={(props) => (
        //       <Index images={this.state.images}/>
        //     )} />
        //   </Switch>
        // </div>


    );
  }
}

export default App;
