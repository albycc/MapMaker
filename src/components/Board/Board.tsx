import React, { useContext, useEffect, useState } from "react";
import Canvas from "../CanvasMap/Canvas";
import CountryWindow from "./UI/OptionsWindows/CountryWindow/CountryWindowOptions";
import Toolbar from "./UI/Toolbar/Toolbar";
import { BoardContext } from "../../contexts/boardContexts";
import MenuBar from "./UI/MenuBar/MenuBar";
import { ToolbarOption } from "./UI/Toolbar/Toolbar-types";
import Paintwindow from "./UI/OptionsWindows/PaintWindow/PaintWindowOptions";
import LegendWindow from "./UI/Legend/LegendWindow";
import { LegendContext } from "../../contexts/legendContexts";

const width = window.innerWidth;
const height = window.innerHeight

export default function Board() {

    const { selectedCountry } = useContext(BoardContext)
    const [showLegend, setShowLegend] = useState<boolean>(false)
    const [legendInitPosition, setLegendInitPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 })
    const [toolBarOption, setToolBarOption] = useState<ToolbarOption>(ToolbarOption.Select)

    // useEffect(() => {

    //     if (toolBarOption === ToolbarOption.Legend) {


    //     }

    // }, [toolBarOption])


    const onToolBarSelectedHandler = (toolbarOption: ToolbarOption) => {
        setToolBarOption(toolbarOption)


    }

    const onBoardSelect = (event: React.MouseEvent) => {

        if (toolBarOption === ToolbarOption.Legend && showLegend === false) {

            console.log(event.clientX)
            setLegendInitPosition({ x: event.clientX, y: event.clientY })
            setShowLegend(true)
        }


    }

    console.log("render board")

    return <div id="board" onClick={onBoardSelect}>
        <MenuBar />
        <Toolbar onToolbarSelected={onToolBarSelectedHandler} />
        <div id="options-position">

            {selectedCountry && toolBarOption === ToolbarOption.Select ? <CountryWindow width={width} country={selectedCountry} /> : ""}
            {toolBarOption === ToolbarOption.Paint ? <Paintwindow width={width} /> : ""}
        </div>
        {showLegend && <LegendWindow toolbarOption={toolBarOption} initialPosition={{ x: legendInitPosition.x, y: legendInitPosition.y }} />}
        <Canvas width={width} height={height} toolBarMode={toolBarOption} />
    </div>
}