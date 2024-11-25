import { createContext, useState } from "react";
import { ICountry } from "../types/CountriesTypes";
import { data } from "../data/data"
import { ILegend } from "../components/Board/UI/Legend/LegendTypes";

type IBoardContextType = {
    editCountry: (country: ICountry) => void,
    removeCountryColour: (countryId: string) => void,
    countryList: ICountry[],
    editCountryList: (newCountries: ICountry[]) => void
}

export const BoardContext = createContext<IBoardContextType>({
    editCountry: (country: ICountry) => { },
    removeCountryColour: (countryId: string) => { },
    countryList: [],
    editCountryList: (newCountries: ICountry[]) => { }
})

type IProps = {
    children: JSX.Element
}

export default function BoardContextProvider({ children }: IProps) {
    const [countryList, setCountryList] = useState<ICountry[]>([])

    // const setCountryHandler = (countryId: string | null) => {

    //     const featureFound = data.features.find(feature => feature.id === countryId)

    //     if (countryId !== null && featureFound && featureFound.properties && featureFound.id) {

    //         const id = typeof featureFound.id === "number" ? featureFound.id.toString() : featureFound.id;
    //         const countryExists = countryList.find(c => c.id === countryId)

    //         if (countryExists) {

    //             setSelectedCountry(countryExists)

    //         } else {
    //             const country: ICountry = {
    //                 id: id,
    //                 name: featureFound.properties.name,
    //                 fillHexColour: null
    //             }
    //             setSelectedCountry(country)
    //         }
    //     } else {
    //         setSelectedCountry(null)
    //     }
    // }

    const editCountryList = (newCountries: ICountry[]) => {

        const newCountryList: ICountry[] = [...countryList]

        newCountries.forEach(c => {
            const index = newCountryList.findIndex(cl => cl.id === c.id)
            if (index !== -1) {
                newCountryList[index].fillColour = c.fillColour
                newCountryList[index].label = c.label
            }
        })

        setCountryList(newCountryList)
    }

    const editCountryHandler = (countryForm: ICountry) => {

        const countryExists = countryList.find(c => c.id === countryForm.id)

        if (countryExists) {

            countryExists.fillColour = countryForm.fillColour
            countryExists.label = countryForm.label
            const countryIndex = countryList.findIndex(c => c.id === countryForm.id)
            countryList[countryIndex] = countryExists;
            setCountryList([...countryList])

        } else {

            setCountryList([...countryList, countryForm])
        }
    }

    const removeCountryColour = (countryId: string) => {

        const countryExists = countryList.find(c => c.id === countryId)


        if (countryExists) {
            setCountryList([...countryList.filter(c => c.id !== countryExists.id)])
        }

        console.log(countryList)

    }



    return (
        <BoardContext.Provider value={{ editCountry: editCountryHandler, removeCountryColour, countryList, editCountryList }}>
            {children}

        </BoardContext.Provider>
    )
}