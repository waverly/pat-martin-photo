import React, { Fragment } from "react";

const List = props => {

  const slidesArray = Object.entries(props.slides);

  return (
    <div className="listWrap">
      {slidesArray.map(slide => {
        let firstImage;
        let secondImage;

        const data = slide[1].data;

        if (data) {
          firstImage = data.image.url;

          if (data.secondimage) {
            secondImage = data.secondimage.url;
          }

          return (
            <Fragment key={firstImage + secondImage}>
              <img src={firstImage} alt="" />
              <img src={secondImage} alt="" />
            </Fragment>
          );
        }
      })}
    </div>
  );
};

export default List;
