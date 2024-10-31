import { createContext, useContext, useState } from "react";
import { ICountry, ICountryForm } from "../types/CountriesTypes";
import { data } from "../data/data"

type BoardContextType = {
    selectedCountry: ICountry | null;
    setSelectedCountry: (countryId: string) => void
    editSelectedCountry: (country: ICountryForm) => void
    countryList: ICountry[]
}

export const BoardContext = createContext<BoardContextType>({
    selectedCountry: null,
    setSelectedCountry: (countryId: string) => { },
    editSelectedCountry: (country: ICountryForm) => { },
    countryList: []
})

type IProps = {
    children: JSX.Element
}

export default function BoardContextProvider({ children }: IProps) {
    const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
    const [countryList, setCountryList] = useState<ICountry[]>([])

    const setCountryHandler = (countryId: string) => {

        const featureFound = data.features.find(feature => feature.id === countryId)

        if (featureFound && featureFound.properties && featureFound.id) {

            const id = typeof featureFound.id === "number" ? featureFound.id.toString() : featureFound.id;

            const countryExists = countryList.find(c => c.countryId === countryId)

            if (countryExists) {

                setSelectedCountry(countryExists)

            } else {
                const country: ICountry = {
                    countryId: id,
                    countryName: featureFound.properties.name,
                    fillHexColour: null
                }

                setSelectedCountry(country)
            }


        }
    }

    const editCountryHandler = (countryForm: ICountryForm) => {

        if (selectedCountry) {

            const countryExists = countryList.find(c => c.countryId === countryForm.countryId)

            if (countryExists) {
                countryExists.fillHexColour = selectedCountry.fillHexColour
                const countryIndex = countryList.findIndex(c => c.countryId === countryForm.countryId)

                countryList[countryIndex] = countryExists;

                setCountryList(countryList)

            } else {
                const newCountry: ICountry = {
                    countryId: selectedCountry.countryId,
                    countryName: selectedCountry.countryName,
                    fillHexColour: countryForm.fillHexColour
                }

                console.log("newCountry: ", newCountry)
                setCountryList([...countryList, newCountry])
            }

        }

    }

    return <BoardContext.Provider value={{ selectedCountry, setSelectedCountry: setCountryHandler, editSelectedCountry: editCountryHandler, countryList }}>
        {children}

    </BoardContext.Provider>
}