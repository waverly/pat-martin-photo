import React from "react";
import { Link } from "react-router-dom";
import "../css/IndexPg.css";

class Index extends React.Component {
  componentDidMount() {}

  render() {
    const slides = this.props.slides;
    const imgMarkup = Object.keys(slides).map(
      key => {
        const currentSlide = this.props.slides[key];
        const image = currentSlide.data.image.url;
        const secondimage = currentSlide.data.secondimage.url;

        if (secondimage) {
          return (
            <div key={key} style={{ display: "flex" }}>
              <Link
                to={`/`}
                className="link-home"
                onClick={() => {
                  this.props.handleIndexClick(key);
                }}
              >
                <div className="img-wrap">
                  <img src={image} alt="" />
                </div>
              </Link>
              <Link
                to={`/`}
                className="link-home"
                onClick={() => {
                  this.props.handleIndexClick(key);
                }}
              >
                <div className="img-wrap">
                  <img src={secondimage} alt="" />
                </div>
              </Link>
            </div>
          );
        }
        return (
          <Link
            to={`/`}
            className="link-home"
            key={key}
            onClick={() => {
              this.props.handleIndexClick(key);
            }}
          >
            <div className="img-wrap">
              <img src={image} alt="" />
            </div>
          </Link>
        );
      }
      // {return(
      //   <Link to={`/`} className="link-home"
      //   key={key}
      //   onClick={() => {this.props.handleIndexClick(key)}}
      //   >
      //     <div className="img-wrap">
      //       <img src={ images[key] } alt=""/>
      //     </div>
      //   </Link>
      // )
      // }
    );

    return <div className="flex-wrap"> {imgMarkup} </div>;
  }
}

export default Index;
