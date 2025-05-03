import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header-container">
      <div className="info-container">
        <button className="btn-info">i</button>
      </div>
      <div className="title-container">
        <p className="title">4 EM LINHA</p>
        <p className="subtitle">Special Edition</p>
      </div>
      <div className="sound-container">
        <button className="btn-sound"></button>
      </div>
    </div>
  );
};

export default Header;
