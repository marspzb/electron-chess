import { ChessBoard } from '../domain/chess.board';

import { handleActions, Action, handleAction } from 'redux-actions';

import { CurrentGamesState, Game } from '../state/state';
import { Piece } from '../domain/piece';
import { Actions } from '../action-types/action.names';
import { MoveAction, UndoAction } from '../action-types/game.action.types';

const move = (game: Game, piece: Piece, x: number, y: number) => {
  var newBoard = game.board.move(piece.x, piece.y, x, y);
  if (newBoard) {
    return { ...game, board: newBoard, previousBoards: game.previousBoards.concat([game.board]) };
  } else {
    return game;
  }
};

export const gameReducer = handleActions(
  {
    [Actions.MOVE]: (state: CurrentGamesState, action: Action<MoveAction>) => {
      const playingGame = state.games[action.payload.gameId];
      if (playingGame) {
        const newState: CurrentGamesState = { ...state, games: { ...state.games } };
        newState.games[action.payload.gameId] = move(
          playingGame,
          action.payload.piece,
          action.payload.x,
          action.payload.y
        );
        return newState;
      }
      return state;
    },
    [Actions.NEW_GAME]: (state: CurrentGamesState, action: any) => {
      const newGames = { ...state.games };
      const id = new Date().getTime();
      newGames[id] = {
        id,
        board: new ChessBoard(),
        previousBoards: []
      };
      return { ...state, games: newGames };
    },
    [Actions.UNDO]: (state: CurrentGamesState, action: Action<UndoAction>) => {
      const playingGame = state.games[action.payload.gameId];
      if (playingGame && playingGame.previousBoards.length > 0) {
        const newState: CurrentGamesState = { ...state, games: { ...state.games } };
        newState.games[action.payload.gameId] = {
          ...playingGame,
          board: playingGame.previousBoards[playingGame.previousBoards.length - 1],
          previousBoards: playingGame.previousBoards.filter((b, i) => i < playingGame.previousBoards.length - 1)
        };
        return newState;
      }
      return state;
    },
    [Actions.ACTIVATE_GAME]: (state: CurrentGamesState, action: Action<UndoAction>) => {
      if (action.payload.gameId) {
        return { ...state, active: state.games[action.payload.gameId].id };
      } else {
        return { ...state, active: null };
      }
    },
    [Actions.CLOSE_GAME]: (state: CurrentGamesState, action: Action<UndoAction>) => {
      const newGames = { ...state.games };
      delete newGames[action.payload.gameId];
      let newActive = state.active;
      if (state.active && state.active === action.payload.gameId) {
        newActive = null;
      }
      return { ...state, games: newGames, active: newActive };
    }
  },
  { games: {}, active: null }
);
