import { useContext } from "react";
import Canvas from "../CanvasMap/Canvas";
import CountryWindow from "./UI/CountryWindow/CountryWindow";
import Toolbar from "./UI/Toolbar/Toolbar";
import { BoardContext } from "../../contexts/boardContexts";
import MenuBar from "./UI/MenuBar/MenuBar";
import VisibleOption from "./UI/VisibleOption/VisibleOption";
import ListButton from "./UI/List/ListButton";


export default function Board() {

    const { selectedCountry } = useContext(BoardContext)

    const width = window.innerWidth;
    const height = window.innerHeight

    return <div>
        <MenuBar />
        <VisibleOption />
        <Toolbar />
        <ListButton />
        <Canvas width={width} height={height} />
        {selectedCountry && <CountryWindow width={width} country={selectedCountry} />}
    </div>
}