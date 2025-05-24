import React, { useState } from "react";
import "./StartGame.css";

const StartGame = (props) => {
  const { isVisible, updateControlsVisibility, gameMode } = props;

  const [isPlayOptionsVisible, setIsPlayOptionsVisible] = useState(false);

  const handleShowPlayOptions = () => {
    setIsPlayOptionsVisible(true);
  };

  const handlePlayOptionSelected = (event) => {
    gameMode(event.currentTarget.value);
    updateControlsVisibility();
  };

  return (
    <div className="start-game-container" style={{ display: isVisible ? "block" : "none" }}>
      <button className="btn-start-game" onClick={handleShowPlayOptions}>
        <span>Jogar</span>
      </button>

      <div style={{ display: isPlayOptionsVisible ? "block" : "none" }}>
        <button className="btn-play-player" value="player" onClick={handlePlayOptionSelected}>
          <span>vs Jogador</span>
        </button>

        <button className="btn-play-computer" value="computer" onClick={handlePlayOptionSelected}>
          <span>vs Computador</span>
        </button>
      </div>
    </div>
  );
};

export default StartGame;
