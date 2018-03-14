import React from 'react';
import { Link } from 'react-router-dom';
import '../css/IndexPg.css';

class Index extends React.Component {

  componentDidMount(){

  }


  render(){
    const images = this.props.images;
    const imgMarkup =
      Object.keys(images)
        .map(
          (key) =>
          {return(
            <Link to={`/`} className="link-home"
            key={key}
            onClick={() => {this.props.handleIndexClick(key)}}
            >
              <div className="img-wrap">
                <img src={ images[key] } alt=""/>
              </div>
            </Link>
          )
          }
        );

    return(
      <div className="flex-wrap">
        {imgMarkup}
      </div>
    )
  }
}

export default Index;
