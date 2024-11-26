import Map from "./Map"
import { data } from "../../data/data"
import * as d3 from "d3"
import React, { useContext, useEffect, useRef, useState } from "react";
import { BoardContext } from "../../contexts/boardContexts";
import styles from "./Canvas-styles.module.css"
import { ToolbarOption } from "../Board/UI/Toolbar/Toolbar-types";
import { Position } from '../types/Position';
import { ISprite, IText } from "./Elements/element-types";
import TextElement from "./Elements/TextElement";
import SpriteElement from "./Elements/SpriteElement";
import { ToolbarContext } from "../../contexts/toolbarContexts";
import { selectionIsText } from "../../utils/typeChecks";

interface IProps {
    width: number;
    height: number;
}

const scrollSpeed = 25


export default function Canvas({ width, height }: IProps) {

    const { setSelectedCountry, toolbarOption, setSelectedText, selected } = useContext(ToolbarContext)
    const [textElements, setTextElements] = useState<IText[]>([])

    const [initTextElement, setInitTextElement] = useState<IText | null>(null) //checks when user clicks on canvas with create text tool
    const [sprites, setSprites] = useState<ISprite[]>([])

    const [scrollPosition, setScrollPosition] = useState<Position>({ x: width / 2, y: height / 2 })
    const [scrollMouseDistance, setScrollMouseDistance] = useState<Position>({ x: 0, y: 0 })
    const [zoomPosition, setZoomPosition] = useState<number>(100)
    const [zoomPositionMax, setZoomPositionMax] = useState<number>(zoomPosition)
    const [moveElement, setMoveElement] = useState<SVGElement | null>(null)

    const mapSVG = useRef<SVGSVGElement>(null)

    const [scrollCanvasMode, setScrollCanvasMode] = useState<boolean>(false)

    useEffect(() => {
        if (mapSVG.current !== null) {
            const svgWidth = mapSVG.current.getBoundingClientRect().width
            const scale = width / svgWidth * 100

            setZoomPositionMax(scale)
            setZoomPosition(scale)
        }

    }, [])

    // useEffect(() => {

    //     console.log(selected)

    //     if (selectionIsText(selected)) {
    //         d3.select(`#${selected.id}`).append("rect").attr()
    //     }

    // }, [selected])

    // x axis


    // useEffect(() => {
    //     console.log("draw grid")
    //     var x = d3.scaleLinear().range([0, width]).domain([0, 100000]);
    //     // d3.select("#gridlines")
    //     //     .append("g")
    //     //     .call(d3.axisBottom(x).ticks(10).tickSizeInner(-height))


    // }, [])

    const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {

        const target = event.target

        if (toolbarOption === ToolbarOption.Select) {

            if (selectionIsText(selected) && moveElement instanceof SVGTextElement) {

                const index = textElements.findIndex(t => t.id === selected.id)

                console.log("index: ", index)


                if (index !== -1) {
                    console.log("drop it")

                    const rect = moveElement.getBoundingClientRect()

                    textElements[index].position = { x: rect.x, y: rect.y }

                    setTextElements([...textElements])

                    setMoveElement(null)
                }

            }

            else if (target instanceof SVGPathElement && target.getAttribute("data-countryid")) {
                const countryId = target.getAttribute("data-countryid")
                console.log("countryid: ", target.getAttribute("data-countryid"))
                if (countryId !== null) {
                    setSelectedCountry(countryId)
                } else {
                    setSelectedCountry(null)
                }
            } else if (target instanceof SVGTextElement) {
                const text = textElements.find(t => t.id === target.id)

                if (selectionIsText(selected) && target.id === selected.id) {
                    console.log("time to move")
                    setMoveElement(target)
                } else if (text !== undefined) {
                    console.log("text selected ", text)
                    setSelectedText(text)
                }
            }

        } else if (toolbarOption === ToolbarOption.Text) {

            if (target instanceof SVGTextElement) {
                const id = target.id

            }


            const text: IText = {
                id: "t-" + Math.random().toString().slice(2),
                text: "",
                colour: "black",
                size: 10,
                font: "Arial",
                style: "normal",
                position: {
                    x: event.clientX,
                    y: event.clientY
                }
            }
            setInitTextElement(text)
            // setTextElements([...textElements, text])


        } else if (toolbarOption === ToolbarOption.Sprite) {

            const w = 75
            const h = 75

            const sprite: ISprite = {
                id: "s-" + Math.random().toString().slice(2),
                src: "sprite.png",
                position: {
                    x: event.clientX - (w / 2),
                    y: event.clientY - (h / 2)
                },
                width: w,
                height: h
            }

            setSprites([...sprites, sprite])
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

        if (textElementIndex !== -1) {
            textList[textElementIndex].text = text

            setTextElements(textList)
        }

    }

    const insertTextElementHandler = (text: string) => {

        if (initTextElement !== null) {
            initTextElement.text = text
            setTextElements([...textElements, initTextElement])
            setInitTextElement(null)
        }
    }

    const zoomPositionHandler = (event: React.WheelEvent<HTMLDivElement>) => {


        if (event.deltaY > 0) {
            if (zoomPosition <= zoomPositionMax)
                setZoomPosition(zoomPositionMax)
            else
                setZoomPosition(zoomPosition - scrollSpeed)
        }
        else
            setZoomPosition(zoomPosition + scrollSpeed)
    }

    const scrollPositionDownHandler = (event: React.MouseEvent) => {

        if (event.button === 1) {
            setScrollCanvasMode(true)
            const offsetX = scrollPosition.x - event.clientX
            const offsetY = scrollPosition.y - event.clientY
            setScrollMouseDistance({ x: offsetX, y: offsetY })
        }
    }

    const scrollPositionUpHandler = (event: React.MouseEvent) => {

        if (event.button === 1) {
            setScrollCanvasMode(false)
        }
    }

    function moveMouseHandler(event: React.MouseEvent<HTMLDivElement>) {


        if (moveElement !== null) {
            const rect = moveElement.getBoundingClientRect()

            const offsetX = event.clientX - rect.x;
            const offsetY = event.clientY - rect.y;

            if (moveElement instanceof SVGTextElement) {
                d3.select(`#${moveElement.id}`)
                    .attr("x", rect.x + offsetX)
                    .attr("y", rect.y + offsetY)
            }
        }

        if (scrollCanvasMode) {
            const x = event.clientX + scrollMouseDistance.x
            const y = event.clientY + scrollMouseDistance.y
            setScrollPosition({ x, y })
        }
    }

    return (
        <div
            className={styles["canvas-container"] + toolbarOption === ToolbarOption.Paint ? styles["paint-cursor"] : ""}
            onWheel={zoomPositionHandler}
            onMouseDown={scrollPositionDownHandler}
            onMouseUp={scrollPositionUpHandler}
            onMouseMove={moveMouseHandler}
            onClick={clickHandler}
        >
            <svg width={width} height={height} id="svg-canvas">
                <Map
                    width={width}
                    height={height}
                    data={data}
                    toolBarOption={toolbarOption}
                    scrollPosition={scrollPosition}
                    zoomPosition={zoomPosition}
                    ref={mapSVG}
                />
                {sprites.map(s => <SpriteElement src={s.src} position={s.position} width={s.width} height={s.height} />)}

                {textElements.map(t => (
                    <TextElement
                        key={t.id}
                        id={t.id}
                        position={t.position}
                        text={t.text}
                        onTextFinished={onTextFinished}
                    />
                ))}
                {initTextElement && (
                    <TextElement
                        id={initTextElement.id}
                        position={initTextElement.position}
                        text={initTextElement.text}
                        onTextFinished={onTextFinished}
                        initText={(text) => { text !== "" ? insertTextElementHandler(text) : setInitTextElement(null) }}
                    />
                )}
            </svg>
        </div>
    )
}