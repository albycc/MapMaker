import { useContext, useEffect, useState } from "react";
import { ICountry } from "../../../../../types/CountriesTypes";
import styles from "./country-window.styles.module.css"
import { BoardContext } from "../../../../../contexts/boardContexts";

interface IProps {
    width: number;
    country: ICountry;
}

const defaultColour = "#e7e7e7"

export default function CountryWindow({ width, country }: IProps) {

    const { editCountry, setSelectedCountry, selectedCountry } = useContext(BoardContext)

    const [inputColour, setInputColour] = useState<string>(defaultColour)


    // const onFormChange = (event: React.FormEvent) => {

    //     event.preventDefault()

    //     console.log(event)

    //     // const formData = new FormData(event.target)

    // }

    useEffect(() => {

    }, [inputColour])

    useEffect(() => {

        if (selectedCountry !== null && selectedCountry.fillHexColour) {
            setInputColour(selectedCountry.fillHexColour)
        } else {
            setInputColour(defaultColour)
        }
    }, [selectedCountry])


    return (
        <div className={styles["country-window"]} style={{ left: width / 2, bottom: 0 }}>
            <div className="flex flex-row-reverse">
                <button onClick={() => setSelectedCountry(null)}>X</button>
            </div>
            <div className="flex">
                <div className="flex flex-col">
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
                                fillHexColour: event.target.value
                            }
                            editCountry(countryForm)

                        }}
                    // onInput={(event: React.ChangeEvent<HTMLInputElement>) => { console.log(event.target.value) }}
                    // onBlur={(event: React.ChangeEvent<HTMLInputElement>) => { console.log(event.target.value) }}
                    />

                </div>
                <div className="flex flex-col">
                    <p>Text</p>
                    <input type="text" name="" id="" />

                </div>
            </div>
        </div>
    )
}