import { useContext, useEffect } from "react"
import styles from "./toolbar-styles.module.css"
import { ToolbarOption } from "./Toolbar-types"
import WindowCard from "../globals/WindowCard"
import Icon from "../globals/Icon"
import selectIcon from "../../../../icons/toolbar/select.png"
import brushIcon from "../../../../icons/toolbar/brush.png"
import textIcon from "../../../../icons/toolbar/text.png"
import legendIcon from "../../../../icons/toolbar/legend.png"
import ToolbarOptionsBrush from "./ToolbarOptionsWindows/ToolbarOptionsBrush"
import { ToolbarContext } from "../../../../contexts/toolbarContexts"
import ToolbarOptionsText from "./ToolbarOptionsWindows/ToolbarOptionsText"
import ToolbarOptionsLegend from "./ToolbarOptionsWindows/ToolbarOptionsLegend"

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

export default function Toolbar() {
    const { setSelectedCountry, toolbarOption, setToolbarOption } = useContext(ToolbarContext)

    useEffect(() => {

        if (toolbarOption !== ToolbarOption.Select) {
            setSelectedCountry(null)
        }

    }, [toolbarOption])

    const menuItemClickedHandler = (event: React.MouseEvent<HTMLButtonElement>) => {

        const target = event.currentTarget as any

        const label: ToolbarOption = target.value


        setToolbarOption(Object.keys(ToolbarOption)[Object.values(ToolbarOption).indexOf(label)] as ToolbarOption)

    }

    return (
        <div className="absolute" style={{ left: "50%", top: 20 }}>
            <WindowCard position={{ left: 0, top: 0 }}>
                <div className="flex">
                    {buttons.map(b => (
                        <button
                            key={b.label}
                            value={b.label}
                            className={toolbarOption === b.label ? styles.active : ""}
                            onClick={menuItemClickedHandler}>
                            {b.file ? <Icon file={b.file} size={25} /> : null}
                        </button>
                    ))}

                </div>
            </WindowCard>
            {toolbarOption === ToolbarOption.Paint ? <ToolbarOptionsBrush /> : null}
            {toolbarOption === ToolbarOption.Text ? <ToolbarOptionsText /> : null}
            {toolbarOption === ToolbarOption.Legend ? <ToolbarOptionsLegend /> : null}

        </div>
    )
}