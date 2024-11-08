import React from "react";
import WindowCard from "../globals/WindowCard"
import { ILegendStyles } from "./LegendTypes"

interface IProps {
    values: ILegendStyles;
    onChange: (form: ILegendStyles) => void;
    close: () => void
}

export default function LegendWindowStyles({ values, onChange, close }: IProps) {


    const formOnChange = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const input = event.target as HTMLInputElement

        let value;

        switch (input.type) {
            case "checkbox":
                value = input.checked
                break;
            case "number":
                value = +input.value
                break;
            default:
                value = input.value



        }

        onChange({ ...values, [input.id]: value })

        // const formData = new FormData(event.target)

        // for (let [ley, value] of formData.entries()) {

        // }

        // console.log(formData.entries())



    }
    return (
        <WindowCard position={{ top: 10, left: 230 }}>
            <form onChange={formOnChange}>
                <div className="flex">
                    <ul>

                        <li className="flex">
                            <input type="color" name="borderColor" id="borderColor" value={values.borderColor} />
                            <label htmlFor="borderColour" >Border colour</label>
                        </li>
                        <li className="flex">
                            <input
                                type="number"
                                className="w-16 h-6"
                                name="borderWidth"
                                id="borderWidth"
                                value={values.borderWidth}
                                min={0}
                            />
                            <label htmlFor="borderWidth">Border width</label>
                        </li>
                        <li className="flex">
                            <input
                                type="number"
                                className="w-16 h-6"
                                name="borderRound"
                                id="borderRound"
                                value={values.borderRound}
                                min={0}
                            />
                            <label htmlFor="borderWidth">Border round</label>
                        </li>
                    </ul>
                    <ul>

                        <li className="flex">
                            <input type="color" name="backgroundColor" id="backgroundColor" value={values.backgroundColor} />
                            <label htmlFor="backgroundColor" >Background colour</label>
                        </li>
                    </ul>
                    <ul>
                        <li className="flex">
                            <input type="color" name="fontColor" id="fontColor" value={values.fontColor} />
                            <label htmlFor="fontColorr" >Font colour</label>
                        </li>
                        <li className="flex">
                            <input type="number" className="w-16 h-6" name="titleSize" id="titleSize" value={values.titleSize} />
                            <label htmlFor="frameMargin" >Title size</label>
                        </li>
                        <li className="flex">
                            <input type="number" className="w-16 h-6" name="framePadding" id="framePadding" value={values.framePadding} />
                            <label htmlFor="frameMaframePaddingrgin" >Frame padding</label>
                        </li>
                        <li className="flex">
                            <input type="number" className="w-16 h-6" name="spaceBetweenRows" id="spaceBetweenRows" value={values.spaceBetweenRows} />
                            <label htmlFor="spaceBetweenRows" >Space between rows</label>
                        </li>
                    </ul>


                </div>
            </form>
            <div>
                <button onClick={() => close()}>Close</button>
            </div>


        </WindowCard>
    )
}