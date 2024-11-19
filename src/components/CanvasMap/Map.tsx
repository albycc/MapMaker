import * as d3 from "d3"
import { geoPath } from "d3-geo";
import { Feature, FeatureCollection } from "geojson";
import React, { forwardRef, useContext, useState } from "react";

import { BoardContext } from "../../contexts/boardContexts";
import { ToolbarOption } from "../Board/UI/Toolbar/Toolbar-types";
import { ICountry } from "../../types/CountriesTypes";
import { FeatureCollectionExt } from "../../data/data";
import { Position } from "../types/Position";

// import data from "../data/custom.geo.json"

type IMapProps = {
    width: number;
    height: number;
    data: FeatureCollectionExt;
    toolBarOption: ToolbarOption;
    scrollPosition: Position;
    zoomPosition: number;

}

const Map = forwardRef<SVGSVGElement, IMapProps>(({ width, height, data, toolBarOption, scrollPosition, zoomPosition }: IMapProps, ref) => {

    const [mouseOverCountry, setMouseOverCountry] = useState<string | number>("");

    const [countries, setCountries] = useState<FeatureCollection>(data)

    const { selectedCountry, setSelectedCountry, countryList, editCountry, currentColour } = useContext(BoardContext)

    // add a projection so d3 will convert what type of map we shall see
    // scale will zoom the map
    // translate will move the map x or y
    const projection = d3.geoEquirectangular().center([0, 0]).scale(zoomPosition).translate([scrollPosition.x, scrollPosition.y])

    const graticule = d3.geoGraticule10();


    const fillCountryColour = (c: Feature) => {
        let fillColour = "#e7e7e7";

        const countryFound = countryList.find(cntr => cntr.id === c.id);

        if (countryFound && countryFound.fillHexColour) {
            fillColour = countryFound.fillHexColour
        }

        return fillColour
    }

    const countryOnClickHandler = (event: React.MouseEvent) => {

        const id = event.currentTarget.getAttribute("data-id")
        const name = event.currentTarget.getAttribute("data-name")
        if (id && name) {
            if (toolBarOption === ToolbarOption.Select) {
                setSelectedCountry(id)

            }
            if (toolBarOption === ToolbarOption.Paint) {
                const countryForm: ICountry = {
                    id,
                    name: name,
                    fillHexColour: currentColour
                }
                editCountry(countryForm)
            }
        }
    }


    return (
        <svg ref={ref}>
            <g>
                <path d={geoPath(projection)(graticule)?.toString()} stroke="#ccc" fill="none"></path>
            </g>
            <g>
                {countries.features.map((c, i) =>
                    <path
                        key={c.id}
                        data-id={c.id}
                        data-name={c.properties!.name}
                        d={geoPath().projection(projection)(c)?.toString()}
                        stroke={selectedCountry && selectedCountry.id === c.id ? "#ff0000" : "#7f7f7f"}
                        fill={fillCountryColour(c)}
                        strokeWidth={(selectedCountry && selectedCountry.id === c.id) || (c.id === mouseOverCountry) ? 2 : 0.4}
                        cursor={"Pointer"}
                        onClick={countryOnClickHandler}
                        onMouseOver={() => {
                            if (c.id) {
                                setMouseOverCountry(c.id)

                            }
                        }}
                        onMouseLeave={() => { setMouseOverCountry("") }}
                    />)}
            </g>


        </svg>
    )
})

export default Map