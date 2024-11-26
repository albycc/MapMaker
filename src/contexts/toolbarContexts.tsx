import { createContext, useContext, useState } from "react";
import { Img } from "../components/types/Image";
import { ICountry } from "../types/CountriesTypes";
import { data } from "../data/data"
import { BoardContext } from "./boardContexts";
import { COLOURS } from "../constants/colours";
import { IText } from "../components/CanvasMap/Elements/element-types";
import { ToolbarOption } from "../components/Board/UI/Toolbar/Toolbar-types";

type IToolbarContextType = {
    toolbarOption: ToolbarOption,
    setToolbarOption: (toolbar: ToolbarOption) => void,
    currentColour: string | Img;
    setCurrentColour: (colour: string | Img) => void,
    images: Img[];
    addImage: (img: Img) => void;
    selected: ICountry | IText | null;
    setSelectedCountry: (countryId: string | null) => void;
    setSelectedText: (text: IText | null) => void;
}


export const ToolbarContext = createContext<IToolbarContextType>({
    toolbarOption: ToolbarOption.Select,
    setToolbarOption: (toolbar: ToolbarOption) => { },
    currentColour: "",
    setCurrentColour: (colour: string | Img) => { },
    images: [],
    addImage: (img: Img) => { },
    selected: null,
    setSelectedCountry: (countryId: string | null) => { },
    setSelectedText: (text: IText | null) => { },
})

type IProps = {
    children: JSX.Element
}

export default function ToolbarContextProvider({ children }: IProps) {
    const [toolbarOption, setToolbarOption] = useState<ToolbarOption>(ToolbarOption.Select)
    const [currentColour, setCurrentColour] = useState<string | Img>(COLOURS.startingColour)
    const [images, setImages] = useState<Img[]>([])
    const [selected, setSelected] = useState<ICountry | IText | null>(null)
    const { countryList } = useContext(BoardContext)

    const addImage = (img: Img) => setImages([...images, img])

    const setSelectedCountryHandler = (selectedId: string | null) => {

        const featureFound = data.features.find(feature => feature.id === selectedId)

        if (selectedId !== null && featureFound && featureFound.properties && featureFound.id) {

            const id = typeof featureFound.id === "number" ? featureFound.id.toString() : featureFound.id;
            const countryExists = countryList.find(c => c.id === selectedId)

            if (countryExists) {

                setSelected(countryExists)

            } else {
                const country: ICountry = {
                    id: id,
                    name: featureFound.properties.name,
                    fillColour: null
                }
                setSelected(country)
            }
        } else {
            setSelected(null)
        }
    }

    const setSelectedTextHandler = (text: IText | null) => {

        setSelected(text)
    }

    return (
        <ToolbarContext.Provider value={{ toolbarOption, setToolbarOption, currentColour, setCurrentColour, images, addImage, selected, setSelectedCountry: setSelectedCountryHandler, setSelectedText: setSelectedTextHandler }}>
            {children}
        </ToolbarContext.Provider>
    )

}