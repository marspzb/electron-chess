
import { combineReducers } from 'redux'
import { gameReducer } from './game-reducers'
import { AppState } from '../state/state';

export const chessAppReducer = combineReducers<AppState>({
  playingGames: gameReducer,
  
});
