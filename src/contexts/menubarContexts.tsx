import { createContext, useState } from "react";
import { IMapStyles } from "../types/MapTypes";
import { MenubarOption } from "../components/Board/UI/MenuBar/MenuBar-Types";

type IMenubarContextsType = {
    menubarOption: MenubarOption | null;
    setMenubarOption: (option: MenubarOption | null) => void
    map: string;
    setMap: (map: string) => void;
    projectionType: string;
    setProjectionType: (projection: string) => void;
    mapStyles: IMapStyles
    setMapStyles: (id: string, value: string) => void
}

const defaultStyles: IMapStyles = {
    countryBorderColour: "#6e6e6e",
    defaultCountryColour: "#dbdbdb",
    backgroundColour: "#ffffff",
    gridColour: "#d6d6d6"
}


export const MenubarContext = createContext<IMenubarContextsType>({
    menubarOption: null,
    setMenubarOption: (option: MenubarOption | null) => { },
    map: "world",
    setMap: (map: string) => { },
    projectionType: "equirectangular",
    setProjectionType: (projection: string) => { },
    mapStyles: defaultStyles,
    setMapStyles: (id: string, value: string) => { }
})

type IProps = {
    children: JSX.Element
}

export default function MenubarContextProvider({ children }: IProps) {

    const [menubarOption, setMenubarOption] = useState<MenubarOption | null>(null)
    const [map, setMap] = useState<string>("world")
    const [projectionType, setProjectionType] = useState<string>("equirectangular")
    const [mapStyles, setMapStyles] = useState<IMapStyles>(defaultStyles)

    const editMapStyles = (id: string, value: string) => {
        setMapStyles({ ...mapStyles, [id]: value })

    }

    return (
        <MenubarContext.Provider value={{
            map,
            setMap,
            projectionType,
            setProjectionType,
            mapStyles, setMapStyles:
                editMapStyles,
            menubarOption,
            setMenubarOption
        }}>
            {children}
        </MenubarContext.Provider>
    )
}