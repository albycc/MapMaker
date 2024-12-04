import { useEffect, useState } from "react";
import { Position } from "../components/types/Position";


export default function useDragAndDrop(element: SVGElement, x: number, y: number) {

    const [offset, setOffset] = useState<Position>({ x: 0, y: 0 })

    useEffect(() => {
        console.log("element: ", element)

        if (element !== null) {
            element.addEventListener("mousedown", startDrag)
        }

    }, [])

    function startDrag(event: MouseEvent) {

        event.preventDefault()

        console.log("start drag")

        setOffset({ x: x - event.clientX, y: y - event.clientY })
    }

    console.log("offset: ", offset)
    return [offset]



}