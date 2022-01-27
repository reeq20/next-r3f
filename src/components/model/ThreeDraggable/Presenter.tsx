import {useEffect, useRef, useState, VFC} from "react";
import {Canvas} from "@react-three/fiber";

// shader
import vs from "@glsl/box/vs.glsl"
import fs from "@glsl/box/fs.glsl"
import {usePerspectiveCamera} from "@hooks/usePerspectiveCamera";
import {useWindowSize} from "react-use";
import * as THREE from "three";


type MeshArgs = {
    position: [number, number, number]
    rotation: [number, number, number]
    sizes: [number, number, number]
    vs: string
    fs: string
    wf?: boolean
}

const Mesh: VFC<MeshArgs> = ({position, rotation, sizes, vs, fs, wf = false}) => {
    return (
        <>
            <mesh position={position} rotation={rotation}>
                <boxGeometry args={sizes}/>
                <rawShaderMaterial vertexShader={vs} fragmentShader={fs} wireframe={wf}/>
            </mesh>
        </>
    )
}

const Presenter: VFC = () => {
    const {width, height} = useWindowSize()
    const [meshes, setMeshes] = useState<MeshArgs[]>([
        {position: [0, 0, 0], rotation: [1, 1, 1], sizes: [1, 1, 1], vs: vs, fs: fs, wf: true},
    ]);
    const {CameraComponent, camera} = usePerspectiveCamera()

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const {clientX, clientY} = event

        // const x = (clientX / width) * 2 - 1;
        // const y = -(clientY / height) * 2 + 1;
        // const z = 1;
        // const w = 1;
        //
        // console.log({x, y})
        //
        // const test = new Vector4(1,1,1,1);
        // console.log({test})
        //
        // const viewCoordinates = test.applyMatrix4(camera.current.projectionMatrixInverse)
        //
        // console.log(viewCoordinates)
        //
        // const viewMatrixInverse = camera.current.matrixWorld
        //
        // const worldCoordinates = viewCoordinates.applyMatrix4(viewMatrixInverse)
        //
        // const position = {
        //     x: worldCoordinates.x / worldCoordinates.w,
        //     y: worldCoordinates.y / worldCoordinates.w,
        //     z: worldCoordinates.z / worldCoordinates.w
        // }
        //
        // console.log(position.x,position.y,position.z)

        const x = (clientX / width) * 2 - 1;
        const y = -(clientY / height) * 2 + 1;
        const z = 1;


        const clipCoordinates = new THREE.Vector4(x,y,z,1);
        const viewCoordinates = clipCoordinates.applyMatrix4(camera.current.projectionMatrixInverse)
        console.log(camera.current.projectionMatrixInverse)

        const viewMatrixInverse = camera.current.matrixWorld;

        const worldCoordinates = viewCoordinates.applyMatrix4(viewMatrixInverse)
        console.log({worldCoordinates})

        const position = new THREE.Vector3(0,0,0)

        position.x = worldCoordinates.x / worldCoordinates.w;
        position.y = worldCoordinates.y / worldCoordinates.w;
        position.z = worldCoordinates.z / worldCoordinates.w;

        console.log({position})

        const mesh = {
            position: [position.x, position.y, position.z],
            // position: [Math.random(), Math.random(), Math.random()],
            rotation: [1, 1, 1],
            sizes: [1, 1, 1],
            vs: vs,
            fs: fs,
            wf: false
        } as MeshArgs
        setMeshes([...meshes, mesh])
    }

    return (
        <div className={"w-full h-screen"} onClick={handleClick}>

            <Canvas>
                <CameraComponent />
                {meshes && meshes.map((v, i) => {
                    return (
                        <Mesh key={i} {...v}/>
                    )
                })}
            </Canvas>
        </div>
    )
}
export default Presenter