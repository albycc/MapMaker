import Map from "./Map"
import { data } from "../../data/data"
import * as d3 from "d3"
import React, { useContext, useEffect, useState } from "react";
import { BoardContext } from "../../contexts/boardContexts";
import styles from "./Canvas-styles.module.css"
import { ToolbarOption } from "../Board/UI/Toolbar/Toolbar-types";
import { Position } from '../types/Position';
import { IText } from "./Elements/element-types";
import TextElement from "./Elements/TextElement";

interface IProps {
    width: number;
    height: number;
    toolBarMode: ToolbarOption;
}


export default function Canvas({ width, height, toolBarMode }: IProps) {

    const { selectedCountry, setSelectedCountry } = useContext(BoardContext)
    const [textElements, setTextElements] = useState<IText[]>([])


    useEffect(() => {

        const lastElement = textElements[textElements.length - 1]

        if (lastElement) {
            const id = lastElement.id;


        }
    }, [textElements])

    // x axis


    useEffect(() => {
        console.log("draw grid")
        var x = d3.scaleLinear().range([0, width]).domain([0, 100000]);
        // d3.select("#gridlines")
        //     .append("g")
        //     .call(d3.axisBottom(x).ticks(10).tickSizeInner(-height))


    }, [])

    const clickHandler = (event: React.MouseEvent<SVGSVGElement>) => {

        if (toolBarMode === ToolbarOption.Select) {
            const element = event.target as any

            const countryId = element.getAttribute("data-id")

            console.log("data-id: ", element.getAttribute("data-id"))
            if (countryId !== null) {
                setSelectedCountry(countryId)
            } else {
                setSelectedCountry(null)
            }
        } else if (toolBarMode === ToolbarOption.Text) {

            const text: IText = {
                id: "t" + Math.random().toString().slice(2),
                text: "Hello",
                colour: "black",
                size: 10,
                font: "Arial",
                position: {
                    x: event.clientX,
                    y: event.clientY
                }
            }

            setTextElements([...textElements, text])

        }
        // else if (toolBarMode === ToolbarOption.Legend) {
        //     const element = document.getElementById("board")

        //     console.log(element)

        //     if (element) {
        //         createPortal(<LegendWindow toolbarOption={toolBarMode} />, element)
        //     }


        // }


    }

    const onTextFinished = (id: string, text: string) => {

        const textList = [...textElements]

        const textElementIndex = textList.findIndex(t => t.id === id)

        if (textElementIndex) {
            textList[textElementIndex].text = text

            setTextElements(textList)


        }

    }

    console.log("drawn canvas")

    return <div className={styles["canvas-container"] + toolBarMode === ToolbarOption.Paint ? styles["paint-cursor"] : ""}>
        <svg width={width} height={height} onClick={clickHandler}>
            {selectedCountry ? <text x={width / 2} y={100}>{selectedCountry.name}</text> : ""}
            <Map width={width} height={height} data={data} toolBarOption={toolBarMode} />
            <g id="gridlines" width={width} height={height}></g>
            {textElements.map(t => (
                <TextElement
                    id={t.id}
                    position={t.position}
                    text={t.text}
                    onTextFinished={onTextFinished}

                />

            ))}

        </svg>

    </div>

}