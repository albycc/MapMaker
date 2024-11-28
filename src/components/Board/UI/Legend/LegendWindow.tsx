import { useContext, useEffect, useState } from "react";
import { ILegend } from "../../../../types/LegendTypes";
import { ToolbarOption } from "../Toolbar/Toolbar-types";
import { ToolbarContext } from "../../../../contexts/toolbarContexts";
import deleteIcon from "../../../../icons/delete_icon.png"
import * as d3 from "d3"
import { MenubarContext } from "../../../../contexts/menubarContexts";
import { MenubarOption } from "../MenuBar/MenuBar-Types";


export default function LegendWindow() {

    const [legend, setLegend] = useState<ILegend[]>([])

    const { currentColour, setCurrentColour, toolbarOption, toolbarLegendStyles, setToolbarLegendStyles } = useContext(ToolbarContext)
    const { menubarOption } = useContext(MenubarContext)
    const [newColour, setNewColour] = useState<string>("")
    const [legendTitle, setLegendTitle] = useState<string>("Legend title")
    const [legendTitleEditMode, setLegendTitleEditMode] = useState<boolean>(false)

    const [legendRowEdit, setLegendRowEdit] = useState<ILegend | null>(null)

    useEffect(() => {


        setToolbarLegendStyles({
            borderColor: "#828282",
            borderWidth: 2,
            borderRound: 10,
            backgroundColor: "#ffffff",
            fontColor: "#4f4f4f",
            titleSize: 20,
            spaceBetweenRows: 40
        })
        const mouseTrack = (event: MouseEvent) => {

            d3.select("#legend").attr("x", event.clientX).attr("y", event.clientY)


            document.removeEventListener("click", mouseTrack)


        }
        if (typeof currentColour === "string")
            setNewColour(currentColour)

        document.addEventListener("click", mouseTrack)

    }, [])


    const addLegendColourHandler = () => {

        if (legend !== null) {
            const existingColourFound = legend.find((l) => l.colour === newColour)

            if (existingColourFound) {
                alert("Warning! Could not create new label because there are two matching colours. Choose another colour.")
                return
            }
            const newLegend: ILegend = {
                id: Math.random().toString().slice(2),
                label: "",
                colour: newColour
            }

            setLegend([...legend, newLegend])
            setLegendRowEdit(newLegend)
        }
    }

    const legendRowInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (legendRowEdit) {
            setLegendRowEdit({ ...legendRowEdit, [event.target.id]: event.target.value })
        }
    }

    const legendRowInputBlurHandler = (event: React.ChangeEvent) => {

        if (legendRowEdit) {
            const index = legend.findIndex(l => l.id === legendRowEdit.id)

            if (index !== -1) {

                legend[index] = legendRowEdit

                setLegend([...legend])

                setLegendRowEdit(null)
            }
        }
    }

    return (
        <svg id="legend">
            {toolbarLegendStyles !== null ?
                <>
                    <rect
                        id="legend-frame"
                        width={300}
                        height={150 + legend.length * 50}
                        fill={toolbarLegendStyles.backgroundColor}
                        rx={toolbarLegendStyles.borderRound}
                        style={{
                            stroke: toolbarLegendStyles.borderColor, strokeWidth: toolbarLegendStyles.borderWidth
                        }}
                        className={toolbarOption === ToolbarOption.Select ? "cursor-move" : ""}
                    />
                    {legendTitleEditMode ? (
                        <foreignObject x="30" width="250" height="100">
                            <input
                                className="h-10 text-xl text-center"
                                type="text"
                                name="legend-title"
                                id="legend-title"
                                autoFocus
                                defaultValue={legendTitle}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLegendTitle(event.target.value)}
                                onBlur={() => setLegendTitleEditMode(false)}
                            />
                        </foreignObject>
                    ) : (
                        <text
                            x={20}
                            y={40}
                            fontSize={toolbarLegendStyles.titleSize}
                            onClick={() => setLegendTitleEditMode(true)}
                            width="300"
                            height="100"
                            fill={toolbarLegendStyles.fontColor}
                        >
                            {legendTitle}
                        </text>
                    )}
                    <g>
                        {legend.map((l, i) => (
                            <g key={l.id} transform={`translate(${20} ${(i + 1) * toolbarLegendStyles.spaceBetweenRows + 20})`}>
                                <rect fill={l.colour} width={20} height={20}></rect>
                                {
                                    legendRowEdit?.id === l.id ? (
                                        <foreignObject x="30" width="250" height="100">
                                            <input
                                                type="text"
                                                name="label"
                                                id="label"
                                                autoFocus
                                                defaultValue={legendRowEdit.label}
                                                onChange={legendRowInputChangeHandler}
                                                onBlur={legendRowInputBlurHandler}
                                            />
                                        </foreignObject>
                                    ) : (
                                        <text
                                            x="30"
                                            y="15"
                                            onClick={() => {
                                                if (toolbarOption === ToolbarOption.Paint)
                                                    setCurrentColour(l.colour)
                                                else
                                                    setLegendRowEdit(l)
                                            }}
                                            className={toolbarOption === ToolbarOption.Paint ? "cursor-pointer" : "cursor-text"}
                                            fill={toolbarLegendStyles.fontColor}
                                        >
                                            {l.label}
                                        </text>
                                    )
                                }
                                {toolbarOption !== ToolbarOption.Paint ? <image
                                    data-noexport
                                    href={deleteIcon}
                                    x="250"
                                    width="20"
                                    height="20"
                                    className="cursor-pointer"
                                    onClick={() => setLegend([...legend.filter(ol => ol.id !== l.id)])}
                                /> : null}

                            </g>
                        ))
                        }
                    </g>

                    {menubarOption !== MenubarOption.Export ? <foreignObject x={20} y={50 + legend.length * 50} width="250" height="100">
                        <div className="flex bg-gray-100" >
                            <input
                                className="w-6"
                                type="color"
                                name="new-legend"
                                id="new-legend"
                                value={newColour}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setNewColour(event.target.value)
                                }}
                            />
                            <button className="text-gray-500  w-full" onClick={() => addLegendColourHandler()}>New legend</button>
                        </div>
                    </foreignObject> : null}
                </>

                : null}
        </svg>
    )
}