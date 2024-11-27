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

    return (
        <ToolbarOptionsWindow>
            <form onChange={formOnChange}>
                <div className="flex">
                    <ul>
                        <li className="flex">
                            <input type="color" name="borderColor" id="borderColor" value={toolbarLegendStyles.borderColor} />
                            <label htmlFor="borderColour" >Border colour</label>
                        </li>
                        <li className="flex">
                            <input
                                type="number"
                                className="w-16 h-6"
                                name="borderWidth"
                                id="borderWidth"
                                value={toolbarLegendStyles.borderWidth}
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
                                value={toolbarLegendStyles.borderRound}
                                min={0}
                            />
                            <label htmlFor="borderWidth">Border round</label>
                        </li>
                    </ul>
                    <ul>
                        <li className="flex">
                            <input type="color" name="backgroundColor" id="backgroundColor" value={toolbarLegendStyles.backgroundColor} />
                            <label htmlFor="backgroundColor" >Background colour</label>
                        </li>
                    </ul>
                    <ul>
                        <li className="flex">
                            <input type="color" name="fontColor" id="fontColor" value={toolbarLegendStyles.fontColor} />
                            <label htmlFor="fontColorr" >Font colour</label>
                        </li>
                        <li className="flex">
                            <input type="number" className="w-16 h-6" name="titleSize" id="titleSize" value={toolbarLegendStyles.titleSize} />
                            <label htmlFor="frameMargin" >Title size</label>
                        </li>
                        <li className="flex">
                            <input type="number" className="w-16 h-6" name="spaceBetweenRows" id="spaceBetweenRows" value={toolbarLegendStyles.spaceBetweenRows} />
                            <label htmlFor="spaceBetweenRows" >Space between rows</label>
                        </li>
                    </ul>
                </div>
            </form>
        </ToolbarOptionsWindow>
    )
}