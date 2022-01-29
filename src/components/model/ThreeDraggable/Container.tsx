import Presenter from "./Presenter";
import {VFC} from "react";

const ThreeDraggable: VFC = () => {
    // TODO: DnDProvider
    return (
        <>
            <div className={"w-full h-screen"}>
                <Presenter />
            </div>
        </>
    )
}

export default ThreeDraggable;