import { useEffect, useRef, useState, VFC} from "react";
import * as THREE from "three";
import {Canvas, useFrame} from "@react-three/fiber";
import {PerspectiveCamera} from "@react-three/drei";

import vs from "@glsl/box/vs.glsl"
import fs from "@glsl/box/fs.glsl"


type Props = {
    camera: THREE.PerspectiveCamera
}

const Mesh: VFC<Props> = ({camera}) => {
    const mesh = useRef<THREE.Mesh<any, any>>({} as THREE.Mesh)
    const [cameraPrjMatrixInverse, setCameraPrjMatrixInverse] = useState()

    useEffect(()=>{
        console.log('mesh mount check.')
        return()=>{
            console.warn('mesh unmount.')
        }
    },[])

    useFrame(({mouse}) => {
        const cameraProjectionMatrixInverse = camera.projectionMatrixInverse
        // const cameraMatrixWorld = camera.current.matrixWorld
        const clipCoordinates = new THREE.Vector4(mouse.x, mouse.y, 1, 1)
        const viewCoordinates = clipCoordinates.applyMatrix4(cameraProjectionMatrixInverse)
        const worldCoordinates = viewCoordinates.applyMatrix4(camera.matrixWorld)

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
            <mesh ref={mesh} position={[0, 0, 0]} rotation={[1, 1, 1]}>
                <boxBufferGeometry args={[5, 5, 5]}/>
                <rawShaderMaterial vertexShader={vs} fragmentShader={fs} wireframe={true}/>
            </mesh>
        </>
    )
}

const Presenter: VFC = () => {
    const refCanvas = useRef<HTMLCanvasElement | null>(null)
    const refCamera = useRef<any>(null)
    const [camera, setCamera] = useState<THREE.PerspectiveCamera>()

    useEffect(() => {
        console.log('camera mount check.')
        setCamera(refCamera.current)

        return()=>{
            console.warn('camera unmount.')
        }
    }, [])

    return (
        <Canvas ref={refCanvas}>
            <PerspectiveCamera makeDefault ref={refCamera} fov={45} near={1} far={50} position={[0, 0, 6]}>
                {camera && <Mesh camera={camera}/>}
            </PerspectiveCamera>
        </Canvas>
    )
}
export default Presenter