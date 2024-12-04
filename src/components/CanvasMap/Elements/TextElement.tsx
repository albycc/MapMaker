import React, { useContext, useEffect, useRef, useState } from "react";
import { Position } from "../../types/Position";
import { ToolbarContext } from "../../../contexts/toolbarContexts";
import { ToolbarOption } from "../../Board/UI/Toolbar/Toolbar-types";
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
    const { toolbarOption } = useContext(ToolbarContext)
    const [delta, setDelta] = useState<Position>({ x: 0, y: 0 })
    const [onDrag, setOnDrag] = useState<boolean>(false)
    const ref = useRef<SVGTextElement>(null)

    const handleText = (newText: string) => {

        setEditing(false)
        props.onTextFinished(props.id, newText)
    }

    const textClickHandler = () => {

        if (toolbarOption === ToolbarOption.Text)
            setEditing(true)
    }

    useEffect(() => {

        if (onDrag) {

            const onMouseMoveHandler = (event: MouseEvent) => {

                event.preventDefault()

                d3.select(`#${props.id}`).attr("x", event.clientX + delta.x).attr("y", event.clientY + delta.y)
            }

            function onMouseUpHandler(event: MouseEvent) {

                props.updatePosition(props.id, { x: event.clientX + delta.x, y: event.clientY + delta.y })

                document.removeEventListener("mousemove", onMouseMoveHandler)
                document.removeEventListener("mouseup", onMouseUpHandler)
                setOnDrag(false)
            }

            document.addEventListener("mousemove", onMouseMoveHandler)
            document.addEventListener("mouseup", onMouseUpHandler)
        }


    }, [onDrag])

    function onMouseDownHandler(event: React.MouseEvent<SVGTextElement>) {

        event.preventDefault()

        if (ref.current) {

            setDelta({ x: +d3.select(`#${props.id}`).attr("x") - event.clientX, y: +d3.select(`#${props.id}`).attr("y") - event.clientY })
            setOnDrag(true)
        }
    }

    return (
        <g>
            {editing ?
                (
                    <foreignObject x={props.position.x} y={props.position.y - props.size} width="100%" height="100%">
                        <input
                            className={"border-none focus:outline-none bg-transparent bg-slate-400 focus:p-0"}
                            style={{
                                fontSize: props.size,
                                color: props.colour,
                                fontFamily: props.font,
                            }}
                            type="text"
                            defaultValue={props.text}
                            onBlur={(event: React.ChangeEvent<HTMLInputElement>) => handleText(event.currentTarget.value)}
                            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => { if (event.key === "Enter") { handleText(event.currentTarget.value) } }}
                            autoFocus
                        />
                    </foreignObject>
                )
                : (
                    <text
                        ref={ref}
                        id={props.id}
                        x={props.position.x}
                        y={props.position.y}
                        width="100%"
                        height="100%"
                        onClick={textClickHandler}
                        onMouseDown={onMouseDownHandler}
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
                )}
            )
        </g>
    )
}