import * as Redux from 'redux';
import { ChessBoard } from '../domain/chess.board';
import { Board } from '../domain/board';

export type Dispatch = Redux.Dispatch<Redux.Action>;

export interface AppState {
    playingGames:CurrentGamesState;

}

export interface Game{
    id:number;
    board:ChessBoard;
    previousBoards:ChessBoard[];
    title?:string;
}


export interface CurrentGamesState{

    games:{[id:number]:Game};
    active:number;


}