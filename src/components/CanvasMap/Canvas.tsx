import Map from "./Map"
import { data } from "../../data/data"
import * as d3 from "d3"
import { useContext, useEffect } from "react";
import { BoardContext } from "../../contexts/boardContexts";
import styles from "./Canvas-styles.module.css"
import { ToolbarOption } from "../Board/UI/Toolbar/Toolbar-types";

interface IProps {
    width: number;
    height: number;
    toolBarMode: ToolbarOption;
}

export default function Canvas({ width, height, toolBarMode }: IProps) {

    const { selectedCountry } = useContext(BoardContext)

    // x axis

    useEffect(() => {
        console.log("draw grid")
        var x = d3.scaleLinear().range([0, width]).domain([0, 100000]);
        // d3.select("#gridlines")
        //     .append("g")
        //     .call(d3.axisBottom(x).ticks(10).tickSizeInner(-height))


    }, [])

    return <div className={styles["canvas-container"] + toolBarMode === ToolbarOption.Paint ? styles["paint-cursor"] : ""}>
        <svg width={width} height={height} onClick={(event: React.MouseEvent<SVGSVGElement>) => { console.log(event.target) }}>
            {selectedCountry ? <text x={width / 2} y={100}>{selectedCountry.countryName}</text> : ""}
            <Map width={width} height={height} data={data} toolBarOption={toolBarMode} />
            <g id="gridlines" width={width} height={height}></g>

        </svg>

    </div>

}