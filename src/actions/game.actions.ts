import { createAction } from "redux-actions";
import { Actions } from "../action-types/action.names";
import { Piece } from "../domain/piece";

export const movePiece=createAction(Actions.MOVE,(piece:Piece,x:number,y:number,gameId:number)=>({
    piece,
    x,
    y,
    gameId
}));
export const startGame=createAction(Actions.NEW_GAME);

export const activateGame=createAction(Actions.ACTIVATE_GAME,(gameId:number)=>({
    gameId
}))

export const undoGame=createAction(Actions.UNDO,(gameId:number)=>({
    gameId
}));

export const closeGame=createAction(Actions.CLOSE_GAME,(gameId:number)=>({
    gameId
}));