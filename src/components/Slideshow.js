import React from "react";
import "../css/Slideshow.css";

const Slide = props => {
  const { active } = props;
  if (props.secondimage) {
    return (
      <div
        key={props.image + props.index}
        style={{
          position: "absolute",
          maxWidth: "100%",
          maxHeight: "100%",
          transition: "opacity .5s",
          opacity: active ? "1" : "0",
          zIndex: active ? "10" : "1",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <img
          className="slide"
          alt={props.image}
          src={props.image}
          style={{ maxWidth: "45%" }}
        />
        <img
          className="slide"
          src={props.secondimage}
          alt={props.secondimage}
          style={{ maxWidth: "45%" }}
        />
      </div>
    );
  } else {
    return (
      <img
        key={props.image + props.index}
        className="slide"
        src={props.image}
        alt={props.image}
        style={{
          position: "absolute",
          maxWidth: "100%",
          maxHeight: "100%",
          transition: "opacity .5s",
          opacity: active ? "1" : "0"
        }}
      />
    );
  }
};

class Slideshow extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
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

  componentWillMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    return (
      <div className="main">
        <div className="slideshow-wrapper">
          <div className="button prev" onClick={this.props.previous} />
          <div
            className="slideshow"
            style={{
              width: "70vw",
              height: "85vh",
              position: "relative"
            }}
            onClick={this.props.next}
          >
            {Object.keys(this.props.slides).map((s, index) => {
              const currentSlide = this.props.slides[s];
              return (
                <Slide
                  key={s}
                  image={currentSlide.data.image.url}
                  secondimage={currentSlide.data.secondimage.url}
                  index={index}
                  active={index === this.props.activeSlide}
                />
              );
            })}
            {/* <div className="counter"><p>{this.props.activeSlide}</p></div> */}
          </div>
          <div className="button prev" onClick={this.props.next} />
        </div>
      </div>
    );
  }
}

export default Slideshow;
