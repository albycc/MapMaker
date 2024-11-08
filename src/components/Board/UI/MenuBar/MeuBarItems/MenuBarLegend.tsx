import { useContext } from "react"
import { LegendContext } from "../../../../../contexts/legendContexts"


export default function MenuBarLegend() {

    const { createLegend } = useContext(LegendContext)


    return (
        <div className="absolute" style={{ top: 50 }}>
            <button onClick={() => createLegend()}>New Legend</button>
        </div>
    )
}