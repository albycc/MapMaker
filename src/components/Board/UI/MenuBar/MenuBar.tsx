
import { useState } from "react"
import styles from "./menubar-styles.module.css"
import MenuBarLegend from "./MeuBarItems/MenuBarLegend";
import WindowCard from "../globals/WindowCard";
import Icon from "../globals/Icon";

import mapIcon from "../../../../icons/menubar/map.png"
import listIcon from "../../../../icons/menubar/list.png"
import exportimportIcon from "../../../../icons/menubar/exportimport.png"
import MapWindowOptions from "./MenuBarWindows/MapWindowOptions";
import ListWindowOptions from "./MenuBarWindows/ListWindowOptions";
import ExportImportWindowOptions from "./MenuBarWindows/ExportImportWindowOptions";

const menus = [{
    label: "Map",
    file: mapIcon
},
{
    label: "List",
    file: listIcon
},
{
    label: "Import/Export",
    file: exportimportIcon
}]

export default function MenuBar() {

    const [activeMenu, setActiveMenu] = useState<string>("");

    return (
        <div className="absolute" style={{ right: 30, top: 20 }} >
            <div className="flex">
                {menus.map((menu) => (
                    <button
                        key={menu.label}
                        className={menu.label === activeMenu ? "bg-cyan-100" : ""}
                        onClick={() => setActiveMenu(activeMenu === menu.label ? "" : menu.label)}>
                        <Icon file={menu.file} size={50} />
                    </button>
                ))}

            </div>
            <div className="relative">
                {activeMenu === "Map" && <MapWindowOptions />}
                {activeMenu === "List" && <ListWindowOptions />}
                {activeMenu === "Import/Export" && <ExportImportWindowOptions />}
            </div>
        </div>
    )

}