import { Position } from "../../types/Position";

export interface IText {
    id: string;
    text: string;
    colour: string;
    size: number;
    font: string;
    position: Position;
}

export interface ISprite {
    id: string;
    src: string;
    position: Position
    width: number;
    height: number;
}