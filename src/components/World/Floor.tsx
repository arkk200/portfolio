import { RigidBody } from "@react-three/rapier";

const Floor = () => {
  return (
    <RigidBody colliders={"hull"} restitution={2} name="floor">
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </RigidBody>
  );
};

export default Floor;
