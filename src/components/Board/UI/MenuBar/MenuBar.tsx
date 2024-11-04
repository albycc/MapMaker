
import { useState } from "react"
import styles from "./menubar-styles.module.css"
import MenuBarLegend from "./MeuBarItems/MenuBarLegend";
import WindowCard from "../globals/WindowCard";

const menus = ["Map", "Import", "Export"]

export default function MenuBar() {

    const [activeMenu, setActiveMenu] = useState<string>("");

    return (
        <div className="absolute" style={{ left: "50%", top: 10 }}>
            <WindowCard position={{ left: "50%", top: 10 }}>
                <div className="flex">
                    {menus.map((menu) => <button key={menu} className={menu === activeMenu ? "bg-cyan-100" : ""} onClick={() => setActiveMenu(activeMenu === menu ? "" : menu)}>{menu}</button>)}
                </div>
            </WindowCard>
            <div className="relative">
            </div>
        </div>
    )

}