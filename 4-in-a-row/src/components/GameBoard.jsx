import React, { useState } from "react";
import { Model } from "../blender-models/GameBoardModel";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import RaycastHandler from "./RaycastHandler";
import Hole from "./Hole";

const GameBoard = () => {
  const [pieces, setPieces] = useState([]);

  function colunaToX(coluna) {
    return -3 + coluna * 1; // depende do espaçamento entre colunas
  }

  function linhaToY(linha) {
    return -2 + linha * 1; // depende da altura dos buracos
  }

  const handleSelect = (object) => {
    const coluna = object.userData.coluna;

    if (coluna !== undefined) {
      const linhaDisponivel = calcularLinhaDisponivel(coluna); // tua lógica aqui
      const novaPeca = {
        id: Math.random(),
        position: [colunaToX(coluna), linhaToY(linhaDisponivel), 0],
      };

      setPieces((prev) => [...prev, novaPeca]);
    }
  };

  return (
    <div className="canvas-dipslay">
      <Canvas camera={{ fov: 64, position: [-100, 45, 0] }}>
        <ambientLight intensity={5} />
        <OrbitControls enableZoom={false} />
        <Model />
        <RaycastHandler onSelect={handleSelect} />

        {/* Peças */}
        {[0, 1, 2, 3, 4, 5, 6].map((col) => (
          <Hole key={col} coluna={col} position={[col - 3, 0, 0]} />
        ))}
      </Canvas>
    </div>
  );
};

export default GameBoard;
