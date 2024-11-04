import { createContext, useState } from "react";
import { ICountry } from "../types/CountriesTypes";
import { data } from "../data/data"

type IBoardContextType = {
    selectedCountry: ICountry | null;
    setSelectedCountry: (countryId: string | null) => void
    editCountry: (country: ICountry) => void
    countryList: ICountry[]
    currentColour: string;
    setCurrentColour: (hexColour: string) => void
}

export const BoardContext = createContext<IBoardContextType>({
    selectedCountry: null,
    setSelectedCountry: (countryId: string | null) => { },
    editCountry: (country: ICountry) => { },
    countryList: [],
    currentColour: "",
    setCurrentColour: (hexColour: string) => { },
})

type IProps = {
    children: JSX.Element
}

export default function BoardContextProvider({ children }: IProps) {
    const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
    const [countryList, setCountryList] = useState<ICountry[]>([])
    const [currentColour, setCurrentColour] = useState<string>("#4c00ff")

    const setCountryHandler = (countryId: string | null) => {

        const featureFound = data.features.find(feature => feature.id === countryId)

        if (countryId !== null && featureFound && featureFound.properties && featureFound.id) {

            const id = typeof featureFound.id === "number" ? featureFound.id.toString() : featureFound.id;
            const countryExists = countryList.find(c => c.id === countryId)

            if (countryExists) {

                setSelectedCountry(countryExists)

            } else {
                const country: ICountry = {
                    id: id,
                    name: featureFound.properties.name,
                    fillHexColour: null
                }
                setSelectedCountry(country)
            }
        } else {
            setSelectedCountry(null)
        }
    }

    const editCountryHandler = (countryForm: ICountry) => {

        const countryExists = countryList.find(c => c.id === countryForm.id)

        if (countryExists) {

            countryExists.fillHexColour = countryForm.fillHexColour
            const countryIndex = countryList.findIndex(c => c.id === countryForm.id)
            countryList[countryIndex] = countryExists;
            setCountryList([...countryList])

        } else {

            setCountryList([...countryList, countryForm])
        }
    }

    const setColourHandler = (hexColour: string) => {
        setCurrentColour(hexColour)
    }


    return (
        <BoardContext.Provider value={{ selectedCountry, setSelectedCountry: setCountryHandler, editCountry: editCountryHandler, countryList, currentColour, setCurrentColour: setColourHandler, }}>
            {children}

        </BoardContext.Provider>
    )
}