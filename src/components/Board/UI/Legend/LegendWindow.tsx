import { useCallback, useContext, useEffect, useRef, useState } from "react";
import WindowCard from "../globals/WindowCard";
import { ILegend, ILegendStyles } from "./LegendTypes";
import { LegendContext } from "../../../../contexts/legendContexts";
import { ToolbarOption } from "../Toolbar/Toolbar-types";
import { BoardContext } from "../../../../contexts/boardContexts";
import deleteIcon from "../../../../icons/delete_icon.png"
import LegendWindowStyles from "./LegendWindowStyles";
import { Position } from "../../../types/Position";

interface IProps {
    toolbarOption: ToolbarOption,
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

export default function LegendWindow({ toolbarOption, initialPosition }: IProps) {


    const { setCurrentColour, currentColour } = useContext(BoardContext)
    const [newColour, setNewColour] = useState<string>(currentColour)
    const [legendTitle, setLegendTitle] = useState<string>("")

    const { legend, addLegendColour, createLegend, removeLegendColour, editLegendRow, title, setTitle } = useContext(LegendContext)

    const [colourChanged, setColourChanged] = useState<string>("");

    const isPaintMode = toolbarOption === ToolbarOption.Paint

    const [focusOnNewInput, setFocusOnNewInput] = useState<boolean>(false)

    const [position, setPosition] = useState<Position>({ x: 10, y: 500 })
    const [positionOffset, setPositionOffset] = useState<Position>({ x: 0, y: 0 })

    const [moveMode, setMoveMode] = useState<boolean>(false);

    const titleTextArea = useRef<HTMLTextAreaElement>(null)
    const [textAreaHeight, setTextAreaHeight] = useState<number>()

    const [displayStyles, setDisplayStyles] = useState<boolean>(false)

    const [legendStyle, setLegendStyle] = useState<ILegendStyles>(legendStyles)

    useEffect(() => {
        setPosition({ x: initialPosition.x, y: initialPosition.y })
        createLegend()

    }, [])


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

    console.log("render Legend window", moveMode)

    const onLegendWindowClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const element = event.target as HTMLDivElement

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
            setPosition({ x: x, y: y })
        }
    }

    const onLegendStylesChange = (form: ILegendStyles) => {

        console.log(form)

        setLegendStyle(form)

    }

    return (
        <div className="absolute flex" style={{ left: position.x - positionOffset.x, top: position.y - positionOffset.y }}>
            <div className="px-3 py-2 w-full max-w-56 cursor-move" id="legend"
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
                                calcTextAreaHeight()
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
                </div>}

        </div>
    )
}