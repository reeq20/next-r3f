import { useRef, VFC} from "react";
import {Canvas} from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import DetectMouseStoker from "@model/Mesh/DetectMouseStoker";

const Index: VFC = () => {
    const refCanvas = useRef<HTMLCanvasElement | null>(null)

    return (
        <>
            <Canvas ref={refCanvas}>
                <PerspectiveCamera makeDefault position={[5, 5, 50]} near={1} far={100} fov={45}/>
                <DetectMouseStoker/>
            </Canvas>
        </>
    )
}
export default Index