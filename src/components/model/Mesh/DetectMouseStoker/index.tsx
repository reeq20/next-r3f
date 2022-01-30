import { useRef, VFC } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import vs from "@glsl/box/vs.glsl";
import fs from "@glsl/box/fs.glsl";

// cameraのprojectionMatrix検証用
const DetectMouseStoker: VFC = () => {
  const mesh = useRef<THREE.Mesh<any, any>>({} as THREE.Mesh);

  useFrame(({ mouse, camera }) => {
    const cameraProjectionMatrixInverse = camera.projectionMatrixInverse;
    // const cameraMatrixWorld = camera.current.matrixWorld
    const clipCoordinates = new THREE.Vector4(mouse.x, mouse.y, 1, 1);
    const viewCoordinates = clipCoordinates.applyMatrix4(
      cameraProjectionMatrixInverse
    );
    const worldCoordinates = viewCoordinates.applyMatrix4(camera.matrixWorld);

    mesh.current.position.x = worldCoordinates.x / worldCoordinates.w;
    mesh.current.position.y = worldCoordinates.y / worldCoordinates.w;
    mesh.current.position.z = worldCoordinates.z / worldCoordinates.w;

    mesh.current.rotation.x += 0.05;
    mesh.current.rotation.y += 0.05;
    // mesh.current.rotation.z += 0.05

    camera.updateMatrixWorld();
  });

  return (
    <mesh ref={mesh} position={[0, 0, 100]}>
      <boxBufferGeometry args={[3, 3, 3]} />
      <rawShaderMaterial vertexShader={vs} fragmentShader={fs} wireframe />
    </mesh>
  );
};

export default DetectMouseStoker;
