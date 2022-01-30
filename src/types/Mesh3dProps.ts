import { PerspectiveCamera } from "three";

export type Mesh3dProps = {
    camera: PerspectiveCamera
    position: [number, number, number]
    rotation: [number, number, number]
    sizes: [number, number, number]
    vs: string
    fs: string
    wf?: boolean
}