import { useCallback, useRef, useState, VFC } from 'react'
import { Canvas, RootState } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { Vector4 } from 'three'

import { useDrop, XYCoord } from 'react-dnd'
import { DragItem } from '@ui/DraggableItem/BoxItem'
import { Mesh3dProps } from '@/types/Mesh3dProps'
import { BoxMesh3D } from '@model/Mesh/Box'

const DrawCanvas: VFC = () => {
  const rootState = useRef({} as RootState)
  const [meshes, setMeshes] = useState<Mesh3dProps[]>([])

  // canvas生成時
  const createHandler = (state: RootState) => {
    state.gl.setClearColor('black')
    rootState.current = state
  }

  // スクリーン座標 → 3D空間に変換してMeshを作成
  const createMesh = useCallback((rootState: RootState, x: number, y: number) => {
    const normalizeScreenX = (x / rootState.size.width) * 2 - 1
    const normalizeScreenY = -(y / rootState.size.height) * 2 + 1
    const clipCoordinates = new Vector4(normalizeScreenX, normalizeScreenY, 1, 1)

    const cameraProjectionMatrixInverse = rootState.camera.projectionMatrixInverse
    const viewCoordinates = clipCoordinates.applyMatrix4(cameraProjectionMatrixInverse)

    const viewMatrixInverse = rootState.camera.matrixWorld
    const worldCoordinates = viewCoordinates.applyMatrix4(viewMatrixInverse)

    const position = {
      x: worldCoordinates.x / worldCoordinates.w,
      y: worldCoordinates.y / worldCoordinates.w,
      z: worldCoordinates.z / worldCoordinates.w
    }

    return {
      position: [position.x, position.y, position.z], // TODO: fix Position [z]
      rotation: [Math.random(), Math.random(), Math.random()],
      sizes: [2, 2, 2],
      isWireFrame: false
    } as Mesh3dProps
  }, [])

  const [_, refCanvas] = useDrop(() => ({
    accept: 'box',
    drop(item: DragItem, monitor) {
      const { x, y } = monitor.getClientOffset() as XYCoord
      const newMesh = createMesh(rootState.current, x, y)
      setMeshes((meshes) => [...meshes, newMesh])
      return
    }
  }))

  return (
    <>
      <Canvas ref={refCanvas} onCreated={createHandler}>
        <PerspectiveCamera makeDefault position={[0, 0, 20]} near={1} far={100} fov={45} />
        {meshes.map((mesh, index) => {
          return (
            <BoxMesh3D key={`mesh-${index}`} position={mesh.position} rotation={mesh.rotation} sizes={mesh.sizes} isWireFrame={mesh.isWireFrame} />
          )
        })}
      </Canvas>
    </>
  )
}
export default DrawCanvas
