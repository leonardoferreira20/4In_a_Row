import React, { use, useEffect, useState } from "react";
import "./GamePanel.css";
import Hole from "../hole/Hole";
import StartGame from "../start-game/StartGame";
import Player from "../player/Player";
import PlayerDashboard from "../player/player-dashboard/PlayerDashboard";
import Grid from "../grid-panel/Grid";
import FinishGame from "../finish-game/FinishGame";
import Timer from "../timer/Timer";

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
  // ->

  const [grid, setGrid] = useState(() => generateGrid());
  const [isStartGameVisible, setIsStartGameVisible] = useState(true); // Para esconder as opções de jogo (vs jogador | vs computador)
  const [gameMode, setGameMode] = useState(null); // Selecionar o modo de jogo
  const [numberOfPlayers, setNumberOfPlayers] = useState(0); // Atualizar o numero de jogadores
  const [players, setPlayers] = useState([]);
  const [isPlayer1Visible, setIsPlayer1Visible] = useState(true);
  const [isPlayer2Visible, setIsPlayer2Visible] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [winner, setWinner] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [mousePosition, setMousePosition] = useState(0);
  const [timerResetKey, setTimerResetKey] = useState(0);

  // Eliminar todas as peças da grelha para começar um jogo
  const handleClearAllCells = () => {
    setGrid((prevGrid) =>
      prevGrid.map((cell) => ({
        ...cell,
        isSelected: false,
        backgroundColor: "#fff",
      }))
    );
  };

  // Atualizar o tabuleiro de jogo
  const handleUpdateGameBoard = () => {
    setGrid(() => generateGrid());
  };

  const handleUpdateStartGameVisibility = () => setIsStartGameVisible(!isStartGameVisible);

  const handleUpdateGameMode = (selectedGameMode) => {
    setGameMode(selectedGameMode);
    handleUpdateNumberOfPlayers(selectedGameMode);
  };

  const handleUpdateNumberOfPlayers = (mode) => setNumberOfPlayers(mode == "player" ? 2 : 1);

  const handlePlayerCreated = (player, index) => {
    setPlayers((prev) => {
      const updated = [...prev];
      updated[index - 1] = player; // index: 1 ou 2
      return updated;
    });
  };

  const handleCheckPlayer1Visibility = () => setIsPlayer1Visible(false);

  const handleCheckPlayer2Visibility = () => {
    handleCheckPlayer1Visibility(!isPlayer1Visible);
    setIsPlayer2Visible(!isPlayer2Visible);
  };

  const handleResetConfigurations = () => {
    setPlayers([]);
    setGameMode(null);
    setIsPlayer1Visible(true);
    setIsPlayer2Visible(false);
  };

  const handleUpdateGameStarted = () => {
    setGameStarted(true);
  };

  const handleFinishGame = () => {
    setWinner(true);
    setGameStarted(false);
  };

  const handleUpdateCurrentPlayer = (player) => {
    const nextPlayer = players.find((p) => p.id !== player.id);
    setCurrentPlayer(nextPlayer);
  };

  const handleMousePosition = (event) => {
    const boardElement = document.getElementById("game-panel-board");

    if (boardElement) {
      const boardRect = boardElement.getBoundingClientRect();
      const relativeX = event.clientX - boardRect.left;

      setMousePosition(relativeX);
    }
  };

  useEffect(() => {
    if (players.length > 1) {
      const randomIndex = Math.floor(Math.random() * players.length);
      setCurrentPlayer(players[randomIndex]);
    }
  }, [players]);

  const handleTime = (time) => {
    if (time == 10) {
      handleUpdateCurrentPlayer(currentPlayer);
    }
  };

  const handleSelectedHole = (hole) => {
    if (hole.isSpecialHole) {
      setTimerResetKey((prevTimer) => prevTimer + 1);
    }
  };

  return (
    <div className="game-panel-container">
      <div>
        <div className="game-panel-content">
          {/* Jogador 1 */}
          <div className="game-panel-player1-dashboard-container">
            <div style={{ visibility: players[0] ? "visible" : "hidden" }}>
              {players[0] && <PlayerDashboard playerInfo={players[0]} />}
            </div>
            {gameStarted && currentPlayer && players[0].id == currentPlayer.id && (
              <Timer key={`${currentPlayer.id}-${timerResetKey}`} timeout={0} onTimer={handleTime} />
            )}
          </div>

          {/* Grelha de Jogo */}
          <div style={{ flexShrink: 0 }}>
            <div id="game-panel-board" className="game-panel-board" onMouseMove={handleMousePosition}>
              <Grid
                currentPlayer={currentPlayer}
                isGameStarted={gameStarted}
                mousePosition={mousePosition}
                updateCurrentPlayer={handleUpdateCurrentPlayer}
                finishGame={handleFinishGame}
                selectedHole={handleSelectedHole}
              ></Grid>
              <div className="game-panel-left-side-base"></div>
              <div className="game-panel-base"></div>
              <div className="game-panel-right-side-base"></div>
            </div>
          </div>

          {/* Jogador 2 */}
          <div className="game-panel-player2-dashboard-container">
            <div style={{ visibility: players[1] ? "visible" : "hidden" }}>
              {players[1] && <PlayerDashboard playerInfo={players[1]} />}
            </div>
            {gameStarted && currentPlayer && players[1].id == currentPlayer.id && (
              <Timer key={`${currentPlayer.id}-${timerResetKey}`} timeout={0} onTimer={handleTime} />
            )}
          </div>

          <div style={{ visibility: winner ? "visible" : "hidden", position: "absolute" }}>
            <FinishGame currentPlayer={currentPlayer} />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <StartGame
            isVisible={isStartGameVisible}
            updateControlsVisibility={handleUpdateStartGameVisibility}
            clearBoardGame={handleClearAllCells}
            gameMode={handleUpdateGameMode}
          />

          <div className="player-container">
            {/* JOGADOR 1 */}
            <div className="player-container" style={{ display: isPlayer1Visible ? "flex" : "none" }}>
              <Player
                playerNumber="1"
                isVisible={isStartGameVisible}
                updateControlsVisibility={handleUpdateStartGameVisibility}
                updateGameGrid={handleUpdateGameBoard}
                updatePlayer={(player) => handlePlayerCreated(player, 1)}
                updatePlayerVisibility={handleCheckPlayer2Visibility}
                resetConfigurations={handleResetConfigurations}
                unavailableColors={[]}
                updateGameStarted={handleUpdateGameStarted}
              />
            </div>

            {/* JOGADOR 2 */}
            <div
              className="player-container"
              style={{ display: isPlayer2Visible && numberOfPlayers == 2 ? "flex" : "none" }}
            >
              <Player
                playerNumber="2"
                isVisible={isStartGameVisible}
                updateControlsVisibility={handleUpdateStartGameVisibility}
                updateGameGrid={handleUpdateGameBoard}
                updatePlayer={(player) => handlePlayerCreated(player, 2)}
                updatePlayerVisibility={handleCheckPlayer2Visibility}
                resetConfigurations={handleResetConfigurations}
                unavailableColors={players[0]?.tokenColor ? [players[0].tokenColor] : []}
                updateGameStarted={handleUpdateGameStarted}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePanel;
