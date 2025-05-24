import React from "react";
import "./FinishGame.css";

const FinishGame = (props) => {
  const { currentPlayer, playAgain, hidePanel } = props;
  return (
    <div className="finish-game-container">
      <button className="player-close-btn" onClick={hidePanel}>
        X
      </button>
      {/* <hr className="finish-game-separator" /> */}
      <div className="finish-game-content">
        <p>Vencedor</p>
        <h2>{currentPlayer?.name}</h2>
        <button className="finish-game-restart" onClick={playAgain}>
          <span>Jogar Novamente</span>
        </button>
      </div>
    </div>
  );
};

export default FinishGame;
