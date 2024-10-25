import Map from "./Map"
import { data } from "../../data/data"

export default function Canvas() {

    return <div>
        <Map width={window.innerWidth} height={window.innerHeight} data={data} />
    </div>

}