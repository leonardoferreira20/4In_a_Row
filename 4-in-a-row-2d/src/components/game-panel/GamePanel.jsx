import React, { use, useState } from "react";
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

  // Atualizar o tabuleiro de jogo
  const updateGameBoard = () => {
    setGrid(() => generateGrid());
  };

  // Para esconder as opções de jogo (vs jogador | vs computador)
  const [isStartGameVisible, setIsStartGameVisible] = useState(true);
  const updateStartGameVisibility = () => {
    setIsStartGameVisible(!isStartGameVisible);
  };

  // Selecionar o modo de jogo
  const [gameMode, setGameMode] = useState(null);
  const updateGameMode = (selectedGameMode) => {
    setGameMode(selectedGameMode);
    updateNumberOfPlayers();
  };

  // Atualizar o numero de jogadores
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const updateNumberOfPlayers = () => {
    setNumberOfPlayers(gameMode == "player" ? 2 : 1);
  };

  const [players, setPlayers] = useState([]);
  const handlePlayerCreated = (player, index) => {
    setPlayers((prev) => {
      const updated = [...prev];
      updated[index - 1] = player; // index: 1 ou 2
      return updated;
    });
  };

  const [isPlayer1Visible, setIsPlayer1Visible] = useState(true);
  const handlerCheckPlayer1Visibility = () => {
    setIsPlayer1Visible(false);
  };

  const [isPlayer2Visible, setIsPlayer2Visible] = useState(false);
  const handlerCheckPlayer2Visibility = () => {
    handlerCheckPlayer1Visibility(!isPlayer1Visible);
    setIsPlayer2Visible(!isPlayer2Visible);
  };

  const handlerResetConfigurations = () => {
    setGameMode(null);
    setPlayers([]);
    setIsPlayer1Visible(true);
    setIsPlayer2Visible(false);
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
        gameMode={updateGameMode}
      />

      <div className="player-container">
        {/* JOGADOR 1 */}
        <div className="player-container" style={{ display: isPlayer1Visible ? "flex" : "none" }}>
          <Player
            playerNumber="1"
            isVisible={isStartGameVisible}
            updateControlsVisibility={updateStartGameVisibility}
            updateGameGrid={updateGameBoard}
            updatePlayer={(player) => handlePlayerCreated(player, 1)}
            updatePlayerVisibility={handlerCheckPlayer2Visibility}
            resetConfigurations={handlerResetConfigurations}
            unavailableColors={[]}
          />
        </div>

        {/* JOGADOR 2 */}
        <div className="player-container" style={{ display: isPlayer2Visible ? "flex" : "none" }}>
          <Player
            playerNumber="2"
            isVisible={isStartGameVisible}
            updateControlsVisibility={updateStartGameVisibility}
            updateGameGrid={updateGameBoard}
            updatePlayer={(player) => handlePlayerCreated(player, 2)}
            updatePlayerVisibility={handlerCheckPlayer2Visibility}
            resetConfigurations={handlerResetConfigurations}
            unavailableColors={players[0]?.tokenColor ? [players[0].tokenColor] : []}
          />
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default GamePanel;
