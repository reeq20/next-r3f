import { ReactNode, VFC } from "react";
import { useDrag } from "react-dnd";

export type DragItem = {
  id: any;
  type: string;
  left: number;
  top: number;
};

export type BoxProps = {
  hideSourceOnDrag?: boolean;
  children?: ReactNode;
} & DragItem;

const BoxItem: VFC<BoxProps> = ({ id, type, left, top, children }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "box",
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top]
  );

  if (isDragging) {
    return <div ref={drag} />;
  }

  return (
    <>
      <div
        ref={drag}
        style={{ left, top }}
        className={
          "relative z-10 rounded-md border border-gray-200 bg-gray-100 py-2 px-8"
        }
        role={"Box"}
      >
        {children}
      </div>
    </>
  );
};

export default BoxItem;
