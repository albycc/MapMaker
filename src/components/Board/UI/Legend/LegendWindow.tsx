import { useCallback, useContext, useEffect, useRef, useState } from "react";
import WindowCard from "../globals/WindowCard";
import { ILegend, ILegendStyles } from "./LegendTypes";
import { LegendContext } from "../../../../contexts/legendContexts";
import { ToolbarOption } from "../Toolbar/Toolbar-types";
import { BoardContext } from "../../../../contexts/boardContexts";
import deleteIcon from "../../../../icons/delete_icon.png"
import LegendWindowStyles from "./LegendWindowStyles";
import { Position } from "../../../types/Position";
import { ToolbarContext } from "../../../../contexts/toolbarContexts";
import * as d3 from "d3"

interface IProps {
    initialPosition: Position
}

const legendStyles: ILegendStyles = {
    border: true,
    borderColor: "#828282",
    borderWidth: 2,
    borderRound: 10,
    background: true,
    backgroundColor: "#ffffff",
    fontColor: "#4f4f4f",
    titleSize: 20,
    framePadding: 10,
    spaceBetweenRows: 5
}

export default function LegendWindow({ initialPosition }: IProps) {

    const [legend, setLegend] = useState<ILegend[]>([])

    const { currentColour, setCurrentColour, toolbarOption } = useContext(ToolbarContext)
    const [newColour, setNewColour] = useState<string>("")
    const [legendTitle, setLegendTitle] = useState<string>("Legend title")
    const [legendTitleEditMode, setLegendTitleEditMode] = useState<boolean>(false)

    const [legendRowEdit, setLegendRowEdit] = useState<ILegend | null>(null)


    const isPaintMode = toolbarOption === ToolbarOption.Paint

    const [position, setPosition] = useState<Position>({ x: 10, y: 500 })
    const [positionOffset, setPositionOffset] = useState<Position>({ x: 0, y: 0 })

    const [moveMode, setMoveMode] = useState<boolean>(false);

    const [legendStyle, setLegendStyle] = useState<ILegendStyles>(legendStyles)

    useEffect(() => {
        const mouseTrack = (event: MouseEvent) => {

            d3.select("#legend").attr("x", event.clientX).attr("y", event.clientY)

            // setPosition({ x: event.clientX, y: event.clientY })

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
                console.log("Warning! Could not create new label because there are two matching colours. Choose another colour.")
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

    // const calcTextAreaHeight = () => {

    //     const textArea = titleTextArea.current;

    //     if (textArea !== null) {
    //         setTextAreaHeight(textArea.scrollHeight)
    //     }
    // }

    console.log("render Legend window", moveMode)

    const onLegendWindowClick = (event: React.MouseEvent<SVGRectElement>) => {
        const element = event.target as SVGRectElement

        const rect = element.getBoundingClientRect()

        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;

        if (element.id === "legend") {
            setMoveMode(!moveMode)
            setPositionOffset({ x: offsetX, y: offsetY })
            setPosition({ x: event.pageX, y: event.pageY })

        }

    }

    const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {

        const x = event.pageX
        const y = event.pageY

        if (moveMode) {
            setPosition({ x, y })
        }
    }

    const onLegendStylesChange = (form: ILegendStyles) => {

        console.log(form)

        setLegendStyle(form)
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
            <rect
                id="legend-frame"
                width={300}
                height={150 + legend.length * 50}
                fill="white"
                rx={15}
                style={{ stroke: "black", strokeWidth: 1 }}
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
                    x={100}
                    y={40}
                    fontSize={22}
                    onClick={() => setLegendTitleEditMode(true)}
                    width="300"
                    height="100"
                >
                    {legendTitle}
                </text>

            )}
            <g>
                {legend.map((l, i) => (
                    <g key={l.id} transform={`translate(${20} ${(i + 1) * 40 + 20})`}>
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
                                >
                                    {l.label}
                                </text>
                            )
                        }

                    </g>
                ))
                }
            </g>

            <foreignObject x={20} y={50 + legend.length * 50} width="250" height="100">
                <div className="flex bg-gray-100">
                    <input className="w-6" type="color" name="" id="new-legend" value={newColour} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setNewColour(event.target.value)
                    }} />
                    <button className="text-gray-500  w-full" onClick={() => addLegendColourHandler()}>New legend</button>
                </div>
            </foreignObject>
            {/* <div className="px-3 py-2 w-full max-w-56 cursor-move" id="legend"
                onClick={onLegendWindowClick}
                onMouseMove={onMouseMove}
                style={{
                    borderColor: legendStyle.borderColor,
                    borderWidth: legendStyle.borderWidth,
                    borderRadius: legendStyle.borderRound,
                    backgroundColor: legendStyle.backgroundColor,
                    padding: legendStyle.framePadding
                }}
            >
                <div className="cursor-pointer">
                    <div className="flex justify-center my-2">
                        <textarea
                            ref={titleTextArea}
                            className=" text-center font-bold overflow-y-hidden w-full resize-none bg-transparent"
                            placeholder="Add title here"
                            value={legendTitle}
                            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                                setLegendTitle(event.target.value)
                            }}
                            onBlur={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                                setTitle(event.target.value)
                            }}
                            style={{
                                height: textAreaHeight,
                                fontSize: legendStyle.titleSize,
                                color: legendStyle.fontColor
                            }}
                        >
                        </textarea>
                    </div>
                    <ul>
                        {legend && legend.map(({ id, colour, label }) => (
                            <li
                                key={id}
                                className={"flex justify-between " + (isPaintMode ? "hover:bg-cyan-200" : "")}
                                style={{ marginTop: legendStyle.spaceBetweenRows }}

                            >
                                <input
                                    className="w-5 cursor-pointer bg-transparent"
                                    value={colour}
                                    type="color"
                                    id={"l-" + id}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setColourChanged(event.target.value)}
                                    onBlur={() => editLegendRow(id, colourChanged, label)}
                                    style={{ color: legendStyle.fontColor }}
                                />
                                {isPaintMode ?
                                    <button
                                        className="w-full text-left"
                                        style={{ color: legendStyle.fontColor }}
                                        onClick={() => { setCurrentColour(colour) }}>{label}</button>
                                    :
                                    <>
                                        <input
                                            className="w-full bg-transparent"
                                            type="text"
                                            placeholder="Insert label"
                                            value={label}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                editLegendRow(id, colour, event.target.value)
                                            }}
                                            onBlur={() => setFocusOnNewInput(false)}
                                            autoFocus={focusOnNewInput}
                                            style={{ color: legendStyle.fontColor }}
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
                        {!isPaintMode ? <li className="flex" style={{ marginTop: legendStyle.spaceBetweenRows }}>
                            <input
                                className="w-5 grow-0 bg-transparent"
                                type="color"
                                value={newColour}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setNewColour(event.target.value)
                                }} />
                            <button className="text-slate-400" onClick={() => {

                                console.log(newColour)

                                addLegendColour(newColour)
                                setFocusOnNewInput(true);

                            }}>Add new label</button>
                        </li> : null}
                    </ul>
                </div>
            </div>
            {displayStyles ? <LegendWindowStyles values={legendStyle} onChange={onLegendStylesChange} close={() => setDisplayStyles(false)} />
                :
                <div className=" ml-2">
                    <button onClick={() => setDisplayStyles(true)}>S</button>
                </div>} */}

        </svg>
    )
}