import React, { useContext, useEffect, useRef, useState } from "react";
import { Position } from "../../types/Position";
import { ToolbarContext } from "../../../contexts/toolbarContexts";
import { ToolbarOption } from "../../Board/UI/Toolbar/Toolbar-types";
import { selectionIsText } from "../../../utils/typeChecks";
import * as d3 from "d3"
import { IText } from "./element-types";

interface IProps {
    id: string;
    text: string;
    position: Position;
    font: string;
    size: number;
    colour: string;
    style: string;
    onTextFinished: (id: string, text: string) => void
    initText?: (text: string) => void;
    updatePosition: (id: string, position: Position) => void
    textElements: IText[]
}

export default function TextElement(props: IProps) {

    const [editing, setEditing] = useState<boolean>(true)
    const { toolbarOption, selected } = useContext(ToolbarContext)
    const [selectionRect, setSelectionRect] = useState({ x: 0, y: 0, width: 0, height: 0 })
    const [delta, setDelta] = useState<Position>({ x: 0, y: 0 })

    const ref = useRef<SVGTextElement>(null)

    useEffect(() => {

        console.log("editing: ", editing)

        console.log("ref: ", ref.current)
        console.log("select: ", d3.select(`#${props.id}`))
        if (ref.current !== null) {

            const textElement = d3.select(`#${props.id}`)

            const call: any = d3.drag()
                .on("start", function (event) {

                    // console.log("x: ", textElement.attr("x"))
                    // console.log("y: ", textElement.attr("y"))
                    // console.log("clientX: ", event.sourceEvent.clientX)
                    // console.log("clientY: ", event.sourceEvent.clientY)

                    setDelta({
                        x: +textElement.attr("x") - event.sourceEvent.clientX,
                        y: +textElement.attr("y") - event.sourceEvent.clientY,
                    })
                })
                .on("drag", function (event) {

                    // console.log("event: ", event)

                    // console.log("delta: ", delta)
                    // console.log("props.position.x: ", props.position.x)
                    // console.log("position.y: ", props.position.y)
                    textElement
                        .attr("x", event.sourceEvent.clientX + delta.x)
                        .attr("y", event.sourceEvent.clientY + delta.y)
                })
                .on("end", function (event) {

                    props.updatePosition(props.id, { x: event.sourceEvent.clientX + delta.x, y: event.sourceEvent.clientY + delta.y })
                })

            call(d3.select(`#${props.id}`))

        }

        return () => { d3.select(`#${props.id}`).on("drag", null).on("start", null).on("end", null) }

    }, [editing, props.position, props.textElements])

    // useEffect(() => {

    //     if (selectionIsText(selected) && selected.id === props.id) {
    //         if (props.isMoving === false) {
    //             const target = d3.select(`#${selected.id}`).node()

    //             if (target instanceof SVGElement) {

    //                 const rect = target.getBoundingClientRect()

    //                 setSelectionRect({ x: rect.x, y: rect.y, width: rect.width, height: rect.height })
    //             }
    //         }

    //     }

    // }, [selected, props.isMoving])

    const handleText = (newText: string) => {

        setEditing(false)
        props.onTextFinished(props.id, newText)
    }

    const textClickHandler = () => {

        if (toolbarOption === ToolbarOption.Text)
            setEditing(true)
    }

    //focus:outline-none bg-transparent

    return (
        <g>
            {editing ?
                (
                    <foreignObject transform={`translate(${props.position.x}, ${props.position.y})`} width="100%" height="100%">
                        <input
                            className="w-full px-2 border-none focus:outline-none bg-transparent"
                            style={{ fontSize: props.size, color: props.colour, fontFamily: props.font }}
                            type="text"
                            defaultValue={props.text}
                            onBlur={(event: React.ChangeEvent<HTMLInputElement>) => handleText(event.currentTarget.value)}
                            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                                if (event.key === "Enter") handleText(event.currentTarget.value)
                            }}
                            autoFocus
                        />
                    </foreignObject>
                )
                : (
                    <>
                        <text
                            ref={ref}
                            id={props.id}
                            x={props.position.x}
                            y={props.position.y}
                            width="100%"
                            height="100%"
                            onClick={textClickHandler}
                            className={toolbarOption === ToolbarOption.Text ? "cursor-text" : "cursor-pointer"}
                            fontSize={props.size + "px"}
                            style={{
                                fontFamily: props.font,
                                fontWeight: props.style === "bold" ? "bold" : "normal",
                                fontStyle: props.style,
                                color: props.colour
                            }}
                            fill={props.colour}
                        >
                            {props.text}
                        </text>


                    </>
                )}
            )
        </g>
    )
}