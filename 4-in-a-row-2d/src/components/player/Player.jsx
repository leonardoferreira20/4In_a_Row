import React, { useState } from "react";
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
  } = props;

  const [playerName, setPlayerName] = useState(null);
  const [tokenColor, setTokenColor] = useState(null);

  const handlerUpdatePlayerName = (event) => {
    const name = event.currentTarget.value;
    setPlayerName(name);
  };

  const handlerUpdateTokenColor = (event) => {
    const color = event.currentTarget.value;
    setTokenColor(color);
  };

  const handlerCreatePlayer = () => {
    const player = {
      id: playerNumber,
      name: playerName ? playerName : `Jogador ${playerNumber}`,
      tokenColor: tokenColor,
    };

    updatePlayer(player, playerNumber);
    updatePlayerVisibility();
  };

  return (
    <div className="player-container" style={{ display: !isVisible ? "block" : "none" }}>
      <div className="player-content">
        <PlayerHeader
          playerNumber={playerNumber}
          updateControlsVisibility={updateControlsVisibility}
          updateGameGrid={updateGameGrid}
          resetConfigurations={resetConfigurations}
        />
        <hr />

        <div className="player-settings-container">
          <PlayerConfigurations
            playerNumber={playerNumber}
            updatePlayerName={handlerUpdatePlayerName}
            updateTokenColor={handlerUpdateTokenColor}
            unavailableColors={unavailableColors}
          />
          <div className="player-confirm-settings-container">
            <button className="player-confirm-settings-btn" onClick={handlerCreatePlayer}>
              <span>Confirmar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
