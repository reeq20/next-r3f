import { VFC } from 'react'
import BoxItem from '@ui/DraggableItem/BoxItem'

const ObjectSelector: VFC = () => {
  return (
    <div className={'relative flex h-full w-1/4 items-center justify-center flex-col gap-8 border border-solid border-gray-200 bg-white'}>
      <h2 className={"absolute top-40 left-0 right-0 text-center text-gray-500"}>Drag to canvas</h2>
      <BoxItem id={1} left={0} top={0} type={'box'}>
        Box
      </BoxItem>
    </div>
  )
}
export default ObjectSelector
