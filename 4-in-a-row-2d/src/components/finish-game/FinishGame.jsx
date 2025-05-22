import React from "react";
import "./FinishGame.css";

const FinishGame = (props) => {
  const { currentPlayer, playAgain } = props;
  return (
    <div className="finish-game-container">
      <p>Vencedor {currentPlayer?.name} </p>
      <button onClick={playAgain}>Jogar Novamente</button>
    </div>
  );
};

export default FinishGame;
