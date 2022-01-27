import {useEffect, useRef, VFC} from "react";
import {PerspectiveCameraProps, useFrame, useThree} from "@react-three/fiber";
import {Matrix4, PerspectiveCamera} from "three";
import {useWindowSize} from "react-use";

export const usePerspectiveCamera = () => {
    const {width,height} = useWindowSize()
    const camera = useRef<PerspectiveCamera>({} as PerspectiveCamera)
    const CameraComponent: VFC<PerspectiveCameraProps> = (props) => {
        const set = useThree((state) => state.set);

        useEffect(() => {
            set({camera: camera.current})
        }, []);

        // useFrame(() => camera.current.updateMatrixWorld());

        return <perspectiveCamera ref={camera} fov={45} aspect={width/height} near={3} far={15} position={[0,0,10]}/>
    }
    return {CameraComponent, camera} ;
};