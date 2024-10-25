import * as d3 from "d3"
import { geoPath } from "d3-geo";
import { FeatureCollection } from "geojson";
import { useState } from "react";

// import data from "../data/custom.geo.json"

type IMapProps = {
    width: number;
    height: number;
    data: FeatureCollection
}


export default function Map({ width, height, data }: IMapProps) {

    const [selectedCountryId, setSelectedCountryId] = useState<string | number>("");
    const [selectedCountryName, setSelectedCountryName] = useState<string>("")
    const [mouseOverCountry, setMouseOverCountry] = useState<string | number>("");


    // add a projection so d3 will convert what type of map we shall see
    // scale will zoom the map
    // translate will move the map x or y
    const projection = d3.geoEquirectangular().center([-100, 100]).scale(300).translate([400, 100])


    return (
        <div>
            <svg width={width} height={height}>
                <text x={width / 2} y={100}>{selectedCountryName}</text>
                <g>
                    {data.features.map((country, i) =>
                        <path
                            key={country.id}
                            d={geoPath().projection(projection)(country)?.toString()}
                            stroke={country.id === selectedCountryId || country.id === mouseOverCountry ? "#f32121" : "#7f7f7f"}
                            fill={country.id === selectedCountryId ? "#e66a45" : "#e7e7e7"}
                            strokeWidth={country.id === selectedCountryId ? 2 : 0.4}
                            onClick={() => {
                                setSelectedCountryId(country.id ? country.id : "")
                                setSelectedCountryName(country.properties?.name)

                            }}
                            cursor="pointer"
                            onMouseOver={() => {
                                if (country.id) {
                                    setMouseOverCountry(country.id)

                                }

                            }}
                            onMouseLeave={() => setMouseOverCountry("")}


                        />
                    )}
                </g>
            </svg>

        </div>
    )

}