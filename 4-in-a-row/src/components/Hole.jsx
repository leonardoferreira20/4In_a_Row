import React from "react";

const Hole = ({ coluna, position }) => (
  <mesh position={position} userData={{ coluna }}>
    <cylinderGeometry args={[0.4, 0.4, 0.1, 32]} />
    <meshStandardMaterial transparent opacity={0.1} />
  </mesh>
);

export default Hole;
