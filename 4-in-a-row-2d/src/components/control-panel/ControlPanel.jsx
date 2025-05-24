import React, { useState } from "react";
import "./ControlPanel.css";
import GamePanel from "../game-panel/GamePanel";
import Header from "../header/Header";
import Info from "../info-panel/Info";

const ControlPanel = () => {
  const [game, setGame] = useState(false);
  const [infoVisible, setInfoVisible] = useState(true);
  const [isStartGameVisible, setIsStartGameVisible] = useState(true); // Para esconder as opções de jogo (vs jogador | vs computador)
  const [resetGame, setResetGame] = useState(() => () => {});

  const handleUpdateGame = (value) => setGame(value);
  const handleInfoVisibility = () => setInfoVisible(!infoVisible);
  const handleUpdateStartGameVisibility = () => setIsStartGameVisible(!isStartGameVisible);

  const handleResetGame = (clearAll) => {
    setResetGame(() => clearAll);
  };

  return (
    <div className="control-panel-container">
      <Header
        game={game}
        infoVisible={infoVisible}
        infoVisibility={handleInfoVisibility}
        gameVisibility={handleUpdateStartGameVisibility}
        resetGame={resetGame}
      ></Header>
      <div style={{ position: "relative" }}>
        <GamePanel
          game={game}
          updateGame={handleUpdateGame}
          isGameVisible={isStartGameVisible}
          gameVisibility={handleUpdateStartGameVisibility}
          resetGame={handleResetGame}
        ></GamePanel>
        <Info isVisible={infoVisible} infoVisibility={handleInfoVisibility} />
      </div>
    </div>
  );
};

export default ControlPanel;
