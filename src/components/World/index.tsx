import { Physics } from "@react-three/rapier";
import Floor from "./Floor";
import Player from "./Player";

const World = () => {
  return (
    <Physics gravity={[0, -12, 0]} colliders={false} debug>
      <Floor />
      <Player />
    </Physics>
  );
};

export default World;
