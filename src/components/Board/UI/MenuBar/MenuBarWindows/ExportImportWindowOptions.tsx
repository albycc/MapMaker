import { useEffect, useState } from "react";
import WindowCard from "../../globals/WindowCard";


export default function ExportImportWindowOptions() {

    const [fileName, setFileName] = useState<string>("map")
    const [fileType, setFileType] = useState<string>("png")
    const [imageWidth, setImageWidth] = useState<number>(1920)
    const [imageHeight, setImageHeight] = useState<number>(1080)



    const exportButtonHandler = (event: React.MouseEvent) => {

        const svg: SVGSVGElement = document.querySelector("#svg-canvas") as SVGSVGElement

        if (svg) {
            const img = new Image();
            const svgStr = (new XMLSerializer()).serializeToString(svg)
            const svgBlob = new Blob([svgStr], {
                type: 'image/svg+xml;charset=utf-8'
            });

            const DOMURL = window.URL || window.webkitURL || window;

            const url = DOMURL.createObjectURL(svgBlob)

            const canvas: HTMLCanvasElement = document.createElement("canvas");

            img.width = imageWidth;
            img.height = imageHeight;
            img.src = url;

            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;

                if (canvas !== null) {
                    canvas.getContext('2d')!.drawImage(img, 0, 0);
                    DOMURL.revokeObjectURL(url);

                    const imgURI = canvas
                        .toDataURL(`image/${fileType}`)
                        .replace(`image/${fileType}`, 'image/octet-stream');

                    const a = document.createElement('a');
                    a.download = `${fileName}.${fileType}`; // filename
                    a.target = '_blank';
                    a.href = imgURI;

                    // trigger download button
                    // (set `bubbles` to false here.
                    // or just `a.click()` if you don't care about bubbling)
                    a.dispatchEvent(new MouseEvent('click', {
                        view: window,
                        bubbles: false,
                        cancelable: true
                    }));

                }

            };

            // const width = 1920;
            // const height = 1080;

            // canvas.getContext("2d")?.drawImage(img, 0, 0, width, height)

            // const imgURL = canvas.toDataURL("image/png")

            // const link = document.createElement("a");
            // link.download = "image";
            // link.href = imgURL;
            // link.dataset.downloadurl = ["image/png", link.download, link.href].join(':');

            // document.body.appendChild(link);
            // link.click();
            // document.body.removeChild(link);
        }


    }
    return (
        <WindowCard position={{ right: 20, top: 10 }}>
            <div className="flex my-4">
                <input
                    className="w-32 border rounded border-slate-300"
                    type="number"
                    name="width"
                    id="width"
                    value={imageWidth}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setImageWidth(+event.target.value)}
                />
                <input
                    className="w-32 border rounded border-slate-300"
                    type="number"
                    name="height"
                    id="height"
                    value={imageHeight}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setImageHeight(+event.target.value)}
                />

            </div>
            <div className="flex flex-row my-4">
                <input type="text" name="" id="" value={fileName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFileName(event.target.value)} />
                <select
                    className="rounded border-slate-300"
                    name=""
                    id=""
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setFileType(event.target.value)}
                >
                    <option value="png" selected>PNG</option>
                    <option value="jpeg">JPG</option>
                </select>
            </div>
            <div className="flex flex-row-reverse my-4">
                <button className="rounded-lg bg-green-400 px-4" onClick={exportButtonHandler}>Export</button>

            </div>
        </WindowCard>
    )
}

