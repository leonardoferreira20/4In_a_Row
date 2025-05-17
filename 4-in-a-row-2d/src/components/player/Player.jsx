import React, { useEffect, useState } from "react";
import "./Player.css";
import PlayerHeader from "./player-header/PlayerHeader";
import PlayerConfigurations from "./player-configurations/PlayerConfigurations";

const Player = (props) => {
  const {
    playerNumber,
    isVisible,
    updateControlsVisibility,
    updateGameGrid,
    updatePlayer,
    updatePlayerVisibility,
    unavailableColors,
    resetConfigurations,
    updateGameStarted,
    gameMode,
    updateComputer,
  } = props;

  const buttons = document.querySelectorAll(".player-settings-btn-color");
  const randomColors = [
    { name: "pink", value: "#e8a6b1" },
    { name: "orange", value: "#FFA500" },
    { name: "black", value: "#2b2b2b" },
    { name: "lightBlue", value: "#85bdcf" },
  ];

  const [playerName, setPlayerName] = useState(null);
  const [tokenColor, setTokenColor] = useState(null);

  const handleUpdatePlayerName = (event) => {
    const name = event.currentTarget.value;
    setPlayerName(name);
  };

  const getRandomColors = (randomColor) => {
    const availableColors = randomColors.filter((randomColor) => !unavailableColors.includes(randomColor.value));
    return availableColors[Math.floor(Math.random() * availableColors.length)].value;
  };

  const handleUpdateTokenColor = (event) => {
    const color = event.currentTarget.value;

    buttons.forEach((btn) => btn.classList.remove("selected"));
    event.currentTarget.classList.add("selected");

    setTokenColor(color == "random" ? getRandomColors(color) : color);
  };

  const handleCreatePlayer = () => {
    const player = {
      id: playerNumber,
      name: playerName ? playerName : `Jogador ${playerNumber}`,
      tokenColor: tokenColor,
      points: 0,
    };

    updatePlayer(player, playerNumber);
    updatePlayerVisibility();

    if (playerNumber == 2 || gameMode == "computer") {
      updateGameStarted();

      if (gameMode == "computer") {
        unavailableColors.push(tokenColor);

        const computer = {
          id: "3",
          name: "Computador",
          tokenColor: getRandomColors({ name: "random", value: tokenColor }),
          points: 0,
        };

        updateComputer(computer);
      }
    }

    setPlayerName(null);
    setTokenColor(null);
  };

  const resetPlayer = () => {
    setPlayerName(null);
    setTokenColor(null);
    buttons.forEach((btn) => btn.classList.remove("selected"));
    resetConfigurations();
  };

  return (
    <div className="player-container" style={{ display: !isVisible ? "block" : "none" }}>
      <div className="player-content">
        <PlayerHeader
          playerNumber={playerNumber}
          updateControlsVisibility={updateControlsVisibility}
          updateGameGrid={updateGameGrid}
          resetConfigurations={resetPlayer}
        />
        <hr />
        <div className="player-settings-container">
          <PlayerConfigurations
            playerNumber={playerNumber}
            updatePlayerName={handleUpdatePlayerName}
            playerName={playerName}
            tokenColor={tokenColor}
            updateTokenColor={handleUpdateTokenColor}
            unavailableColors={unavailableColors}
            randomColors={randomColors}
          />
          <div className="player-confirm-settings-container">
            <button className="player-confirm-settings-btn" onClick={handleCreatePlayer} disabled={!tokenColor}>
              <span>Confirmar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
