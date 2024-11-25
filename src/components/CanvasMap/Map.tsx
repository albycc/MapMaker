import * as d3 from "d3"
import { geoPath } from "d3-geo";
import { Feature, FeatureCollection } from "geojson";
import React, { forwardRef, useContext, useEffect, useState } from "react";

import { BoardContext } from "../../contexts/boardContexts";
import { ToolbarOption } from "../Board/UI/Toolbar/Toolbar-types";
import { ICountry } from "../../types/CountriesTypes";
import { FeatureCollectionExt } from "../../data/data";
import { Position } from "../types/Position";
import { ToolbarContext } from "../../contexts/toolbarContexts";
import { COLOURS } from "../../constants/colours";
import { Img } from "../types/Image";

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

    const { currentColour, selectedCountry, setSelectedCountry, images } = useContext(ToolbarContext)
    const { countryList, editCountry, removeCountryColour } = useContext(BoardContext)

    // add a projection so d3 will convert what type of map we shall see
    // scale will zoom the map
    // translate will move the map x or y
    const projection = d3.geoEquirectangular().center([0, 0]).scale(zoomPosition).translate([scrollPosition.x, scrollPosition.y])

    const graticule = d3.geoGraticule10();

    useEffect(() => {

        countryList.forEach(c => {
            let fillColour = ""
            if (c.fillColour) {
                if (typeof c.fillColour === "string")
                    fillColour = c.fillColour
                else
                    fillColour = `url(#fillImg-${c.fillColour.label})`
                d3.select(`#p-${c.id}`).attr("fill", fillColour)
            }
            // if (c.label) {
            //     const countryPath = d3.select(`#p-${c.id}`).node()

            //     const geoFeature = data.features.find(f => f.id === c.id)

            //     if (countryPath && geoFeature) {

            //         const path = geoPath()


            //         const centerPoint = path.centroid(geoFeature)
            //         console.log(centerPoint)
            //         d3.select(`#g-${c.id}`)
            //             .append("text")
            //             .text(c.label)
            //             .attr("x", centerPoint[0])
            //             .attr("y", centerPoint[1])
            //         // .attr("transform", `translate(${centerPoint[0]}px, ${centerPoint[1]}px)`)


            //     }
            // }
        })

    }, [countryList])


    const countryOnClickHandler = (event: React.MouseEvent) => {

        const id = event.currentTarget.getAttribute("data-id")
        const name = event.currentTarget.getAttribute("data-name")
        if (id && name) {
            if (toolBarOption === ToolbarOption.Select) {
                setSelectedCountry(id)

            }
            if (toolBarOption === ToolbarOption.Paint) {

                // right clicking removes country colour


                const countryForm: ICountry = {
                    id,
                    name: name,
                    fillColour: currentColour
                }
                editCountry(countryForm)
            }
        }
    }


    const removeCountryColourHandler = (event: React.MouseEvent<SVGPathElement>) => {


        console.log("remove ", event.currentTarget.getAttribute("data-id"))

        const id = event.currentTarget.getAttribute("data-id")

        if (id) {
            removeCountryColour(id)
            d3.select(`#p-${id}`).attr("fill", COLOURS.defaultCountryColour)

        }
    }

    return (
        <svg ref={ref}>
            <g>
                <path d={geoPath(projection)(graticule)?.toString()} stroke="#ccc" fill="none"></path>
            </g>
            <g>
                {countries.features.map((c, i) => {
                    let path = geoPath().projection(projection)
                    const countryLabel = countryList.find(cl => cl.id === c.id)?.label
                    const centerPoint = path.centroid(c)
                    return <g key={c.id} id={"g-" + c.id}>
                        <path
                            data-id={c.id}
                            id={"p-" + c.id}
                            data-name={c.properties!.name}
                            d={path(c)?.toString()}
                            stroke={selectedCountry && selectedCountry.id === c.id ? "#ff0000" : "#7f7f7f"}
                            fill={COLOURS.defaultCountryColour}
                            strokeWidth={(selectedCountry && selectedCountry.id === c.id) || (c.id === mouseOverCountry) ? 2 : 0.4}
                            cursor={"Pointer"}
                            onClick={countryOnClickHandler}
                            onContextMenu={removeCountryColourHandler}
                            onMouseOver={() => {
                                if (c.id) {
                                    setMouseOverCountry(c.id)

                                }
                            }}
                            onMouseLeave={() => { setMouseOverCountry("") }}
                        >
                        </path>
                        {countryLabel ? (

                            <text style={{ textAlign: "center", transform: `translate(${centerPoint[0]}px, ${centerPoint[1]}px)` }}>{countryLabel}</text>
                        ) : null}
                    </g>
                }
                )}
            </g>
            <g>
                {images.map(i => {
                    return (
                        <defs>
                            <pattern id={"fillImg-" + i.label} patternUnits="userSpaceOnUse" width="400px" height="400px">
                                <image href={i.src} x="0" y="0" width="400px" height="400px" />
                            </pattern>
                        </defs>

                    )
                })}
            </g>


        </svg>
    )
})

export default Map