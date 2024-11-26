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
    onTextFinished: (id: string, text: string) => void
    initText?: (text: string) => void
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

        props.onTextFinished(props.id, newText)
        setEditing(false)

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
                    <foreignObject x={props.position.x} y={props.position.y} width="110" height="30">
                        <div className="bg-orange-400 flex">
                            <input
                                className="w-full px-2"
                                type="text"
                                name=""
                                id=""
                                defaultValue={props.text}
                                onBlur={(event: React.ChangeEvent<HTMLInputElement>) => handleText(event.currentTarget.value)}
                                onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (event.key === "Enter") handleText(event.currentTarget.value)
                                }}
                                autoFocus />
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
                            className="cursor-pointer select-none"
                        >
                            {props.text}
                        </text>
                        {selected?.id === props.id ? <rect x={props.position.x} y={props.position.y - 15} width="100" height="20" stroke="blue" fill="none"></rect> : null}

                    </g>
                )}
            )
        </>
    )
}