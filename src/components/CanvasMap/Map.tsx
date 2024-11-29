import * as d3 from "d3"
import { geoPath } from "d3-geo";
import { Feature, FeatureCollection, Geometry } from "geojson";
import React, { forwardRef, useContext, useEffect, useState } from "react";

import { BoardContext } from "../../contexts/boardContexts";
import { ToolbarOption } from "../Board/UI/Toolbar/Toolbar-types";
import { ICountry } from "../../types/CountriesTypes";
import { FeatureCollectionExt } from "../../data/data";
import { Position } from "../types/Position";
import { ToolbarContext } from "../../contexts/toolbarContexts";
import { COLOURS } from "../../constants/colours";
import { Img } from "../types/Image";
import { selectionIsCountry } from "../../utils/typeChecks";
import { MenubarContext } from "../../contexts/menubarContexts";

// import data from "../data/custom.geo.json"

type IMapProps = {
    width: number;
    height: number;
    data: FeatureCollectionExt;

}

const Map = forwardRef<SVGSVGElement, IMapProps>(({ width, height, data, }: IMapProps, ref) => {

    const { currentColour, selected, setSelectedCountry, images, toolbarOption } = useContext(ToolbarContext)
    const { countryList, editCountry, removeCountryColour } = useContext(BoardContext)
    const { projectionType, mapStyles } = useContext(MenubarContext)

    // add a projection so d3 will convert what type of map we shall see
    // scale will zoom the map
    // translate will move the map x or y

    useEffect(() => {

        const zoom: any = d3.zoom().on("zoom", function (event) {

            d3.select("#map-group").attr("transform", event.transform)


        })

        d3.select("#map-svg").call(zoom)

    }, [])

    useEffect(() => {

        d3.select("[stroke=red]").attr("stroke", COLOURS.countryBorderColour).attr("strokeWidth", 0.4)
        if (selectionIsCountry(selected)) {
            d3.select(`#p-${selected.id}`).attr("stroke", "red").attr("strokeWidth", 2)
        }

    }, [selected])

    useEffect(() => {

        let projectionTypeChosen: d3.GeoProjection;

        switch (projectionType) {
            case "equirectangular": projectionTypeChosen = d3.geoEquirectangular(); break;
            case "mercator": projectionTypeChosen = d3.geoMercator(); break;
            case "equalEarth": projectionTypeChosen = d3.geoEqualEarth(); break;
            case "naturalEarth1": projectionTypeChosen = d3.geoNaturalEarth1(); break;
            default: projectionTypeChosen = d3.geoEquirectangular()
        }

        const projection = projectionTypeChosen.center([0, 0]).translate([width / 2, height / 2]).scale(305)

        const graticule = d3.geoGraticule10();

        let path = geoPath().projection(projection)

        const svg = d3.select("#map-group")

        svg.selectAll("*").remove()

        //draw grids
        svg.append("g").append("path").attr("d", geoPath(projection)(graticule)).attr("stroke", mapStyles.gridColour).attr("fill", "none")

        svg.append("g")
            .selectAll("path")
            .data(data.features)
            .join("path")
            .attr("data-countryid", (c) => c.id!.toString())
            .attr("id", (c) => `p-${c.id!.toString()}`)
            .attr("data-name", (c) => `p-${c.properties!.name.toString()}`)
            .attr("d", (c) => path(c))
            .attr("stroke", d => selected?.id === d.id ? "red" : mapStyles.countryBorderColour)
            .attr("fill", mapStyles.defaultCountryColour)
            .attr("stroke-width", (c) => 0.4)
            .attr("cursor", "pointer")
            // .on("click", countryOnClickHandler)
            // .on("contextmenu", removeCountryColourHandler)
            .on("mouseover", (e, d: Feature) => {
                if (d.id)
                    d3.select(`#p-${d.id}`)
                        .attr("stroke", selected?.id === d.id ? "red" : mapStyles.countryBorderColour)
                        .attr("stroke-width", 2)
            })
            .on("mouseleave", (e, d: Feature) => {
                if (d.id)
                    d3.select(`#p-${d.id}`)
                        .attr("stroke", selected?.id === d.id ? "red" : mapStyles.countryBorderColour)
                        .attr("stroke-width", 0.4)
            })

        countryList.forEach(c => {
            let fillColour = ""
            if (c.fillColour) {
                if (typeof c.fillColour === "string")
                    fillColour = c.fillColour
                else
                    fillColour = `url(#fillImg-${c.fillColour.label})`
                d3.select(`#p-${c.id}`).attr("fill", fillColour)
            }
        })

        svg.append("g")
            .attr("id", "text-grp")
            .selectAll("text")
            .data(countryList.filter(c => c.label))
            .join("text")
            .attr("x", c => {
                const country = data.features.find(d => d.id === c.id)
                return path.centroid(country!)[0]
            })
            .attr("y", c => {
                const country = data.features.find(d => d.id === c.id)
                return path.centroid(country!)[1]
            })
            .text(d => `${d.label}`)

        svg.append("g")
            .attr("id", "image-grp")
            .selectAll("defs")
            .data(images)
            .join("defs")
            .append("pattern")
            .attr("id", d => `${"fillImg-" + d.label}`)
            .attr("patternUnits", "userSpaceOnUse")
            .attr("width", 400)
            .attr("height", 400)
            .append("image")
            .attr("href", d => d.src)
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 400)
            .attr("height", 400)

    }, [countryList, toolbarOption, selected, projectionType, mapStyles, currentColour])

    function countryOnClickHandler(event: PointerEvent, data: Feature) {

        if (data.id && data.properties && data.properties.name) {

            const id = `${data.id}`
            const name = data.properties.name
            if (toolbarOption === ToolbarOption.Select) {
                setSelectedCountry(`${data.id}`)
            }
            if (toolbarOption === ToolbarOption.Paint) {

                // right clicking removes country colour

                const countryForm: ICountry = {
                    id,
                    name: name,
                    fillColour: currentColour
                }
                editCountry(countryForm)
            }

        }

        if (event.currentTarget !== null) {

        }
    }

    return (
        <svg ref={ref} id="map-svg">
            <rect x="0" y="0" width={width} height={height} fill={mapStyles.backgroundColour} />
            <g id="map-group">

            </g>
            {/* <g  >
                <path d={geoPath(projection)(graticule)?.toString()} stroke="#ccc" fill="none"></path>
            </g > */}
            {/* <g>
                {countries.features.map((c, i) => {
                    let path = geoPath().projection(projection)
                    const countryLabel = countryList.find(cl => cl.id === c.id)?.label
                    const centerPoint = path.centroid(c)
                    return <g key={c.id} id={"g-" + c.id}>
                        <path
                            data-countryid={c.id}
                            id={"p-" + c.id}
                            data-name={c.properties!.name}
                            d={path(c)?.toString()}
                            stroke={COLOURS.countryBorderColour}
                            fill={COLOURS.defaultCountryColour}
                            strokeWidth={mouseOverCountry === c.id ? 1 : 0.4}
                            cursor={"Pointer"}
                            onClick={countryOnClickHandler}
                            onContextMenu={removeCountryColourHandler}
                            onMouseOver={() => {
                                if (c.id)
                                    setMouseOverCountry(c.id)

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
            </g> */}
            {/* <g>
                {images.map(i => {
                    return (
                        <defs>
                            <pattern id={"fillImg-" + i.label} patternUnits="userSpaceOnUse" width="400px" height="400px">
                                <image href={i.src} x="0" y="0" width="400px" height="400px" />
                            </pattern>
                        </defs>
                    )
                })}
            </g> */}
        </svg >
    )
})

export default Map