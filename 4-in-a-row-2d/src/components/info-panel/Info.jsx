import React from "react";
import "./Info.css";

const Info = (props) => {
  const { isVisible, infoVisibility } = props;
  return (
    <div className="info-panel-container" style={{ display: !isVisible ? "block" : "none" }}>
      <div className="info-panel-content">
        <div className="info-panel-close-nav-container">
          <p className="info-panel-close-nav-title">Informações de jogo</p>
        </div>
        <div className="info-panel-close-btn-container">
          <button className="info-panel-close-btn" onClick={infoVisibility}>
            X
          </button>
        </div>
        <hr className="info-panel-separetor" />
        <div className="">
          <div className="info-panel-rules">
            <label>Regras:</label>
            <ul className="info-panel-rules-ul">
              <li>- Cada jogador terá 10 segundos para a sua jogada;</li>
              <li>- Quando o jogo iniciar serão gerados espaços especiais que permitem o jogador voltar a jogar;</li>
              <li>
                - O jogo termina quando 4 peças, da mesma cor, formarem 4 em linha (horizontal, vertical, diagonal);
              </li>
            </ul>
          </div>
          <hr className="info-panel-separetor" />
          <div className="info-panel-developers">
            <label>Desenvolvido por:</label>
            <ul className="info-panel-developers-ul">
              <li className="">João Carvalho - 2024126292</li>
              <li className="">Leonardo Ferreira - 2024113113</li>
              <li className="">Nuno Silva - 2023116305</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
