import { useEffect, useState } from "react";
import ToolbarOptionsWindow from "./ToolbarOptionsWindow";

const fonts = [
    'Arial',
    'Verdana',
    'Tahoma',
    'Trebuchet MS',
    'Times New Roman',
    'Georgia',
    'Garamond',
    'Courier New',
    'Brush Script MT',
]

export type IToolbarOptionsText = {
    font: string;
    style: string;
    size: number;
    colour: string;
}

export default function ToolbarOptionsText() {

    const [toolbarOptions, setToolbarOptions] = useState<IToolbarOptionsText>({
        font: fonts[0],
        style: "normal",
        size: 10,
        colour: "#000000"
    })

    return (
        <ToolbarOptionsWindow>
            <div className="flex">
                <select name="" id="">
                    {fonts.map((f, i) => <option key={i} value={f} defaultChecked={toolbarOptions.font === f}>{f}</option>)}

                </select>
                <select name="" id="">
                    <option value="normal" defaultChecked>Normal</option>
                    <option value="italic">Italic</option>
                    <option value="bold">Bold</option>

                </select>
                <input className="w-16" type="number" name="" id="" min="1" defaultValue={toolbarOptions.size} />
                <input className="w-6" type="color" name="" id="" defaultValue={toolbarOptions.colour} />

            </div>
        </ToolbarOptionsWindow>
    )
}