import spriteIcon from "../../../icons/sprite.png"
import { Position } from "../../types/Position";

interface IProps {
    src: string;
    position: Position
    width: number;
    height: number;
}

export default function SpriteElement(props: IProps) {
    return (
        <svg x={props.position.x} y={props.position.y} width={props.width} height={props.height} >
            <image href={spriteIcon} />
        </svg>
    )
}