import React, { useContext, useEffect, useState } from "react";
import { Position } from "../../types/Position";
import { ToolbarContext } from "../../../contexts/toolbarContexts";
import { ToolbarOption } from "../../Board/UI/Toolbar/Toolbar-types";
import { selectionIsText } from "../../../utils/typeChecks";
import * as d3 from "d3"

interface IProps {
    id: string;
    text: string;
    position: Position;
    font?: string;
    size?: number;
    colour?: string;
    style?: string;
    onTextFinished: (id: string, text: string) => void
    initText?: (text: string) => void;
    isMoving?: boolean
}

export default function TextElement(props: IProps) {

    const [editing, setEditing] = useState<boolean>(true)
    const { toolbarOption, selected } = useContext(ToolbarContext)
    const [selectionRect, setSelectionRect] = useState({ x: 0, y: 0, width: 0, height: 0 })

    useEffect(() => {

        if (selectionIsText(selected)) {
            if (props.isMoving === false) {
                const target = d3.select(`#${selected.id}`).node()

                if (target instanceof SVGElement) {

                    const rect = target.getBoundingClientRect()

                    setSelectionRect({ x: rect.x, y: rect.y, width: rect.width, height: rect.height })

                }
            }

        }

    }, [selected, props.isMoving])

    const handleText = (newText: string) => {
        if (props.initText && newText === "") {
            props.initText("")
            return
        } else if (props.initText && newText !== "") {
            props.initText(newText)
        }

        setEditing(false)
        props.onTextFinished(props.id, newText)

    }

    const textClickHandler = (event: React.MouseEvent<SVGTextElement>) => {

        if (toolbarOption === ToolbarOption.Text) {
            setEditing(true)
        }
    }

    return (
        <>
            {editing ?
                (
                    <foreignObject x={props.position.x} y={props.position.y - 15} width="100%" height="100">
                        <input
                            className="w-full px-2 border-none focus:outline-none bg-transparent"
                            style={{ fontSize: props.size, color: props.colour }}
                            type="text"
                            name=""
                            id=""
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
                    <g >
                        <text
                            id={props.id}
                            x={props.position.x}
                            y={props.position.y}
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
                        {selected?.id === props.id && !props.isMoving ? (
                            <rect
                                id={props.id + "-rect"}
                                x={selectionRect.x}
                                y={selectionRect.y}
                                data-noexport
                                width={selectionRect.width}
                                height={selectionRect.height}
                                stroke="blue"
                                fill="none"
                            ></rect>) : null}

                    </g>
                )}
            )
        </>
    )
}