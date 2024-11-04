
import { createContext, useState } from "react";
import { ILegend } from "../components/Board/UI/Legend/LegendTypes";

type ILegendContextType = {
    legend: ILegend[] | null,
    createLegend: () => void,
    addLegendColour: (newColour: string) => void,
    removeLegendColour: (legendIndex: number) => void
    deleteLegend: () => void
}

export const LegendContext = createContext<ILegendContextType>({
    legend: null,
    createLegend: () => { },
    addLegendColour: (newColour: string) => { },
    removeLegendColour: (legendIndex: number) => { },
    deleteLegend: () => { }
})

type IProps = {
    children: JSX.Element
}

export default function LegendContextProvider({ children }: IProps) {
    const [legend, setLegend] = useState<ILegend[] | null>(null)

    const createLegend = () => {
        setLegend([])
    }

    const addLegendColourHandler = (newColour: string) => {

        if (legend !== null) {
            // const randomcolour = Math.floor(Math.random() * 16777215).toString(16);
            const newLegend: ILegend = {
                label: "",
                colour: newColour
            }
            setLegend([...legend, newLegend])

        }
    }

    const removeLegendColourHandler = (legendIndex: number) => {
        if (legend !== null) {
            setLegend(legend.splice(legendIndex + 1, 1))

        }
    }

    const deleteLegend = () => {
        setLegend(null)
    }

    return <LegendContext.Provider value={{ legend, createLegend, addLegendColour: addLegendColourHandler, removeLegendColour: removeLegendColourHandler, deleteLegend }}>
        {children}

    </LegendContext.Provider>
}