import { Suspense, useMemo } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import World from "./components/World";
import Lights from "./components/Lights";
import { Controls } from "./constants";
import KeyboardControls from "./contexts/KeyboardControlsContext";

function App() {
  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
    ],
    []
  );

  return (
    <KeyboardControls map={map}>
      <Canvas camera={{ position: [0, 5, 3] }}>
        <Lights />
        <Suspense>
          <World />
        </Suspense>
        {/* <OrbitControls /> */}
      </Canvas>
    </KeyboardControls>
  );
}

export default App;
