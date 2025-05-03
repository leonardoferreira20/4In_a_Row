import React from "react";
import "./ControlPanel.css";
import GamePanel from "../game-panel/GamePanel";
import Header from "../header/Header";

const ControlPanel = () => {
  return (
    <div className="control-panel-container">
      <Header></Header>
      <div className="">
        <GamePanel></GamePanel>
      </div>
    </div>
  );
};

export default ControlPanel;
