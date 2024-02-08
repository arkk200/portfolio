import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { Controls } from "../../constants";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMouseCapture } from "../../hooks/useMouseCapture";
import useKeyboardControls from "../../hooks/useKeyboardControls";

const Player = () => {
  const isOnFloor = useRef(true);
  const playerRef = useRef<RapierRigidBody>(null);

  const forwardPressed = useKeyboardControls(Controls.forward);
  const backPressed = useKeyboardControls(Controls.back);
  const leftPressed = useKeyboardControls(Controls.left);
  const rightPressed = useKeyboardControls(Controls.right);
  const jumpPressed = useKeyboardControls(Controls.jump);

  const mouse = useMouseCapture();

  // keyboard
  useFrame(() => {
    const player = playerRef.current;
    if (!player) return;
    const velocity = player.linvel();

    const linvelX = (Number(rightPressed) - Number(leftPressed)) * 2;
    const linvelZ = (Number(backPressed) - Number(forwardPressed)) * 2;

    const sinMouseX = Math.sin(-mouse.x / 360);
    const cosMouseX = Math.cos(-mouse.x / 360);

    const move = {
      x: linvelX * cosMouseX + linvelZ * sinMouseX,
      y: velocity.y,
      z: linvelZ * cosMouseX + linvelX * -sinMouseX,
    };
    player.setLinvel(move, true);

    if (jumpPressed && isOnFloor.current) {
      player.setLinvel({ x: velocity.x, y: 4, z: velocity.z }, true);
    }
  });

  useFrame(({ camera }) => {
    if (!playerRef.current) return;

    const playerPosition = playerRef.current.translation();

    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(playerPosition);

    const sinMouseX = Math.sin(-mouse.x / 360);
    const cosMouseX = Math.cos(-mouse.x / 360);

    cameraPosition.x += sinMouseX * 2;
    cameraPosition.z += cosMouseX * 2;
    cameraPosition.y += 1.5;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(playerPosition);
    cameraTarget.y += 0.5;

    camera.position.copy(cameraPosition);
    camera.lookAt(cameraTarget);
  });

  useMouseCapture();

  return (
    <RigidBody
      ref={playerRef}
      colliders="trimesh"
      restitution={-10}
      position={[0, 2, 0]}
      lockRotations
      onCollisionEnter={({ other }) => {
        if (other.rigidBodyObject?.name === "floor") {
          isOnFloor.current = true;
        }
      }}
      onCollisionExit={({ other }) => {
        if (other.rigidBodyObject?.name === "floor") {
          isOnFloor.current = false;
        }
      }}
    >
      <mesh>
        <cylinderGeometry args={[0.1, 0.1, 1, 32]} />
        <meshStandardMaterial color="blue" side={2} />
      </mesh>
    </RigidBody>
  );
};

export default Player;
