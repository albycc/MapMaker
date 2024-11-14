import WindowCard from "../../globals/WindowCard";


export default function MapWindowOptions() {
    return (
        <WindowCard position={{ right: 20, top: 10 }} >
            <div className="flex h-full">
                <ul>
                    <li className="flex">
                        <select name="" id=""></select>
                        <label htmlFor="">Maps</label>
                    </li>
                </ul>
                <ul>
                    <li className="flex">
                        <input type="color" name="" id="" />
                        <label>Border colour</label>
                    </li>
                    <li className="flex">
                        <input type="color" name="" id="" />
                        <label>Default country colour</label>
                    </li>
                </ul>
                <ul>
                    <li className="flex">
                        <select name="" id=""></select>
                        <label htmlFor="">Projections</label>

                    </li>
                </ul>
            </div>
        </WindowCard>
    )
}