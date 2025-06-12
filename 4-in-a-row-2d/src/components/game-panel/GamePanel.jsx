import React, { use, useEffect, useState } from "react";
import "./GamePanel.css";
import Hole from "../hole/Hole";
import StartGame from "../start-game/StartGame";
import Player from "../player/Player";
import PlayerDashboard from "../player/player-dashboard/PlayerDashboard";
import Grid from "../grid-panel/Grid";
import FinishGame from "../finish-game/FinishGame";
import Timer from "../timer/Timer.jsx";

const GamePanel = (props) => {
  const { updateGame, isGameVisible, gameVisibility, resetGame } = props;

  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState(null); // Selecionar o modo de jogo
  const [players, setPlayers] = useState([]);
  const [isPlayer1Visible, setIsPlayer1Visible] = useState(true);
  const [isPlayer2Visible, setIsPlayer2Visible] = useState(false);
  const [winner, setWinner] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [mousePosition, setMousePosition] = useState(0);
  const [timerResetKey, setTimerResetKey] = useState(0);
  const [resetGrid, setResetGrid] = useState(() => () => {});

  // Atualizar o tabuleiro de jogo
  const handleUpdateGameBoard = () => {
    setGrid(() => generateGrid());
  };

  const handleUpdateGameMode = (selectedGameMode) => {
    setGameMode(selectedGameMode);
  };

  const handlePlayerCreated = (player, index) => {
    setPlayers((prev) => {
      const updated = [...prev];
      updated[index - 1] = player;
      return updated;
    });
  };

  const handleComputerCreated = (computer, index) => {
    setPlayers((prev) => {
      const updated = [...prev];
      updated[index - 2] = computer;
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
    updateGame(true);
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

  const handleTime = (time) => {
    setTimeout(() => {
      if (time == 10) {
        handleUpdateCurrentPlayer(currentPlayer);
      }
    }, 1000);
  };

  const handleSelectedHole = (hole) => {
    if (hole.isSpecialHole) {
      setTimerResetKey((prevTimer) => prevTimer + 1);
    }
  };

  const handleClearGrid = (clearGrid) => {
    setResetGrid(() => clearGrid);
  };

  const handleFinishGame = () => {
    setWinner(true);
    setGameStarted(false);
    updateGame(false);
  };

  const handlePlayAgain = () => {
    setWinner(false);
    handleUpdateGameStarted();
    resetGrid();
  };

  useEffect(() => {
    const buttons = document.querySelectorAll(".player-settings-btn-color");

    resetGame(() => {
      setGameMode(null);
      setPlayers([]);
      setIsPlayer1Visible(true);
      setIsPlayer2Visible(false);
      setCurrentPlayer(null);
      setTimerResetKey(0);
      setWinner(false);
      setGameStarted(false);
      resetGrid();
      updateGame(false);
      buttons.forEach((btn) => btn.classList.remove("selected"));
    });
  }, [currentPlayer]);

  const handleHidePanel = () => {
    setWinner(false);
    updateGame(true);
  };

  useEffect(() => {
    if (players.length > 1) {
      const randomIndex = Math.floor(Math.random() * players.length);
      setCurrentPlayer(players[randomIndex]);
    }
  }, [players]);

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
                clearGrid={handleClearGrid}
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

          {winner && (
            <div style={{ position: "absolute" }}>
              <FinishGame currentPlayer={currentPlayer} playAgain={handlePlayAgain} hidePanel={handleHidePanel} />
            </div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <StartGame
            isVisible={isGameVisible}
            updateControlsVisibility={gameVisibility}
            gameMode={handleUpdateGameMode}
          />

          <div className="player-container">
            {/* JOGADOR 1 */}
            <div className="player-container" style={{ display: isPlayer1Visible ? "flex" : "none" }}>
              <Player
                playerNumber="1"
                isVisible={isGameVisible}
                updateControlsVisibility={gameVisibility}
                updateGameGrid={handleUpdateGameBoard}
                updatePlayer={(player) => handlePlayerCreated(player, 1)}
                updatePlayerVisibility={handleCheckPlayer2Visibility}
                resetConfigurations={handleResetConfigurations}
                unavailableColors={[]}
                updateGameStarted={handleUpdateGameStarted}
                gameMode={gameMode}
                updateComputer={(computer) => handleComputerCreated(computer, 3)}
              />
            </div>

            {/* JOGADOR 2 */}
            <div
              className="player-container"
              style={{ display: isPlayer2Visible && gameMode == "player" ? "flex" : "none" }}
            >
              <Player
                playerNumber="2"
                isVisible={isGameVisible}
                updateControlsVisibility={gameVisibility}
                updateGameGrid={handleUpdateGameBoard}
                updatePlayer={(player) => handlePlayerCreated(player, 2)}
                updatePlayerVisibility={handleCheckPlayer2Visibility}
                resetConfigurations={handleResetConfigurations}
                unavailableColors={players[0]?.tokenColor ? [players[0].tokenColor] : []}
                updateGameStarted={handleUpdateGameStarted}
                gameMode={gameMode}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePanel;
