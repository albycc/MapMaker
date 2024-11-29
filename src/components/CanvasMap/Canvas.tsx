import Map from "./Map"
import { data } from "../../data/data"
import * as d3 from "d3"
import React, { useCallback, useContext, useRef, useState } from "react";
import styles from "./Canvas-styles.module.css"
import { ToolbarOption } from "../Board/UI/Toolbar/Toolbar-types";
import { Position } from '../types/Position';
import { IText } from "./Elements/element-types";
import TextElement from "./Elements/TextElement";
import { ToolbarContext } from "../../contexts/toolbarContexts";
import { selectionIsText } from "../../utils/typeChecks";
import LegendWindow from "../Board/UI/Legend/LegendWindow";
import { BoardContext } from "../../contexts/boardContexts";
import { ICountry } from "../../types/CountriesTypes";

interface IProps {
    width: number;
    height: number;
}

export default function Canvas({ width, height }: IProps) {

    const { setSelectedCountry, toolbarOption, setSelectedText, selected, toolbarTextOptions } = useContext(ToolbarContext)
    const { editCountry, removeCountryColour } = useContext(BoardContext)
    const [textElements, setTextElements] = useState<IText[]>([])

    const [moveElement, setMoveElement] = useState<SVGElement | null>(null)
    const [moveElementOffset, setMoveElementOffset] = useState<Position>({ x: 0, y: 0 })

    const [legendIsActive, setLegendIsActive] = useState<boolean>(false)

    const mapSVG = useRef<SVGSVGElement>(null)

    const clickHandler = (event: React.MouseEvent<SVGElement>) => {

        const target = event.target

        if (toolbarOption === ToolbarOption.Select) {

            // click country to open country window
            if (target instanceof SVGPathElement && target.getAttribute("data-countryid")) {

                const countryId = target.getAttribute("data-countryid")
                if (countryId !== null) {
                    console.log("click country to open country window: ", countryId)
                    setSelectedCountry(countryId)
                }
            } else {
                setSelectedCountry(null)

            }

        }
        if (toolbarOption === ToolbarOption.Text) {

            if (target instanceof SVGTextElement) {

                const textElement = textElements.find(t => t.id === target.id)

                if (textElement !== undefined) {

                    setSelectedText(textElement)

                    return
                }
            }

            const text: IText = {
                id: "t-" + Math.random().toString().slice(2),
                text: "",
                colour: toolbarTextOptions.colour,
                size: toolbarTextOptions.size,
                font: toolbarTextOptions.font,
                style: toolbarTextOptions.style,
                position: {
                    x: event.clientX,
                    y: event.clientY
                }
            }

            setTextElements([...textElements, text])

        } else if (toolbarOption === ToolbarOption.Legend) {

            setLegendIsActive(true)
        }
    }

    const onTextFinished = (id: string, text: string) => {

        const textList = [...textElements]

        const textElementIndex = textList.findIndex(t => t.id === id)

        if (textElementIndex !== -1) {
            textList[textElementIndex].text = text

            setTextElements(textList)
        }
    }

    const updatePositionHandler = useCallback((id: string, position: Position) => {

        console.log("textElements: ", textElements)
        const textList = [...textElements]

        const textElementIndex = textList.findIndex(t => t.id === id)

        if (textElementIndex !== -1) {
            textList[textElementIndex].position = position


            setTextElements([...textList])
        }
    }, [textElements])


    const onContextMeuHandler = (event: React.MouseEvent<SVGElement>) => {

        event.preventDefault()

        const target = event.target

        if (target instanceof SVGTextElement) {

            const id = target.id
            setTextElements(textElements.filter(t => t.id !== id))
        }

    }

    return (
        <div
            className={styles["canvas-container"] + toolbarOption === ToolbarOption.Paint ? styles["paint-cursor"] : ""}
        >
            <svg width={width} height={height} id="svg-canvas" onClick={clickHandler} onContextMenu={onContextMeuHandler}>
                <Map
                    width={width}
                    height={height}
                    data={data}
                    ref={mapSVG}
                />
                {legendIsActive ? <LegendWindow /> : null}

                <g>
                    {textElements.map(t => (
                        <TextElement
                            key={t.id}
                            id={t.id}
                            position={t.position}
                            text={t.text}
                            size={t.size}
                            colour={t.colour}
                            font={t.font}
                            style={t.style}
                            onTextFinished={onTextFinished}
                            updatePosition={updatePositionHandler}
                            textElements={textElements}
                        />
                    ))}

                </g>

            </svg>
        </div>
    )
}