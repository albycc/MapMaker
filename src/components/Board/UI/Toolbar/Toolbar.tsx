import { useContext, useEffect, useState } from "react"
import styles from "./toolbar-styles.module.css"
import { ToolbarOption } from "./Toolbar-types"
import { BoardContext } from "../../../../contexts/boardContexts"

const buttons = [
    "Select", "Paint", "Sprite"
]

interface IProps {
    onToolbarSelected: (option: ToolbarOption) => void
}

export default function Toolbar({ onToolbarSelected }: IProps) {
    const [selected, setSelected] = useState<ToolbarOption>(ToolbarOption.Select)
    const { setSelectedCountry } = useContext(BoardContext)

    useEffect(() => {

        onToolbarSelected(selected)

        if (selected !== ToolbarOption.Select) {
            setSelectedCountry(null)
        }



    }, [selected])



    return <div className={styles["toolbar"]} style={{ left: 50, top: 400 }}>
        {buttons.map(b => <button key={b} value={b} className={selected === b ? styles.active : ""} onClick={(event: React.MouseEvent<HTMLButtonElement>) => {

            const target = event.target as any

            const label: ToolbarOption = target.textContent

            setSelected(Object.keys(ToolbarOption)[Object.values(ToolbarOption).indexOf(label)] as ToolbarOption)

        }}>{b}</button>)}
    </div>
}