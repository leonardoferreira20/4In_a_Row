import React from "react";
import "./PlayerDashboard.css";

const PlayerDashboard = (props) => {
  const { playerInfo } = props;
  return (
    <div className="player-dashboard-container">
      <div className="player-dashboard-content">
        <div className="player-dashboard-token-container">
          <div className="player-dashboard-token" style={{ backgroundColor: playerInfo.tokenColor }}></div>
        </div>
        <div className="player-dashboard-title-container">
          <h3 className="player-dashboard-title">{playerInfo.name}</h3>
        </div>
        <div className="player-dashboard-title-container">
          <h1 className="player-dashboard-title">{playerInfo.points}</h1>
        </div>
      </div>
    </div>
  );
};

export default PlayerDashboard;
