import { useContext, useEffect, useState } from "react"
import styles from "./toolbar-styles.module.css"
import { ToolbarOption } from "./Toolbar-types"
import { BoardContext } from "../../../../contexts/boardContexts"
import WindowCard from "../globals/WindowCard"
import Icon from "../globals/Icon"
import selectIcon from "../../../../icons/toolbar/select.png"
import brushIcon from "../../../../icons/toolbar/brush.png"
import spritesIcon from "../../../../icons/toolbar/sprites.png"
import textIcon from "../../../../icons/toolbar/text.png"
import imageIcon from "../../../../icons/toolbar/image.png"
import legendIcon from "../../../../icons/toolbar/legend.png"
import ToolbarOptionsWindow from "./ToolbarOptionsWindows/ToolbarOptionsWindow"
import ToolbarOptionsBrush from "./ToolbarOptionsWindows/ToolbarOptionsBrush"
import { ToolbarContext } from "../../../../contexts/toolbarContexts"

const buttons = [
    {
        label: "Select",
        file: selectIcon
    },
    {
        label: "Paint",
        file: brushIcon
    },
    {
        label: "Text",
        file: textIcon
    },
    {
        label: "Legend",
        file: legendIcon
    },

]

interface IProps {
    onToolbarSelected: (option: ToolbarOption) => void
}

export default function Toolbar({ onToolbarSelected }: IProps) {
    const [selectedToolbar, setSelectedToolbar] = useState<ToolbarOption>(ToolbarOption.Select)
    const { setSelectedCountry } = useContext(ToolbarContext)
    const [showLegend, setShowLegend] = useState<boolean>(false);

    useEffect(() => {

        onToolbarSelected(selectedToolbar)

        if (selectedToolbar !== ToolbarOption.Select) {
            setSelectedCountry(null)
        }

    }, [selectedToolbar])

    const menuItemClickedHandler = (event: React.MouseEvent<HTMLButtonElement>) => {

        const target = event.currentTarget as any

        const label: ToolbarOption = target.value


        setSelectedToolbar(Object.keys(ToolbarOption)[Object.values(ToolbarOption).indexOf(label)] as ToolbarOption)

    }

    return (
        <div className="absolute" style={{ left: "50%", top: 20 }}>
            <WindowCard position={{ left: 0, top: 0 }}>
                <div className="flex">
                    {buttons.map(b => (
                        <button
                            key={b.label}
                            value={b.label}
                            className={selectedToolbar === b.label ? styles.active : ""}
                            onClick={menuItemClickedHandler}>
                            {b.file ? <Icon file={b.file} size={25} /> : null}
                        </button>
                    ))}

                </div>
            </WindowCard>
            {selectedToolbar === ToolbarOption.Paint ? <ToolbarOptionsBrush /> : null}

        </div>
    )
}