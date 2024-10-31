import { useContext } from "react"
import styles from "./paintwindow-styles.module.css"
import { BoardContext } from "../../../../contexts/boardContexts";


interface IProps {
    width: number;
}

export default function Paintwindow({ width }: IProps) {

    const { currentColour, setCurrentColour } = useContext(BoardContext)


    return <div className={styles["paint-window"]} style={{ left: width / 2, bottom: 0, maxWidth: "400px" }}>
        <input type="color" name="" id="" defaultValue={currentColour} onBlur={(event: React.ChangeEvent<HTMLInputElement>) => setCurrentColour(event.target.value)} />
    </div>

}