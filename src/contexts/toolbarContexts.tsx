import { createContext, useContext, useState } from "react";
import { Img } from "../components/types/Image";
import { ICountry } from "../types/CountriesTypes";
import { data } from "../data/data"
import { BoardContext } from "./boardContexts";
import { COLOURS } from "../constants/colours";

type IToolbarContextType = {
    currentColour: string | Img;
    setCurrentColour: (colour: string | Img) => void,
    images: Img[];
    addImage: (img: Img) => void;
    selectedCountry: ICountry | null;
    setSelectedCountry: (countryId: string | null) => void;
}


export const ToolbarContext = createContext<IToolbarContextType>({
    currentColour: "",
    setCurrentColour: (colour: string | Img) => { },
    images: [],
    addImage: (img: Img) => { },
    selectedCountry: null,
    setSelectedCountry: (countryId: string | null) => { },
})

type IProps = {
    children: JSX.Element
}

export default function ToolbarContextProvider({ children }: IProps) {
    const [currentColour, setCurrentColour] = useState<string | Img>(COLOURS.startingColour)
    const [images, setImages] = useState<Img[]>([])
    const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null)
    const { countryList } = useContext(BoardContext)

    const addImage = (img: Img) => setImages([...images, img])

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
                    fillColour: null
                }
                setSelectedCountry(country)
            }
        } else {
            setSelectedCountry(null)
        }
    }



    return (
        <ToolbarContext.Provider value={{ currentColour, setCurrentColour, images, addImage, selectedCountry, setSelectedCountry: setCountryHandler }}>
            {children}
        </ToolbarContext.Provider>
    )

}