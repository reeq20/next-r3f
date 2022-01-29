import {useRef, VFC} from "react";
import * as THREE from "three";
import {Canvas, useFrame} from "@react-three/fiber";
import {PerspectiveCamera} from "@react-three/drei";

import vs from "@glsl/box/vs.glsl"
import fs from "@glsl/box/fs.glsl"

type MeshArgs = {
    position: [number, number, number]
    rotation: [number, number, number]
    sizes: [number, number, number]
    vs: string
    fs: string
    wf?: boolean
}


const Mesh: VFC = () => {
    const mesh = useRef<THREE.Mesh<any, any>>({} as THREE.Mesh)
    const camera = useRef<THREE.PerspectiveCamera>(null)

    useFrame(({mouse}) => {
        if(!camera?.current){
            return
        }
        const cameraProjectionMatrixInverse = camera.current.projectionMatrixInverse
        // const cameraMatrixWorld = camera.current.matrixWorld
        const clipCoordinates = new THREE.Vector4(mouse.x, mouse.y, 1, 1)
        const viewCoordinates = clipCoordinates.applyMatrix4(cameraProjectionMatrixInverse)
        const worldCoordinates = viewCoordinates.applyMatrix4(camera.current.matrixWorld)

        mesh.current.position.x = worldCoordinates.x / worldCoordinates.w
        mesh.current.position.y = worldCoordinates.y / worldCoordinates.w
        mesh.current.position.z = worldCoordinates.z / worldCoordinates.w

        mesh.current.rotation.x += 0.05
        mesh.current.rotation.y += 0.05
        // mesh.current.rotation.z += 0.05

        // camera.current.updateMatrixWorld()
    })
    return (
        <>
            <PerspectiveCamera makeDefault ref={camera} fov={45} near={1} far={50} position={[0, 0, 6]}>
                {/*<CameraComponent ref={camera} position={[0, 0, 10]}/>*/}
                <mesh ref={mesh} position={[0, 0, 0]} rotation={[1, 1, 1]}>
                    <boxBufferGeometry args={[5, 5, 5]}/>
                    <rawShaderMaterial vertexShader={vs} fragmentShader={fs} wireframe={true}/>
                </mesh>
            </PerspectiveCamera>
        </>

    )
}

const Presenter: VFC = () => {
    const refCanvas = useRef<HTMLCanvasElement | null>(null)

    return (
        <Canvas ref={refCanvas}>
            <Mesh/>
        </Canvas>
    )
}
export default Presenter