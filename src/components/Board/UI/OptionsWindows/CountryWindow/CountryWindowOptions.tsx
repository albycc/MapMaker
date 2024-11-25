import { useContext, useEffect, useState } from "react";
import { ICountry } from "../../../../../types/CountriesTypes";
import styles from "./country-window.styles.module.css"
import { BoardContext } from "../../../../../contexts/boardContexts";
import { ToolbarContext } from "../../../../../contexts/toolbarContexts";
import WindowCard from "../../globals/WindowCard";

interface IProps {
    width: number;
    country: ICountry;
}

const defaultColour = "#e7e7e7"

export default function CountryWindow({ width, country }: IProps) {

    const { editCountry } = useContext(BoardContext)
    const { setSelectedCountry, selectedCountry } = useContext(ToolbarContext)

    const [inputColour, setInputColour] = useState<string>(defaultColour)

    console.log("selectedCountry ", selectedCountry)

    useEffect(() => {

    }, [inputColour])

    useEffect(() => {

        if (selectedCountry !== null && selectedCountry.fillColour && typeof selectedCountry.fillColour === "string") {
            setInputColour(selectedCountry.fillColour)
        } else {
            setInputColour(defaultColour)
        }
    }, [selectedCountry])

    const onLabelChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (selectedCountry) {
            const editedCountry: ICountry = {
                id: selectedCountry.id,
                name: selectedCountry.name,
                fillColour: selectedCountry.fillColour,
                label: event.currentTarget.value

            }

            editCountry(editedCountry)

        }
    }

    return (
        <WindowCard position={{ left: width / 2, bottom: 0 }} >
            {selectedCountry ? (<div className="flex flex-col mx-3">
                <div className="flex">
                    <h2 className="w-full text-center text-xl ">{selectedCountry?.name}</h2>
                    <button onClick={() => setSelectedCountry(null)}>X</button>
                </div>
                <div className="flex">
                    <div className="flex flex-col">
                        {typeof selectedCountry.fillColour !== "string" && selectedCountry.fillColour ? (
                            <>
                                <p>Image</p>
                                <img src={selectedCountry.fillColour.src} alt="" className="w-24" />
                            </>
                        ) : (
                            <>
                                <p>Colour</p>
                                <input
                                    type="color"
                                    name=""
                                    id=""
                                    value={inputColour}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInputColour(event.target.value)}
                                    onBlur={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        console.log(event.target.value)
                                        const countryForm: ICountry = {
                                            id: country.id,
                                            name: country.name,
                                            fillColour: event.target.value
                                        }
                                        editCountry(countryForm)
                                    }}
                                />
                            </>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <p className="text-center">Label</p>
                        <input type="text" name="" id="" value={selectedCountry.label} onChange={onLabelChangeHandler} />

                    </div>
                </div>
            </div>) : <></>}
        </WindowCard>
    )
}