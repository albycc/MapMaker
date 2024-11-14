import WindowCard from "../../globals/WindowCard";


export default function ListWindowOptions() {
    return (
        <WindowCard position={{ right: 20, top: 10 }} >
            <div className="flex-col h-full">
                <ul>
                    <li>
                        <div>
                            <input type="checkbox" name="" id="" />
                            <span>Argentine</span>
                        </div>
                        <div>
                            <input type="checkbox" name="" id="" />
                            <span>USA</span>
                        </div>
                    </li>
                </ul>

            </div>

        </WindowCard>
    )
}