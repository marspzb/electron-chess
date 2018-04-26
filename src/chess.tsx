import * as React from 'react';
import { ipcRenderer } from 'electron';
import { render } from 'react-dom';
import { Tabs } from './components/tabs/tabs';
import { Tab } from './components/tabs/tab';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { MainChessView } from './components/main.window';
import { startGame, undoGame, closeGame } from './actions/game.actions';
import { Game } from './state/state';
import "./chess.less";

ipcRenderer.on('command', (event, commandName) => {
  const activeGame = store.getState().playingGames.active;
  console.log(store.getState());
  switch (commandName) {
    case 'new':
      store.dispatch(startGame());
      break;
    case 'undo':
      if (activeGame) {
        store.dispatch(undoGame(activeGame));
      }
      break;
    case 'close-game':
      if (activeGame) {
        store.dispatch(closeGame(activeGame));
      }
      break;
    case 'search':
      if (activeGame) {
        ipcRenderer.send(
          'search',
          store
            .getState()
            .playingGames.games[activeGame].board.moves.map(m => m.notation)
            .join(' ')
        );
      }

    default:
      break;
  }
});

const gamesCheckStatus = {};
store.subscribe(() => {
  const state = store.getState();

  Object.keys(state.playingGames.games).forEach(gameId => {
    const game: Game = state.playingGames.games[gameId];
    if (game.board.lastMovement() && game.board.lastMovement().check) {
      if (!gamesCheckStatus[gameId]) {
        ipcRenderer.send('check');
      }
      gamesCheckStatus[gameId] = true;
    } else {
      gamesCheckStatus[gameId] = false;
    }
  });
});
const appElement = document.createElement('div');
document.body.appendChild(appElement);
render(
  <Provider store={store}>
    <MainChessView />
  </Provider>,
  appElement
);
