import React from "react";
import "./PlayerConfigurations.css";

const PlayerConfigurations = (props) => {
  const { playerNumber, playerName, updatePlayerName, updateTokenColor, unavailableColors } = props;

  const colors = [
    { name: "yellow", value: "#ebc315" },
    { name: "red", value: "#bf360c" },
    { name: "green", value: "#81d62c" },
    { name: "purple", value: "#5a2454" },
  ];

  const handleChooseTokenColor = (event) => {
    updateTokenColor(event);
  };

  const handleIsColorDisabled = (color) => {
    return unavailableColors.includes(color.value);
  };

  return (
    <>
      <div className="player-settings-name-container">
        <label className="player-settings-name-label">Introduza o nome do Jogador {playerNumber}:</label>
        <input
          name="name"
          className="player-settings-name-input"
          type="text"
          placeholder={"Jogador " + playerNumber + "..."}
          value={playerName || ""}
          onChange={updatePlayerName}
        />
      </div>
      <div className="player-settings-color-container">
        <label className="player-settings-color-label">Escolha a cor das suas peças:</label>
        <div className="player-settings-colors-content">
          {colors.map((color) => (
            <button
              key={color.name}
              className={`player-settings-btn-color ${color.name}`}
              value={color.value}
              onClick={handleChooseTokenColor}
              disabled={handleIsColorDisabled(color)}
            />
          ))}
          <button className="player-settings-btn-color random" value="random" onClick={handleChooseTokenColor}>
            ?
          </button>
        </div>
      </div>
    </>
  );
};

export default PlayerConfigurations;
