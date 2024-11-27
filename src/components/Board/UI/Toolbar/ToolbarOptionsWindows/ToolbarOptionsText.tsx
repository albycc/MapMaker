import { useContext, useEffect } from "react";
import ToolbarOptionsWindow from "./ToolbarOptionsWindow";
import { ToolbarContext } from "../../../../../contexts/toolbarContexts";
import { fonts } from "../../../../../constants/fonts";

export type IToolbarOptionsText = {
    font: string;
    style: string;
    size: number;
    colour: string;
}

const styleOption = [
    {
        label: "Normal",
        value: "normal"
    },
    {
        label: "Bold",
        value: "bold"
    },
    {
        label: "Italic",
        value: "italic"
    },
]

export default function ToolbarOptionsText() {

    const { toolbarTextOptions, setToolbarTextOptions, selected } = useContext(ToolbarContext)

    useEffect(() => {

        console.log("ToolbarOptionsText: ", selected)

        // if (selectionIsText(selected)) {
        //     setToolbarTextOptions({
        //         font: selected.font,
        //         style: selected.style,
        //         size: selected.size,
        //         colour: selected.colour
        //     })
        // }

    }, [selected])

    return (
        <ToolbarOptionsWindow>
            <div className="flex">
                <select
                    name="font"
                    id="font"
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setToolbarTextOptions({ ...toolbarTextOptions, font: event.target.value })}
                >
                    {fonts.map((f, i) => <option key={i} value={f} selected={toolbarTextOptions.font === f}>{f}</option>)}

                </select>
                <select
                    name="style"
                    id="style"
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setToolbarTextOptions({ ...toolbarTextOptions, style: event.target.value })}
                > {styleOption.map(s => <option key={s.value} value={s.value} selected={toolbarTextOptions.style === s.value}>{s.label}</option>)}
                </select>
                <input
                    className="w-16"
                    type="number"
                    name="size"
                    id="size"
                    min="1"
                    value={toolbarTextOptions.size}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setToolbarTextOptions({ ...toolbarTextOptions, size: +event.target.value })}
                />
                <input
                    className="w-6"
                    type="color"
                    name="colour"
                    id="colour"
                    value={toolbarTextOptions.colour}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setToolbarTextOptions({ ...toolbarTextOptions, colour: event.target.value })}
                />

            </div>
        </ToolbarOptionsWindow>
    )
}