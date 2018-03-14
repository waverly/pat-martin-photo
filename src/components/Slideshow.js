import React from 'react';
import '../css/Slideshow.css';

const Slide = (props) => {
  const { image, active }= props
  return (

  <img
    className="slide"
    src={image}
    style={{
      position: 'absolute',
      maxWidth: '100%',
      maxHeight: '100%',
      transition: 'opacity 0.5s',
      opacity: active ? '1' : '0'
    }}
  />
)}

class Slideshow extends React.Component {
  constructor(props) {
    super(props)

    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleKeyDown(event) {
    var left = 37;
    var up = 38;
    var right = 39;
    var down = 40;
    var key = event.which;

    if (key === down || key === left) {
      this.props.previous();
    } else if (key === up || key === right) {
      this.props.next();
    }
  }

  componentWillMount(){
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    return (
      <div className="main">
        <div className="slideshow-wrapper">
          <div  className="button prev" onClick={this.props.previous}></div>
          <div
            className="slideshow"
            style={{
              width: '70vw',
              height: '70vh',
              position: 'relative'
            }}
            onClick={this.props.next}
          >
            {Object.keys(this.props.images).map((image, index) => (
              <Slide
                key={image}
                image={this.props.images[image]}
                index={index}
                active={index === this.props.activeSlide} />
            ))}
            {/* <div className="counter"><p>{this.props.activeSlide}</p></div> */}
          </div>
          <div  className="button prev" onClick={this.props.next}></div>
        </div>
      </div>
    )
  }

}

export default Slideshow
