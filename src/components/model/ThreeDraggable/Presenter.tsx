import {useEffect, useRef, VFC} from "react";
import {Canvas, PerspectiveCameraProps, useFrame, useThree} from "@react-three/fiber";
// @ts-ignore TODO
import {PerspectiveCamera} from "three";
// shader
import vs from "@glsl/box/vs.glsl"
import fs from "@glsl/box/fs.glsl"


const PerspectiveCamera = (props: PerspectiveCameraProps) => {
    const refCamera = useRef<PerspectiveCamera>({} as PerspectiveCamera)
    const set = useThree((state) => state.set);

    useEffect(() => {
        set({camera: refCamera.current})
    }, []);
    useFrame(() => refCamera.current.updateMatrixWorld());

    return <perspectiveCamera ref={refCamera} {...props}/>
}

const Mesh = () => {
    return (
        <mesh position={[0,0,0]} rotation={[1, 1, 1]}>
            <boxGeometry args={[1, 1, 1]}/>
            <rawShaderMaterial  vertexShader={vs} fragmentShader={fs} wireframe={true}/>
        </mesh>
    )
}

const Presenter: VFC = () => {
    const ref = useRef(null)

    return (
        <Canvas>
            <PerspectiveCamera ref={ref} fov={45} near={0.1} far={100} position={[0, 0, 10]} />
            <Mesh/>
        </Canvas>
    )
}
export default Presenter