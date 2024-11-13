import React, { useEffect, useState } from "react";
import { Position } from "../../types/Position";
import { IText } from "./element-types";

interface IProps {
    id: string;
    text: string;
    position: Position;
    onTextFinished: (id: string, text: string) => void
}

export default function TextElement(props: IProps) {

    const [editing, setEditing] = useState<boolean>(true)

    const onTextFinishedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {

        const value = event.target.value
        props.onTextFinished(props.id, value)
        setEditing(false)

    }



    return (
        <>
            {editing ?
                (
                    <div>
                        <input type="text" name="" id="" onBlur={onTextFinishedHandler} autoFocus />

                    </div>
                )

                : (
                    <text
                        id={props.id}
                        x={props.position.x}
                        y={props.position.y}

                    >
                        {props.text}
                    </text>)}
            )
        </>
    )
}