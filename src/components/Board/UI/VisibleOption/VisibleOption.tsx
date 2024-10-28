import styles from "./styles.module.css"

export default function VisibleOption() {
    return <div className={styles["show-button"]} style={{ right: 10, top: 10 }}>
        <button >VISIBILITY</button>
    </div>
}