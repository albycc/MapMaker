import { Position } from "../../types/Position";

export interface IText {
    id: string;
    text: string;
    colour: string;
    size: number;
    font: string;
    position: Position;
}