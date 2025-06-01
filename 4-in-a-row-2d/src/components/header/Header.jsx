import React, { useState } from "react";
import "./Header.css";
import audioSrc from "../../assets/Nintendo World Cup GB music Match 3.mp3";

const Header = (props) => {
  const { game, infoVisible, infoVisibility, gameVisibility, resetGame } = props;

  const [isPlaying, setIsPlaying] = useState(false);

  const handleResetGameToStart = () => {
    resetGame();
    gameVisibility();
  };

  const handlePlay = () => {
    const audio = document.getElementById("background-audio");

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="header-container">
      <div className="info-container">
        {!game && (
          <button
            className="btn-info"
            onClick={infoVisibility}
            style={{ pointerEvents: !infoVisible ? "none" : "all" }}
          >
            i
          </button>
        )}
        {game && (
          <button className="btn-back" onClick={handleResetGameToStart}>
            Voltar
          </button>
        )}
      </div>

      <div className="title-container">
        <p className="title">4 EM LINHA</p>
        <p className="subtitle">Special Edition</p>
      </div>

      <div className="sound-container">
        <audio id="background-audio" src={audioSrc} loop />
        <button className={isPlaying ? "btn-sound playing" : "btn-sound muted"} onClick={handlePlay}></button>
      </div>
    </div>
  );
};

export default Header;
