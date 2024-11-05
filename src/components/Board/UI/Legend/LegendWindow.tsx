import { useCallback, useContext, useEffect, useState } from "react";
import WindowCard from "../globals/WindowCard";
import { ILegend } from "./LegendTypes";
import { LegendContext } from "../../../../contexts/legendContexts";
import { ToolbarOption } from "../Toolbar/Toolbar-types";
import { BoardContext } from "../../../../contexts/boardContexts";

interface IProps {
    toolbarOption: ToolbarOption
}

export default function LegendWindow({ toolbarOption }: IProps) {


    const [newColour, setNewColour] = useState<string>("#0015ff")
    const [legendTitle, setLegendTitle] = useState<string>("")

    const { legend, addLegendColour, createLegend, editLegendRow, title, setTitle } = useContext(LegendContext)
    const { setCurrentColour } = useContext(BoardContext)

    const [colourChanged, setColourChanged] = useState<string>("");

    const isPaintMode = toolbarOption === ToolbarOption.Paint

    useEffect(() => {
        setLegendTitle(title)

    }, [title])

    return (
        <>
            {legend !== null ? (
                <div className="absolute rounded-2xl border-slate-500 border-2 px-3 py-2 w-full max-w-56" style={{ left: 10, top: 500 }}>
                    <div>
                        <div>
                            <input
                                type="text" className="text-lg text-center"
                                value={legendTitle}
                                placeholder="Add title here"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setLegendTitle(event.target.value) }}
                                onBlur={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setTitle(event.target.value)
                                }} />
                        </div>
                        <ul>
                            {legend && legend.map(({ colour, label }) => (
                                <li key={colour} className={"flex "} >
                                    {
                                        isPaintMode ? (
                                            <>
                                                <input
                                                    className="w-5 grow-0 cursor-pointer"
                                                    value={colour}
                                                    type="color"
                                                    id={"l-" + colour}
                                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setColourChanged(event.target.value)}
                                                    onBlur={(event: React.ChangeEvent<HTMLInputElement>) => editLegendRow(colour, colourChanged, label)}
                                                />
                                                <button className="w-full" onClick={() => { setCurrentColour(colour) }}>{label}</button>
                                            </>
                                        ) : (
                                            <>
                                                <input
                                                    className="w-5 grow-0 cursor-pointer"
                                                    value={colour}
                                                    type="color"
                                                    id={"l-" + colour}
                                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setColourChanged(event.target.value)}
                                                    onBlur={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                        editLegendRow(colour, colourChanged, label)
                                                    }} />
                                                <input type="text" defaultValue={label} placeholder="Insert label" />
                                            </>
                                        )

                                    }


                                </li>

                            ))}
                            <li className="flex">
                                <input className="w-5 grow-0" type="color" value={newColour} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setNewColour(event.target.value)
                                }} />
                                <button onClick={() => addLegendColour(newColour)}>Add new label</button>
                            </li>
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