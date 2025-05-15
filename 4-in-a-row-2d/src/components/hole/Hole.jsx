import React from "react";
import "./Hole.css";

const Hole = (props) => {
  const {
    positionTop,
    positionLeft,
    backgroundColor,
    isSelected,
    holeSettings,
    updateGrid,
    isGameStarted,
    isSpecialHole,
  } = props;

  const getHole = (event) => {
    updateGrid(event, holeSettings);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: positionTop + "px",
        left: positionLeft + "px",
        backgroundColor: backgroundColor,
        boxShadow: isSelected ? "none" : "inset 0 0 15px 3px #bbb",
        cursor: isGameStarted ? "pointer" : "default",
        pointerEvents: isGameStarted ? "auto" : "none",
      }}
      className={isSpecialHole ? "hole-container special-hole" : "hole-container"}
      onClick={getHole}
    ></div>
  );
};

export default Hole;
