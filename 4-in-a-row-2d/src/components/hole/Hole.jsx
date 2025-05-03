import React from "react";
import "./Hole.css";

const Hole = (props) => {
  const { positionTop, positionLeft, backgroundColor, isSelected } = props;

  return (
    <div
      style={{
        position: "absolute",
        top: positionTop + "px",
        left: positionLeft + "px",
        backgroundColor: backgroundColor,
        boxShadow: isSelected ? "none" : "inset 0 0 15px 3px #bbb",
      }}
      className="hole-container"
    ></div>
  );
};

export default Hole;
