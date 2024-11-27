import { createContext, useContext, useState } from "react";
import { Img } from "../components/types/Image";
import { ICountry } from "../types/CountriesTypes";
import { data } from "../data/data"
import { BoardContext } from "./boardContexts";
import { COLOURS } from "../constants/colours";
import { fonts } from "../constants/fonts";
import { IText } from "../components/CanvasMap/Elements/element-types";
import { ToolbarOption } from "../components/Board/UI/Toolbar/Toolbar-types";
import { IToolbarOptionsText } from "../components/Board/UI/Toolbar/ToolbarOptionsWindows/ToolbarOptionsText";
import { selectionIsText } from "../utils/typeChecks";
import { ILegendStyles } from "../types/LegendTypes";

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
    toolbarTextOptions: IToolbarOptionsText;
    setToolbarTextOptions: (toolbarOptionText: IToolbarOptionsText) => void;
    toolbarLegendStyles: ILegendStyles | null;
    setToolbarLegendStyles: (styles: ILegendStyles) => void
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
    toolbarTextOptions: {
        font: fonts[0],
        style: "normal",
        size: 10,
        colour: "#000000"
    },
    setToolbarTextOptions: (toolbarOptionText: IToolbarOptionsText) => { },
    toolbarLegendStyles: null,
    setToolbarLegendStyles: (styles: ILegendStyles) => { }
})

type IProps = {
    children: JSX.Element
}

// {
//     borderColor: "#828282",
//     borderWidth: 2,
//     borderRound: 10,
//     backgroundColor: "#ffffff",
//     fontColor: "#4f4f4f",
//     titleSize: 20,
//     spaceBetweenRows: 40
// },

export default function ToolbarContextProvider({ children }: IProps) {
    const [toolbarOption, setToolbarOption] = useState<ToolbarOption>(ToolbarOption.Select)
    const [currentColour, setCurrentColour] = useState<string | Img>(COLOURS.startingColour)

    const [images, setImages] = useState<Img[]>([])
    const [selected, setSelected] = useState<ICountry | IText | null>(null)
    const [toolbarTextOptions, setToolbarTextOptions] = useState<IToolbarOptionsText>({
        font: fonts[0],
        style: "normal",
        size: 10,
        colour: "#000000"
    })
    const [toolbarLegendStyles, setToolbarLegendStyles] = useState<ILegendStyles | null>(null)

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

        if (text) {
            setSelected(text)

        } else {
            setSelected(null)
        }
    }

    const setToolbarTextOptionsHandler = (options: IToolbarOptionsText) => {
        if (selected && selectionIsText(selected)) {
            setSelected({ ...selected, ...options })
        }
        setToolbarTextOptions(options)
    }

    const setToolbarLegendStylesHandler = (styles: ILegendStyles) => {
        setToolbarLegendStyles(styles)

    }

    return (
        <ToolbarContext.Provider value={{
            toolbarOption,
            setToolbarOption,
            currentColour,
            setCurrentColour,
            images,
            addImage,
            selected,
            setSelectedCountry: setSelectedCountryHandler,
            setSelectedText: setSelectedTextHandler,
            toolbarTextOptions,
            setToolbarTextOptions: setToolbarTextOptionsHandler,
            toolbarLegendStyles,
            setToolbarLegendStyles: setToolbarLegendStylesHandler
        }}>
            {children}
        </ToolbarContext.Provider>
    )

}