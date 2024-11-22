import { useContext, useEffect, useState } from "react"
import { BoardContext } from "../../../../../contexts/boardContexts"


export default function ToolbarOptionsBrush() {

    const [usesBrush, setUsesBrush] = useState<boolean>(true)
    const [inputColour, setInputColour] = useState<string>()

    const { setCurrentColour, currentColour } = useContext(BoardContext)

    useEffect(() => {

        setInputColour(currentColour)

    }, [currentColour])

    console.log("currentColour: ", currentColour)
    return (
        <div className="absolute flex flex-col bg-orange-100 rounded-bl-md rounded-br-md p-2" style={{ top: 36, left: 0 }}>
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
                            value={inputColour}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInputColour(event.target.value)}
                            onBlur={(event: React.ChangeEvent<HTMLInputElement>) => {
                                console.log(event.target.value)
                                setCurrentColour(event.target.value)
                            }} />

                    </>
                ) : (
                    <>
                        <button>Select image</button>

                    </>
                )}

            </div>

        </div>
    )
}