import React from "react";
import "./Player.css";
import PlayerHeader from "./player-header/PlayerHeader";
import PlayerConfigurations from "./player-configurations/PlayerConfigurations";

const Player = () => {
  return (
    <div className="player-container">
      <div className="player-content">
        <PlayerHeader />
        <hr />

        <div className="player-settings-container">
          <PlayerConfigurations />
          <div className="player-confirm-settings-container">
            <button className="player-confirm-settings-btn">
              <span>Confirmar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
