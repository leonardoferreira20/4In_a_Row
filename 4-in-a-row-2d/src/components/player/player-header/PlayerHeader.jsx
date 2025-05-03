import React from "react";
import "./PlayerHeader.css";

const PlayerHeader = () => {
  return (
    <div className="player-close-container">
      <div className="player-close-nav-container">
        <p className="player-close-nav-title">Definições do Jogador 1</p>
      </div>
      <div className="player-close-btn-container">
        <button className="player-close-btn">X</button>
      </div>
    </div>
  );
};

export default PlayerHeader;
