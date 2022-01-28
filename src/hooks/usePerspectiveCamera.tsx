import {useEffect, useRef, VFC} from "react";
import {PerspectiveCameraProps, useFrame, useThree} from "@react-three/fiber";
import {useWindowSize} from "react-use";
import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";

export const usePerspectiveCamera = () => {
    const camera = useRef<THREE.PerspectiveCamera>({} as THREE.PerspectiveCamera)

    const CameraComponent: VFC<PerspectiveCameraProps> = (props) => {
        return <PerspectiveCamera makeDefault ref={camera} {...props}/>
    }

    return {CameraComponent, camera};
};