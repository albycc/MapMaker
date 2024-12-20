import { useContext, } from "react";
import Canvas from "../CanvasMap/Canvas";
import CountryWindow from "./UI/OptionsWindows/CountryWindow/CountryWindowOptions";
import Toolbar from "./UI/Toolbar/Toolbar";
import MenuBar from "./UI/MenuBar/MenuBar";
import { ToolbarOption } from "./UI/Toolbar/Toolbar-types";
import { ToolbarContext } from "../../contexts/toolbarContexts";
import { selectionIsCountry } from "../../utils/typeChecks";

const width = window.innerWidth;
const height = window.innerHeight

export default function Board() {

    const { selected } = useContext(ToolbarContext)
    const { toolbarOption } = useContext(ToolbarContext)

    return <div id="board" className="overflow-hidden w-screen h-screen " onContextMenu={(event) => event.preventDefault()}>
        <MenuBar />
        <Toolbar />
        <div id="options-position">

            {selectionIsCountry(selected) && toolbarOption === ToolbarOption.Select ? <CountryWindow width={width} country={selected} /> : ""}
        </div>
        <Canvas width={width} height={height} />
    </div>
}