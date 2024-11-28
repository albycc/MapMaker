
import { useContext } from "react"
import Icon from "../globals/Icon";
import mapIcon from "../../../../icons/menubar/map.png"
import exportimportIcon from "../../../../icons/menubar/exportimport.png"
import MapWindowOptions from "./MenuBarWindows/MapWindowOptions";
import ExportImportWindowOptions from "./MenuBarWindows/ExportImportWindowOptions";
import { MenubarOption } from "./MenuBar-Types";
import { MenubarContext } from "../../../../contexts/menubarContexts";

const menus = [{
    label: "Map",
    file: mapIcon
},
{
    label: "Export",
    file: exportimportIcon
}]

export default function MenuBar() {

    const { menubarOption, setMenubarOption } = useContext(MenubarContext)

    const menuItemClickedHandler = (event: React.MouseEvent<HTMLButtonElement>) => {

        const target = event.currentTarget as any

        const label: MenubarOption = target.value

        if (label === menubarOption) {
            setMenubarOption(null)
            return
        }


        setMenubarOption(Object.keys(MenubarOption)[Object.values(MenubarOption).indexOf(label)] as MenubarOption)

    }

    return (
        <div className="absolute" style={{ right: 30, top: 20 }} >
            <div className="flex">
                {menus.map((menu) => (
                    <button
                        key={menu.label}
                        value={menu.label}
                        className={menubarOption === menu.label ? "bg-cyan-100" : ""}
                        onClick={menuItemClickedHandler}>
                        <Icon file={menu.file} size={50} />
                    </button>
                ))}

            </div>
            <div className="relative">
                {menubarOption === MenubarOption.Map && <MapWindowOptions />}
                {menubarOption === MenubarOption.Export && <ExportImportWindowOptions />}
            </div>
        </div>
    )

}