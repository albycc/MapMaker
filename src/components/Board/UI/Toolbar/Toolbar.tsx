import styles from "./toolbar-styles.module.css"

export default function Toolbar() {
    return <div className={styles["toolbar"]} style={{ left: 50, top: 400 }}>
        <button>Select</button>
        <button>Paint</button>
        <button>Delete</button>
    </div>
}