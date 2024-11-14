import WindowCard from "../../globals/WindowCard";


export default function ExportImportWindowOptions() {
    return (
        <WindowCard position={{ right: 20, top: 10 }}>
            <div className="flex">
                <ul>
                    <li>
                        <button>Import</button>
                    </li>
                </ul>
                <ul>
                    <li>
                        <button>Export</button>
                    </li>
                </ul>

            </div>
        </WindowCard>
    )
}