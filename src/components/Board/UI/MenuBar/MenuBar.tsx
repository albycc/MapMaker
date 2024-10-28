
import styles from "./menubar-styles.module.css"

export default function MenuBar() {
    return <div className={styles.menubar} style={{ left: "50%", top: 20 }}>
        <button >Legend</button>
        <button >Map</button>
        <button >Import Data</button>
        <button >Export Map</button>
    </div>
}