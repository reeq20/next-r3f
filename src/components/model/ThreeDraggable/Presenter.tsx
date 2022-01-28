import {useEffect, useLayoutEffect, useMemo, useRef, useState, VFC} from "react";
import {Canvas, useFrame} from "@react-three/fiber";

// shader
import vs from "@glsl/box/vs.glsl"
import fs from "@glsl/box/fs.glsl"
import {usePerspectiveCamera} from "@hooks/usePerspectiveCamera";
import {useWindowSize} from "react-use";
import * as THREE from "three";
import {PerspectiveCamera} from "@react-three/drei";

type MeshArgs = {
    position: [number, number, number]
    rotation: [number, number, number]
    sizes: [number, number, number]
    vs: string
    fs: string
    wf?: boolean
}

// const Mesh: VFC<MeshArgs> = ({position, rotation, sizes, vs, fs, wf = false}) => {
//     return (
//         <>
//             <mesh position={position} rotation={rotation}>
//                 <boxGeometry args={sizes}/>
//                 <rawShaderMaterial vertexShader={vs} fragmentShader={fs} wireframe={wf}/>
//             </mesh>
//         </>
//     )
// }

const Mesh: VFC = () => {
    const mesh = useRef<THREE.Mesh<any, any>>({} as THREE.Mesh)
    const camera = useRef<THREE.PerspectiveCamera>({} as THREE.PerspectiveCamera)



    useFrame(({mouse}) => {
        camera.current.updateMatrixWorld()
        const cameraProjectionMatrixInverse = camera.current.projectionMatrixInverse
        const cameraMatrixWorld = camera.current.matrixWorld
        const clipCoordinates = new THREE.Vector4(mouse.x, mouse.y, 1, 1)
        const viewCoordinates = clipCoordinates.applyMatrix4(cameraProjectionMatrixInverse)
        const worldCoordinates = viewCoordinates.applyMatrix4(cameraMatrixWorld)

        mesh.current.position.x = worldCoordinates.x / worldCoordinates.w
        mesh.current.position.y = worldCoordinates.y / worldCoordinates.w
        mesh.current.position.z = worldCoordinates.z / worldCoordinates.w

        mesh.current.rotation.x += 0.05
        mesh.current.rotation.y += 0.05
        mesh.current.rotation.z += 0.05

        camera.current.updateMatrixWorld()
    })
    return (
        <>
            <PerspectiveCamera makeDefault ref={camera} fov={45} near={0.1} far={100} position={[0, 0, 10]}/>
            {/*<CameraComponent ref={camera} position={[0, 0, 10]}/>*/}
            <mesh ref={mesh} position={[0, 0, 0]} rotation={[1, 1, 1]}>
                <boxBufferGeometry args={[2, 2, 2]}/>
                <rawShaderMaterial vertexShader={vs} fragmentShader={fs} wireframe={true}/>
            </mesh>
        </>

    )
}


const Presenter: VFC = () => {
    const refCanvas = useRef<HTMLCanvasElement | null>(null)

    // const {width, height} = useWindowSize()
    //
    // const [meshes, setMeshes] = useState<MeshArgs[]>([
    //     {position: [0, 0, 0], rotation: [1, 1, 1], sizes: [1, 1, 1], vs: vs, fs: fs, wf: true},
    // ]);
    //
    // const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //     const {clientX, clientY} = event
    //     const x = (clientX / width) * 2 - 1;
    //     const y = -(clientY / height) * 2 + 1;
    //     const z = 1;
    //
    //     console.log({x,y,z})
    //
    //     const clipCoordinates = new THREE.Vector4(x,y,z,1);
    //     const viewCoordinates = clipCoordinates.applyMatrix4(camera.current.projectionMatrixInverse)
    //     console.log(camera.current.projectionMatrixInverse)
    //
    //     const viewMatrixInverse = camera.current.matrixWorld;
    //
    //     const worldCoordinates = viewCoordinates.applyMatrix4(viewMatrixInverse)
    //     console.log({worldCoordinates})
    //
    //     const position = new THREE.Vector3(0,0,0)
    //
    //     position.x = worldCoordinates.x / worldCoordinates.w
    //     position.y = worldCoordinates.y / worldCoordinates.w
    //     position.z = worldCoordinates.z / worldCoordinates.w
    //
    //     console.log({position})
    //
    //     const mesh = {
    //         position: [position.x, position.y, position.z],
    //         // position: [Math.random(), Math.random(), Math.random()],
    //         rotation: [1, 1, 1],
    //         sizes: [1, 1, 1],
    //         vs: vs,
    //         fs: fs,
    //         wf: false
    //     } as MeshArgs
    //     setMeshes([...meshes, mesh])
    // }


    return (
        <Canvas ref={refCanvas}>
            <Mesh/>
        </Canvas>
    )
}
export default Presenter