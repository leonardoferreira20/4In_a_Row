import React from "react";
import "./FinishGame.css";

const FinishGame = (props) => {
  const { currentPlayer } = props;
  return (
    <div className="finish-game-container">
      <p>Vencedor {currentPlayer?.name} </p>
    </div>
  );
};

export default FinishGame;
