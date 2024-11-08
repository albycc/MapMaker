import { useCallback, useContext, useEffect, useRef, useState } from "react";
import WindowCard from "../globals/WindowCard";
import { ILegend } from "./LegendTypes";
import { LegendContext } from "../../../../contexts/legendContexts";
import { ToolbarOption } from "../Toolbar/Toolbar-types";
import { BoardContext } from "../../../../contexts/boardContexts";
import deleteIcon from "../../../../icons/delete_icon.png"

interface IProps {
    toolbarOption: ToolbarOption
}

export default function LegendWindow({ toolbarOption }: IProps) {


    const { setCurrentColour, currentColour } = useContext(BoardContext)
    const [newColour, setNewColour] = useState<string>(currentColour)
    const [legendTitle, setLegendTitle] = useState<string>("")

    const { legend, addLegendColour, createLegend, removeLegendColour, editLegendRow, title, setTitle } = useContext(LegendContext)

    const [colourChanged, setColourChanged] = useState<string>("");

    const isPaintMode = toolbarOption === ToolbarOption.Paint

    const [focusOnNewInput, setFocusOnNewInput] = useState<boolean>(false)

    const titleTextArea = useRef<HTMLTextAreaElement>(null)
    const [textAreaHeight, setTextAreaHeight] = useState<number>()

    useEffect(() => {
        setLegendTitle(title)
        calcTextAreaHeight()

    }, [title])

    const calcTextAreaHeight = () => {

        const textArea = titleTextArea.current;

        if (textArea !== null) {
            setTextAreaHeight(textArea.scrollHeight)
        }
    }


    return (
        <>
            {legend !== null ? (
                <div className="absolute rounded-2xl border-slate-500 border-2 px-3 py-2 w-full max-w-56 cursor-move" style={{ left: 10, top: 500 }}>
                    <div>
                        <div className="flex justify-center my-2">
                            <textarea
                                ref={titleTextArea}
                                className="text-lg text-center overflow-y-hidden w-full resize-none"
                                placeholder="Add title here"
                                value={legendTitle}
                                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                                    setLegendTitle(event.target.value)
                                    calcTextAreaHeight()
                                }}
                                onBlur={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                                    setTitle(event.target.value)
                                }}
                                style={{ height: textAreaHeight }}
                            >
                            </textarea>
                        </div>
                        <ul>
                            {legend && legend.map(({ id, colour, label }) => (
                                <li key={id} className={"flex justify-between " + (isPaintMode ? "hover:bg-cyan-200" : "")} >
                                    <input
                                        className="w-5 cursor-pointer"
                                        value={colour}
                                        type="color"
                                        id={"l-" + id}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setColourChanged(event.target.value)}
                                        onBlur={(event: React.ChangeEvent<HTMLInputElement>) => editLegendRow(id, colourChanged, label)}
                                    />
                                    {isPaintMode ?
                                        <button className="w-full text-left" onClick={() => { setCurrentColour(colour) }}>{label}</button>
                                        :
                                        <>
                                            <input
                                                className="w-full"
                                                type="text"
                                                placeholder="Insert label"
                                                value={label}
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                    editLegendRow(id, colour, event.target.value)
                                                }}
                                                onBlur={() => setFocusOnNewInput(false)}
                                                autoFocus={focusOnNewInput}
                                            />
                                            <div className="w-4">
                                                <button onClick={() => removeLegendColour(id)}>
                                                    <img src={deleteIcon} alt="D" />
                                                </button>
                                            </div>
                                        </>
                                    }
                                </li>
                            ))}
                            {!isPaintMode ? <li className="flex">
                                <input className="w-5 grow-0" type="color" value={newColour} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setNewColour(event.target.value)
                                }} />
                                <button className="text-slate-400" onClick={() => {

                                    addLegendColour(newColour)
                                    setFocusOnNewInput(true);

                                }}>Add new label</button>
                            </li> : null}
                        </ul>
                    </div>
                </div>
            ) :
                (
                    <div className="absolute rounded-2xl border-slate-300 border-2 px-3 py-2 w-full max-w-56" style={{ left: 10, top: 500 }}>
                        <button className="text-slate-400" onClick={() => createLegend()}>Create new Legend</button>

                    </div>
                )}
        </>
    )
}