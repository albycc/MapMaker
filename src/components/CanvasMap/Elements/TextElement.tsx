import React, { useContext, useEffect, useState } from "react";
import { Position } from "../../types/Position";
import { IText } from "./element-types";
import { ToolbarContext } from "../../../contexts/toolbarContexts";
import { ToolbarOption } from "../../Board/UI/Toolbar/Toolbar-types";
import { selectionIsText } from "../../../utils/typeChecks";

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
                    <foreignObject x={props.position.x} y={props.position.y - 15} width="110" height="100">
                        <div className="bg-orange-400 flex">
                            <input
                                className="w-full px-2 border-none"
                                style={{ fontSize: props.size }}
                                type="text"
                                name=""
                                id=""
                                defaultValue={props.text}
                                onBlur={(event: React.ChangeEvent<HTMLInputElement>) => handleText(event.currentTarget.value)}
                                onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                                    console.log(event.key)
                                    if (event.key === "Enter") handleText(event.currentTarget.value)
                                }}
                                autoFocus
                            />
                        </div>
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
                            style={{ fontFamily: props.font, fontWeight: props.style === "bold" ? "bold" : "normal", fontStyle: props.style }}
                        >
                            {props.text}
                        </text>
                        {selected?.id === props.id && !props.isMoving ? (
                            <rect
                                x={props.position.x}
                                y={props.position.y - 15}
                                width="100"
                                height="20"
                                stroke="blue"
                                fill="none"
                            ></rect>) : null}

                    </g>
                )}
            )
        </>
    )
}