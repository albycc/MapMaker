import { useCallback, useContext, useState } from "react";
import WindowCard from "../globals/WindowCard";
import { ILegend } from "./LegendTypes";
import { LegendContext } from "../../../../contexts/legendContexts";
import { ToolbarOption } from "../Toolbar/Toolbar-types";

interface IProps {
    toolbarOption: ToolbarOption
}

export default function LegendWindow({ toolbarOption }: IProps) {


    const [title, setTitle] = useState<string>("")
    const [newColour, setNewColour] = useState<string>("#0015ff")

    const { legend, addLegendColour, createLegend } = useContext(LegendContext)

    const isPaintMode = toolbarOption === ToolbarOption.Paint

    return (
        <>
            {legend !== null ? (
                <div className="absolute rounded-2xl border-slate-500 border-2 px-3 py-2 w-full max-w-56" style={{ left: 10, top: 500 }}>
                    <div>
                        <div>
                            <input type="text" className="text-lg" name="" id="" />
                        </div>
                        <ul>
                            {legend && legend.map(colour => (
                                <li className={"flex " + (isPaintMode ? "cursor-pointer" : "")}>
                                    <>
                                        <input className="w-5 grow-0" type="color" id={"l-" + colour.colour} defaultValue={colour.colour || "#0015ff"} disabled={isPaintMode} />
                                        <input type="text" name="" id="" defaultValue={colour.label} placeholder="Insert label" disabled={isPaintMode} />
                                    </>

                                </li>
                            ))}
                            <li className="flex">
                                <input className="w-5 grow-0" type="color" value={newColour} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setNewColour(event.target.value)
                                }} />
                                <button onClick={() => addLegendColour(newColour)}>New</button>
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