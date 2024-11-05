
import { createContext, useContext, useState } from "react";
import { ILegend } from "../components/Board/UI/Legend/LegendTypes";
import { BoardContext } from "./boardContexts";
import { ICountry } from "../types/CountriesTypes";

type ILegendContextType = {
    legend: ILegend[] | null,
    createLegend: () => void,
    addLegendColour: (newColour: string) => void,
    editLegendRow: (oldColour: string, newColour: string, newLabel: string) => void,
    removeLegendColour: (legendIndex: number) => void
    deleteLegend: () => void,
    title: string,
    setTitle: (newTitle: string) => void
}

export const LegendContext = createContext<ILegendContextType>({
    legend: null,
    createLegend: () => { },
    addLegendColour: (newColour: string) => { },
    editLegendRow: (oldColour: string, newColour: string, newLabel: string) => { },
    removeLegendColour: (legendIndex: number) => { },
    deleteLegend: () => { },
    title: "",
    setTitle: (newTitle: string) => { }
})

type IProps = {
    children: JSX.Element
}

export default function LegendContextProvider({ children }: IProps) {
    const [legend, setLegend] = useState<ILegend[] | null>(null)
    const [title, setTitle] = useState<string>("");
    const { countryList, editCountryList } = useContext(BoardContext)

    const createLegend = () => {
        setLegend([])
    }

    const addLegendColourHandler = (newColour: string) => {

        if (legend !== null) {
            // const randomcolour = Math.floor(Math.random() * 16777215).toString(16);
            const existingColourFound = legend.find((l) => l.colour === newColour)

            if (existingColourFound) {
                console.log("Warning! Could not create new label because there are two matching colours. Choose another colour.")
                return
            }
            const newLegend: ILegend = {
                label: "",
                colour: newColour
            }
            setLegend([...legend, newLegend])

        }
    }

    const editLegendRow = (oldcolour: string, newColour: string, newLabel: string) => {

        console.log("oldColour: " + oldcolour, " newColour: ", newColour, " newLabel: ", newLabel)

        if (legend !== null) {
            const index = legend.findIndex(l => l.colour === oldcolour)


            if (index !== -1) {
                console.log("index found: ", index)


                const oldColour = legend[index].colour

                legend[index] = {
                    colour: newColour,
                    label: newLabel
                }
                console.log("legend row changed: ", legend[index])

                setLegend([...legend])

                const countriesThatUseThatOldColour: ICountry[] = countryList.filter(c => c.fillHexColour === oldColour)

                editCountryList(countriesThatUseThatOldColour)
            }

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

    const setTitleHandler = (newTitle: string) => {
        setTitle(newTitle)
    }

    return <LegendContext.Provider value={{
        legend,
        createLegend,
        addLegendColour: addLegendColourHandler,
        editLegendRow,
        removeLegendColour: removeLegendColourHandler,
        deleteLegend,
        title,
        setTitle: setTitleHandler
    }}>
        {children}

    </LegendContext.Provider>
}