import { VFC } from "react";
import vs from "@glsl/box/vs.glsl";
import fs from "@glsl/box/fs.glsl";
import { Mesh3dProps } from "@/types/Mesh3dProps";

// TODO props add vertexShader,fragmentShader,Texture
export const BoxMesh3D: VFC<Mesh3dProps> = ({
  position = [0, 0, 10],
  rotation = [1, 1, 1],
  sizes = [3, 3, 3],
  isWireFrame = false,
}) => {
  return (
    <mesh position={position} rotation={rotation}>
      <boxBufferGeometry args={sizes} />
      <rawShaderMaterial vertexShader={vs} fragmentShader={fs} wireframe={isWireFrame} />
    </mesh>
  );
};
