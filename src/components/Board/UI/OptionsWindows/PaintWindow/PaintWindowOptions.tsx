import { useContext, useEffect, useState } from "react"
import styles from "./paintwindow-styles.module.css"
import { BoardContext } from "../../../../../contexts/boardContexts";
import { ToolbarContext } from "../../../../../contexts/toolbarContexts";


interface IProps {
    width: number;
}

export default function Paintwindow({ width }: IProps) {

    const { currentColour, setCurrentColour } = useContext(ToolbarContext)
    const [inputHexColour, setInputHexColour] = useState<string>()

    useEffect(() => {

        if (typeof currentColour === "string")

            setInputHexColour(currentColour)

    }, [currentColour])


    return <div className={styles["paint-window"]} style={{ left: width / 2, bottom: 0, maxWidth: "400px" }}>
        <input
            type="color"
            name=""
            id=""
            value={inputHexColour}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setInputHexColour(event.target.value) }}
            onBlur={(event: React.ChangeEvent<HTMLInputElement>) => setCurrentColour(event.target.value)}
        />
    </div>

}