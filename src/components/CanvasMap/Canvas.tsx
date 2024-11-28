import Map from "./Map"
import { data } from "../../data/data"
import * as d3 from "d3"
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Canvas-styles.module.css"
import { ToolbarOption } from "../Board/UI/Toolbar/Toolbar-types";
import { Position } from '../types/Position';
import { IText } from "./Elements/element-types";
import TextElement from "./Elements/TextElement";
import { ToolbarContext } from "../../contexts/toolbarContexts";
import { selectionIsText } from "../../utils/typeChecks";
import LegendWindow from "../Board/UI/Legend/LegendWindow";

interface IProps {
    width: number;
    height: number;
}

export default function Canvas({ width, height }: IProps) {

    const { setSelectedCountry, toolbarOption, setSelectedText, selected, toolbarTextOptions } = useContext(ToolbarContext)
    const [textElements, setTextElements] = useState<IText[]>([])

    const [initTextFirstTime, setInitTextFirstTime] = useState<boolean>(false) //checks when user clicks on canvas with create text tool
    const [textEdit, setTextEdit] = useState<IText | null>(null)

    const [moveElement, setMoveElement] = useState<SVGElement | null>(null)
    const [moveElementOffset, setMoveElementOffset] = useState<Position>({ x: 0, y: 0 })

    const [legendIsActive, setLegendIsActive] = useState<boolean>(false)

    const mapSVG = useRef<SVGSVGElement>(null)

    const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {

        const target = event.target

        if (toolbarOption === ToolbarOption.Select) {

            // done moving element
            if (moveElement) {
                if (selectionIsText(selected) && moveElement instanceof SVGTextElement) {

                    const index = textElements.findIndex(t => t.id === selected.id)

                    if (index !== -1) {

                        textElements[index].position = { x: event.clientX - moveElementOffset.x, y: event.clientY - moveElementOffset.y }

                        setTextElements([...textElements])

                        setMoveElement(null)
                    }

                    // click country to open country window
                } else if (moveElement instanceof SVGSVGElement && moveElement.id === "legend") {

                    d3.select(`#${moveElement.id}`).attr("x", event.clientX - moveElementOffset.x).attr("y", event.clientY - moveElementOffset.y)
                    setMoveElement(null)

                }
            }
            else if (target instanceof SVGPathElement && target.getAttribute("data-countryid")) {
                const countryId = target.getAttribute("data-countryid")
                if (countryId !== null) {
                    setSelectedCountry(countryId)
                } else {
                    setSelectedCountry(null)
                }
            } else if (target instanceof SVGTextElement) {
                const text = textElements.find(t => t.id === target.id)

                if (selectionIsText(selected) && target.id === selected.id) {

                    const rect = target.getBoundingClientRect()

                    const offsetX = event.clientX - rect.x;
                    const offsetY = event.clientY - rect.y;

                    setMoveElementOffset({ x: offsetX, y: offsetY })


                    setMoveElement(target)
                } else if (text !== undefined) {
                    setSelectedText(text)
                }

            } else if (target instanceof SVGRectElement && target.id === "legend-frame") {

                const legendFrame = d3.select("#legend").node()

                if (legendFrame instanceof SVGSVGElement) {

                    const rect = target.getBoundingClientRect()

                    const offsetX = event.clientX - rect.x;
                    const offsetY = event.clientY - rect.y;

                    setMoveElementOffset({ x: offsetX, y: offsetY })

                    setMoveElement(legendFrame)
                }
            }
            else {
                setSelectedText(null)
            }

        } else if (toolbarOption === ToolbarOption.Text) {

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
            setInitTextFirstTime(true)
            setTextEdit(text)

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

    const insertTextElementHandler = (text: string) => {

        if (textEdit !== null && initTextFirstTime) {
            textEdit.text = text
            setTextElements([...textElements, textEdit])
            setTextEdit(null)
            setInitTextFirstTime(false)
        }
    }

    function moveMouseHandler(event: React.MouseEvent) {

        if (moveElement !== null) {

            d3.select(`#${moveElement.id}`)
                .attr("x", event.clientX - moveElementOffset.x)
                .attr("y", event.clientY - moveElementOffset.y)
        }
    }

    return (
        <div
            className={styles["canvas-container"] + toolbarOption === ToolbarOption.Paint ? styles["paint-cursor"] : ""}
            onMouseMove={moveMouseHandler}
            onClick={clickHandler}
        >
            <svg width={width} height={height} id="svg-canvas" >
                <Map
                    width={width}
                    height={height}
                    data={data}
                    ref={mapSVG}
                />
                {legendIsActive ? <LegendWindow /> : null}

                {textElements.map(t => (
                    <TextElement
                        key={t.id}
                        id={t.id}
                        position={t.position}
                        text={t.text}
                        size={t.size}
                        colour={t.colour}
                        font={t.font}
                        onTextFinished={onTextFinished}
                        isMoving={moveElement !== null && t.id === moveElement.id}
                    />
                ))}
                {initTextFirstTime && textEdit && (
                    <TextElement
                        id={textEdit.id}
                        position={textEdit.position}
                        text={textEdit.text}
                        size={textEdit.size}
                        colour={textEdit.colour}
                        font={textEdit.font}
                        onTextFinished={onTextFinished}
                        initText={(text) => { insertTextElementHandler(text) }}
                    />
                )}
            </svg>
        </div>
    )
}