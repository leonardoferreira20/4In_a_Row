import React, { useState } from "react";
import "./GamePanel.css";
import Hole from "../hole/Hole";
import StartGame from "../start-game/StartGame";
import Player from "../player/Player";

const GamePanel = () => {
  // <!-IA - Feito pelo CHATGPT
  // Está a preencher com peças random para a página inicial (É possivel visualizar quando se faz refresh à página)
  const generateGrid = () => {
    const rows = 6;
    const columns = 7;
    const grid = [];
    const totalMoves = 10;

    // Inicializa todas as células vazias
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        grid.push({
          positionTop: 20 + row * 75,
          positionLeft: 20 + col * 75,
          isSelected: false,
          backgroundColor: null,
          row,
          col,
        });
      }
    }

    // Mapeia colunas para saber até onde cada uma foi preenchida
    const columnHeights = Array(columns).fill(rows - 1); // [5,5,5,5,5,5,5]

    for (let i = 0; i < totalMoves; i++) {
      let col;
      let row;

      // Escolhe coluna que ainda tenha espaço
      do {
        col = Math.floor(Math.random() * columns);
        row = columnHeights[col];
      } while (row < 0); // todas as linhas dessa coluna estão ocupadas

      // Define a célula correspondente
      const cellIndex = grid.findIndex((cell) => cell.row === row && cell.col === col);
      if (cellIndex !== -1) {
        grid[cellIndex].isSelected = true;
        grid[cellIndex].backgroundColor = Math.random() < 0.5 ? "#bf360c" : "#ebc315";
        columnHeights[col]--; // ocupa a linha de baixo dessa coluna
      }
    }

    return grid;
  };

  const [grid, setGrid] = useState(() => generateGrid());
  // ->

  // Eliminar todas as peças da grelha para começar um jogo
  const clearAllCells = () => {
    setGrid((prevGrid) =>
      prevGrid.map((cell) => ({
        ...cell,
        isSelected: false,
        backgroundColor: "#fff",
      }))
    );
  };

  // Para esconder as opções de jogo (vs jogador | vs computador)
  const [isStartGameVisible, setIsStartGameVisible] = useState(true);
  const updateStartGameVisibility = () => {
    setIsStartGameVisible(!isStartGameVisible);
  };

  return (
    <div className="game-panel-container">
      <div className="game-panel-board">
        {grid.map((cell, index) => (
          <Hole
            key={index}
            positionTop={cell.positionTop}
            positionLeft={cell.positionLeft}
            isSelected={cell.isSelected}
            backgroundColor={cell.backgroundColor}
          />
        ))}

        <div className="game-panel-left-side-base"></div>
        <div className="game-panel-base"></div>
        <div className="game-panel-right-side-base"></div>
      </div>

      <StartGame
        isVisible={isStartGameVisible}
        updateControlsVisibility={updateStartGameVisibility}
        clearBoardGame={clearAllCells}
      />

      <Player />
    </div>
  );
};

export default GamePanel;
