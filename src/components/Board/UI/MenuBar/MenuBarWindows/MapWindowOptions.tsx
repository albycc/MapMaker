import { useContext } from "react";
import WindowCard from "../../globals/WindowCard";
import { MenubarContext } from "../../../../../contexts/menubarContexts";

const projections = [
    {
        label: "Equirectangular",
        value: "equirectangular"
    },
    {
        label: "Mercator",
        value: "mercator"
    },
    {
        label: "EqualEarth",
        value: "equalEarth"
    },
    {
        label: "NaturalEarth1",
        value: "naturalEarth1"
    },
]

export default function MapWindowOptions() {

    const { setProjectionType, mapStyles, setMapStyles } = useContext(MenubarContext)
    return (
        <WindowCard position={{ right: 0, top: 10 }} >
            <div className="flex h-full">
                <ul>
                    <li className="flex flex-col mb-4">
                        <label htmlFor="map">Maps</label>
                        <select name="map" id="map">
                            <option value="world">World</option>
                        </select>
                    </li>
                    <li className="flex flex-col mb-4">
                        <label htmlFor="projection">Projections</label>
                        <select name="projection" id="projection" onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setProjectionType(event.target.value)}>
                            {projections.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                        </select>

                    </li>
                </ul>
                <ul>
                    <li className="flex">
                        <input
                            className="w-12"
                            type="color"
                            name="countryBorderColour"
                            id="countryBorderColour"
                            defaultValue={mapStyles.countryBorderColour}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setMapStyles("countryBorderColour", event.target.value)}
                        />
                        <label htmlFor="borderColour">Border colour</label>
                    </li>
                    <li className="flex">
                        <input
                            className="w-12"
                            type="color"
                            name="defaultCountryColour"
                            id="defaultCountryColour"
                            defaultValue={mapStyles.defaultCountryColour}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setMapStyles("defaultCountryColour", event.target.value)}
                        />
                        <label htmlFor="defaultCountryColour">Default country colour</label>
                    </li>
                    <li className="flex">
                        <input
                            className="w-12"
                            type="color"
                            name="backgroundColour"
                            id="backgroundColour"
                            defaultValue={mapStyles.backgroundColour}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setMapStyles("backgroundColour", event.target.value)}
                        />
                        <label htmlFor="backgroundColour">Background colour</label>
                    </li>
                    <li className="flex">
                        <input
                            className="w-12"
                            type="color"
                            name="gridColour"
                            id="gridColour"
                            defaultValue={mapStyles.gridColour}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setMapStyles("gridColour", event.target.value)}
                        />
                        <label htmlFor="gridColour">Grid colour</label>
                    </li>
                </ul>

            </div>
        </WindowCard>
    )
}