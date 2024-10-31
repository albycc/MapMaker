import * as d3 from "d3"
import { geoPath } from "d3-geo";
import { Feature, FeatureCollection } from "geojson";
import { MouseEventHandler, useContext, useEffect, useState } from "react";

import { BoardContext } from "../../contexts/boardContexts";

// import data from "../data/custom.geo.json"

type IMapProps = {
    width: number;
    height: number;
    data: FeatureCollection
}

export default function Map({ width, height, data }: IMapProps) {

    const [mouseOverCountry, setMouseOverCountry] = useState<string | number>("");

    const { selectedCountry, setSelectedCountry, countryList } = useContext(BoardContext)

    // add a projection so d3 will convert what type of map we shall see
    // scale will zoom the map
    // translate will move the map x or y
    const projection = d3.geoEquirectangular().center([-100, 100]).scale(300).translate([400, 0])

    console.log("countryList: ", countryList)

    const fillCountryColour = (c: Feature) => {
        let fillColour = "#e7e7e7";

        const countryFound = countryList.find(cntr => cntr.countryId === c.id);

        if (countryFound && countryFound.fillHexColour) {
            fillColour = countryFound.fillHexColour
        }

        return fillColour
    }


    return (
        <>
            <g>
                {data.features.map((c, i) =>
                    <path
                        key={c.id}
                        data-id={c.id}
                        d={geoPath().projection(projection)(c)?.toString()}
                        stroke={c.id === selectedCountry?.countryId || c.id === mouseOverCountry ? "#f32121" : "#7f7f7f"}
                        fill={fillCountryColour(c)}
                        strokeWidth={c.id === selectedCountry?.countryId ? 2 : 0.4}
                        onClick={() => {
                            if (c.id) {
                                const id = typeof c.id === "number" ? c.id.toString() : c.id;
                                setSelectedCountry(id)

                            }
                        }}
                        cursor="pointer"
                        onMouseOver={() => {
                            if (c.id) {
                                setMouseOverCountry(c.id)
                            }
                        }}
                        onMouseLeave={() => setMouseOverCountry("")}

                    />
                )}
            </g>

        </>
    )
}