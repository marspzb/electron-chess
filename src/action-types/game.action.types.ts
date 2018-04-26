import { Piece } from "../domain/piece";

export interface MoveAction{

    gameId:number;
    piece:Piece;
    x:number;
    y:number;

}

export interface UndoAction{
    gameId:number;

}
export interface CloseGameAction{
    gameId:number;
}