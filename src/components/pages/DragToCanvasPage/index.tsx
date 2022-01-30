import {VFC} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import ObjectSelector from "@model/ObjectSelector";
import Canvas from "@model/Canvas";

const DragToCanvasPage: VFC = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className={"flex w-full h-screen"}>
                <Canvas />
                <ObjectSelector/>
            </div>
        </DndProvider>
    )
}

export default DragToCanvasPage