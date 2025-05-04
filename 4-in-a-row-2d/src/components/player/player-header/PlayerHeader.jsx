import React from "react";
import "./PlayerHeader.css";

const PlayerHeader = (props) => {
  const { playerNumber, updateControlsVisibility, updateGameGrid, resetConfigurations } = props;

  const closePlayerSettings = () => {
    updateControlsVisibility();
    updateGameGrid();
    resetConfigurations();
  };

  return (
    <div className="player-close-container">
      <div className="player-close-nav-container">
        <p className="player-close-nav-title">Definições do Jogador {playerNumber}</p>
      </div>
      <div className="player-close-btn-container">
        <button className="player-close-btn" onClick={closePlayerSettings}>
          X
        </button>
      </div>
    </div>
  );
};

export default PlayerHeader;
