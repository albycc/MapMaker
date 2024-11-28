import { useContext, useEffect, useState } from "react"
import { Img } from "../../../../types/Image"
import { ToolbarContext } from "../../../../../contexts/toolbarContexts"
import ToolbarOptionsWindow from "./ToolbarOptionsWindow"


export default function ToolbarOptionsBrush() {

    const [usesBrush, setUsesBrush] = useState<boolean>(true)
    const { setCurrentColour, currentColour, images, addImage } = useContext(ToolbarContext)
    const [inputHexColour, setInputHexColour] = useState<string>("")
    const [currentImage, setCurrentImage] = useState<Img | null>(null)

    useEffect(() => {

        if (typeof currentColour === "string") {

            setInputHexColour(currentColour)
        }
        else {
            setCurrentImage(currentColour)
        }

    }, [currentColour])

    useEffect(() => {

        if (usesBrush && inputHexColour !== "") {
            setCurrentColour(inputHexColour)
        } else if (!usesBrush && currentImage !== null) {
            setCurrentColour(currentImage)
        }

    }, [usesBrush])

    const imageSelectorHandler = (event: React.ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files

        if (file) {

            const fileReader = new FileReader();
            const img: Img = {
                label: file[0].name,
                src: ""
            }

            fileReader.onload = function () {
                const result = fileReader.result?.toString()

                if (result) {
                    img.src = result
                }
                if (!images.find(i => i.label === img.label))
                    addImage(img)
            }

            fileReader.readAsDataURL(file[0])
        }
    }

    const onClickImageHandler = (event: React.MouseEvent<HTMLButtonElement>) => {

        const key = event.currentTarget.getAttribute("data-key")

        if (key) {
            const img = images.find(i => i.label === key)

            if (img) {
                setCurrentImage(img)
                setCurrentColour(img)
            }
        }
    }

    return (
        <ToolbarOptionsWindow>
            <div className="flex flex-col">
                <div className="flex my-1">
                    <span className="w-24">
                        <input type="radio" name="brush-fill" id="use-color" defaultChecked onChange={() => setUsesBrush(true)} />
                        <label htmlFor="use-color" className="ml-1">Colour</label>
                    </span>
                    <span className="w-24">
                        <input type="radio" name="brush-fill" id="use-image" onChange={() => setUsesBrush(false)} />
                        <label htmlFor="use-image" className="ml-1">Image</label>
                    </span>
                </div>
                <div className="flex my-1">
                    {usesBrush ? (
                        <>
                            <input
                                className="w-6"
                                type="color"
                                name=""
                                id=""
                                value={inputHexColour}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInputHexColour(event.target.value)}
                                onBlur={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setCurrentColour(event.target.value)
                                }} />
                        </>
                    ) : (
                        <div>
                            <div className="flex flex-wrap items-start overflow-y-auto h-20">
                                {images.map((image) => {
                                    return (
                                        <button className={currentImage && currentImage.label === image.label ? "border border-b-slate-900" : "m-1"} key={image.label} onClick={onClickImageHandler} data-key={image.label}>
                                            <img className="w-8 h-8" src={image.src} alt={image.label} />
                                        </button>
                                    )
                                })}
                                <label htmlFor="select-image" className="bg-slate-100 px-3 py-1 h-10 cursor-pointer border rounded-lg text-lg">
                                    <input
                                        className="hidden"
                                        type="file"
                                        name=""
                                        id="select-image"
                                        accept=".jpeg, .jpg, .png"
                                        onChange={imageSelectorHandler}
                                    />
                                    +
                                </label>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </ToolbarOptionsWindow>
    )
}