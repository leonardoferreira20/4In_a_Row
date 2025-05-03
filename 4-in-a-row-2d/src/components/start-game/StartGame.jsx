import React, { useState } from "react";
import "./StartGame.css";

const StartGame = (props) => {
  const { isVisible, updateControlsVisibility, clearBoardGame } = props;

  const [isPlayOptionsVisible, setIsPlayOptionsVisible] = useState(false);

  const handlerShowPlayOptions = () => {
    setIsPlayOptionsVisible(true);
  };

  const handlerPlayOptionSelected = () => {
    updateControlsVisibility();
    clearBoardGame();
  };

  return (
    <div className="start-game-container" style={{ display: isVisible ? "block" : "none" }}>
      <button className="btn-start-game" onClick={handlerShowPlayOptions}>
        <span>Jogar</span>
      </button>

      <div style={{ display: isPlayOptionsVisible ? "block" : "none" }}>
        <button className="btn-play-player" onClick={handlerPlayOptionSelected}>
          <span>vs Jogador</span>
        </button>

        <button className="btn-play-computer">
          <span>vs Computador</span>
        </button>
      </div>
    </div>
  );
};

export default StartGame;
