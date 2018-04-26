import { GamesList } from '../game-list/game.list';
import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { startGame } from '../../actions/game.actions';
import "./start.less";

const StartTabComponent = (props: { newGame: () => void }) => {
  return (
    <div className="start-tab">
      <h1>Welcome to Gess</h1>
      <p>Lorem ipsum</p>
      <button className='start__tab_new-game' onClick={() => props.newGame()}>New game!</button>
    </div>
  );
};

export const StartTabView = connect(
  () => ({}),
  (dispatch: Dispatch<any>) => ({
    newGame() {
      dispatch(startGame());
    }
  })
)(StartTabComponent);
