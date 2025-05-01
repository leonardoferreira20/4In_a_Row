/* CSS */
import "./App.css";

/* COMPONENTS */
import { Model } from "./blender-models/GameBoardModel";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GameBoard from "./components/GameBoard";

function App() {
  return (
    <div>
      <GameBoard></GameBoard>
    </div>
  );
}

export default App;
