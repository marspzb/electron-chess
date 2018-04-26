import { Piece } from "./piece";
import { Move } from "./move";

export interface Board{

    get(x:number,y:number):Piece;
    lastMovement():Move;
}