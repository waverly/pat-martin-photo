import React, { Fragment } from "react";

const List = props => {
  console.log(props.slides);

  const slidesArray = Object.entries(props.slides);

  console.log(slidesArray);

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
            console.log("yes there is a second image");
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
