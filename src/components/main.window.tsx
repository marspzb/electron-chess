import * as React from 'react';
import { Tabs } from './tabs/tabs';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { StartTabView } from './start-tab/start.tab';
import { Tab } from './tabs/tab';
import { AppState, Game } from '../state/state';
import { ChessBoardView } from './chess-board/chess-board';
import { activateGame } from '../actions/game.actions';
import { GameRecordView } from './game-record/game-record';

const MainChessComponent = (props: { games: { [id: number]: Game } }) => {
  console.log(Object.keys);
  console.log(props.games);
  return (
    <Tabs>
      <Tab title="Start" key="main" default={true} onSelect={() => props.activateGame(null)}>
        <StartTabView />
      </Tab>

      {Object.keys(props.games).map(k => {
        const game = props.games[k] as Game;
        return (
          <Tab
            title={game.title ? `${game.title} (#${game.id})` : `#${game.id}`}
            key={game.id}
            onSelect={() => props.activateGame(game.id)}
          >
            <div className="game_view">
              <div className="game_view__board">
                <ChessBoardView gameId={game.id} />
              </div>
              <div className="game_view__record">
                <GameRecordView gameId={game.id} />
              </div>
            </div>
          </Tab>
        );
      })}
    </Tabs>
  );
};

export const MainChessView = connect(
  (state: AppState) => {
    console.log(state);
    return {
      games: state.playingGames.games
    };
  },
  (dispatch: Dispatch<any>) => ({
    activateGame(gameId: number) {
      dispatch(activateGame(gameId));
    }
  })
)(MainChessComponent);
