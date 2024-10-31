import { useContext } from "react";
import { ICountry, ICountryForm } from "../../../../types/CountriesTypes";
import styles from "./country-window.styles.module.css"
import { BoardContext } from "../../../../contexts/boardContexts";

interface IProps {
    width: number;
    country: ICountry;
}

export default function CountryWindow({ width, country }: IProps) {

    const { editSelectedCountry } = useContext(BoardContext)

    // const onFormChange = (event: React.FormEvent) => {

    //     event.preventDefault()

    //     console.log(event)

    //     // const formData = new FormData(event.target)

    // }

    console.log("selected country: ", country)

    return (
        <div className={styles["country-window"]} style={{ left: width / 2, bottom: 0 }}>
            <input
                type="color"
                name=""
                id=""
                value={country.fillHexColour || "#e7e7e7"}
                // value={country && country.fillHexColour ? country.fillHexColour : "#e66465"}
                onBlur={(event: React.ChangeEvent<HTMLInputElement>) => {
                    console.log(event.target.value)
                    const countryForm: ICountryForm = {
                        countryId: country.countryId,
                        fillHexColour: event.target.value
                    }
                    editSelectedCountry(countryForm)

                }}
            // onInput={(event: React.ChangeEvent<HTMLInputElement>) => { console.log(event.target.value) }}
            // onBlur={(event: React.ChangeEvent<HTMLInputElement>) => { console.log(event.target.value) }}
            />


        </div>
    )
}