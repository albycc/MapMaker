import { useContext, useState } from "react";
import Canvas from "../CanvasMap/Canvas";
import CountryWindow from "./UI/CountryWindow/CountryWindow";
import Toolbar from "./UI/Toolbar/Toolbar";
import { BoardContext } from "../../contexts/boardContexts";
import MenuBar from "./UI/MenuBar/MenuBar";
import VisibleOption from "./UI/VisibleOption/VisibleOption";
import ListButton from "./UI/List/ListButton";
import { ToolbarOption } from "./UI/Toolbar/Toolbar-types";
import Paintwindow from "./UI/PaintWindow/PaintWindow";
import LegendWindow from "./UI/Legend/LegendWindow";

const width = window.innerWidth;
const height = window.innerHeight

export default function Board() {

    const { selectedCountry } = useContext(BoardContext)
    const [toolBarOption, setToolBarOption] = useState<ToolbarOption>(ToolbarOption.Select)

    const onToolBarSelectedHandler = (toolbarOption: ToolbarOption) => {
        setToolBarOption(toolbarOption)
    }

    console.log("render board")

    return <div>
        <MenuBar />
        <VisibleOption />
        <Toolbar onToolbarSelected={onToolBarSelectedHandler} />
        <ListButton />
        <LegendWindow toolbarOption={toolBarOption} />
        <Canvas width={width} height={height} toolBarMode={toolBarOption} />
        {selectedCountry && toolBarOption === ToolbarOption.Select ? <CountryWindow width={width} country={selectedCountry} /> : ""}
        {toolBarOption === ToolbarOption.Paint ? <Paintwindow width={width} /> : ""}
    </div>
}