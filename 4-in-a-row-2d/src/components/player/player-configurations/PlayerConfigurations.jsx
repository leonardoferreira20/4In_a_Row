import React from "react";
import "./PlayerConfigurations.css";

const PlayerConfigurations = () => {
  return (
    <>
      <div className="player-settings-name-container">
        <label className="player-settings-name-label">Introduza o nome do Jogador 1:</label>
        <input name="name" className="player-settings-name-input" type="text" placeholder="Jogador 1..." required />
      </div>
      <div className="player-settings-color-container">
        <label className="player-settings-color-label">Escolha a cor das suas peças:</label>
        <div className="player-settings-colors-content">
          <button className="player-settings-btn-color yellow"></button>
          <button className="player-settings-btn-color red"></button>
          <button className="player-settings-btn-color green"></button>
          <button className="player-settings-btn-color purple"></button>
          <button className="player-settings-btn-color random">?</button>
        </div>
      </div>
    </>
  );
};

export default PlayerConfigurations;
