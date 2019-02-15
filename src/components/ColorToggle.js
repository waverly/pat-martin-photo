import React from "react";

import "../css/ColorToggle.css";

const ColorToggle = props => (
  <div className="toggle-wrap">
    <div onClick={props.toggleBlack} className="toggle black" />
    <div onClick={props.toggleWhite} className="toggle white" />
  </div>
);

export default ColorToggle;
