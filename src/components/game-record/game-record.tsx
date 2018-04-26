import { ChessBoard } from '../../domain/chess.board';
import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../state/state';

const GameRecordComponent = (props: { board: ChessBoard }) => {
  return (
    <ul className="game-record">
      {props.board.moves.map((m, i) => (
        <li className="game-record__move">
          #{i + 1}.{m.notation}
        </li>
      ))}
    </ul>
  );
};

export const GameRecordView = connect((state: AppState, props: { gameId: number }) => {
  return {
    board: state.playingGames.games[props.gameId].board
  };
})(GameRecordComponent);
