import { Physics } from "@react-three/rapier";
import Floor from "./Floor";

const World = () => {
  return (
    <Physics gravity={[0, -12, 0]} colliders={false} debug>
      <Floor />
    </Physics>
  );
};

export default World;
