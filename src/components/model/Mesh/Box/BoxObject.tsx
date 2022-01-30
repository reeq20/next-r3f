import {VFC} from "react";
import * as THREE from "three";

type MeshArgs = {
    camera: THREE.PerspectiveCamera
    position: [number, number, number]
    rotation: [number, number, number]
    sizes: [number, number, number]
    vs: string
    fs: string
    wf?: boolean
}
export const BoxObject: VFC = ()=>{
    return (
        <>
        </>
    )
}