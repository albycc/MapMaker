import { useContext } from "react";
import { ILegendStyles } from "../../../../../types/LegendTypes";
import ToolbarOptionsWindow from "./ToolbarOptionsWindow";
import { ToolbarContext } from "../../../../../contexts/toolbarContexts";

// interface IProps {
//     toolbarLegendStyles: ILegendStyles;
//     onChange: (form: ILegendStyles) => void;
//     close: () => void
// }

export default function ToolbarOptionsLegend() {

    const { toolbarLegendStyles, setToolbarLegendStyles } = useContext(ToolbarContext)

    const formOnChange = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        if (toolbarLegendStyles !== null) {
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

            setToolbarLegendStyles({ ...toolbarLegendStyles, [input.id]: value })

        }

    }

    return (
        <>
            {toolbarLegendStyles !== null ?
                <ToolbarOptionsWindow>
                    <form onChange={formOnChange}>
                        <div className="flex">
                            <ul>
                                <li className="flex">
                                    <input className="w-6" type="color" name="borderColor" id="borderColor" defaultValue={toolbarLegendStyles.borderColor} />
                                    <label htmlFor="borderColour" className="whitespace-nowrap" >Border colour</label>
                                </li>
                                <li className="flex">
                                    <input
                                        type="number"
                                        className="w-16 h-6"
                                        name="borderWidth"
                                        id="borderWidth"
                                        defaultValue={toolbarLegendStyles.borderWidth}
                                        min={0}
                                    />
                                    <label htmlFor="borderWidth" className="whitespace-nowrap">Border width</label>
                                </li>
                                <li className="flex">
                                    <input
                                        type="number"
                                        className="w-16 h-6"
                                        name="borderRound"
                                        id="borderRound"
                                        defaultValue={toolbarLegendStyles.borderRound}
                                        min={0}
                                    />
                                    <label htmlFor="borderWidth" className="whitespace-nowrap">Border round</label>
                                </li>
                            </ul>
                            <ul>
                                <li className="flex">
                                    <input className="w-6" type="color" name="backgroundColor" id="backgroundColor" defaultValue={toolbarLegendStyles.backgroundColor} />
                                    <label htmlFor="backgroundColor" className="whitespace-nowrap">Background colour</label>
                                </li>
                            </ul>
                            <ul>
                                <li className="flex">
                                    <input className="w-6" type="color" name="fontColor" id="fontColor" defaultValue={toolbarLegendStyles.fontColor} />
                                    <label htmlFor="fontColorr" className="whitespace-nowrap">Font colour</label>
                                </li>
                                <li className="flex">
                                    <input type="number" className="w-12 h-6" name="titleSize" id="titleSize" defaultValue={toolbarLegendStyles.titleSize} />
                                    <label htmlFor="frameMargin" className="whitespace-nowrap">Title size</label>
                                </li>
                                <li className="flex">
                                    <input type="number" className="w-12 h-6" name="spaceBetweenRows" id="spaceBetweenRows" defaultValue={toolbarLegendStyles.spaceBetweenRows} />
                                    <label htmlFor="spaceBetweenRows" className="whitespace-nowrap">Space between rows</label>
                                </li>
                            </ul>
                        </div>
                    </form>
                </ToolbarOptionsWindow>
                : null

            }

        </>
    )
}