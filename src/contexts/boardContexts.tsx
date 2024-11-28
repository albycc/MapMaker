import { createContext, useState } from "react";
import { ICountry } from "../types/CountriesTypes";

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


    }

    return (
        <BoardContext.Provider value={{ editCountry: editCountryHandler, removeCountryColour, countryList, editCountryList }}>
            {children}

        </BoardContext.Provider>
    )
}