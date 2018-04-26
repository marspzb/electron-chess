import * as React from 'react';
import { connect } from 'react-redux';

import * as HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';

import { Motion, spring } from 'react-motion';
import { Piece } from '../../domain/piece';
import { ChessBoard } from '../../domain/chess.board';
import { ChessPieceView } from './piece';
import { AppState } from '../../state/state';
import { Dispatch } from 'redux';
import { movePiece } from '../../actions/game.actions';
import './board.less';

var boardCellSize = 12.5;
var unit = '%';

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

const cellTarget = {
  drop(props, monitor, comp) {
    //console.log();
    var x = props.cellIdx;
    var y = props.rowIdx;

    props.movePiece(monitor.getItem().piece, x, y);
  }
};
const ChessCellComponent = (props: {
  rowIdx: number;
  cellIdx: number;
  movePiece: (p: Piece, x: number, y: number) => {};
}) => {
  var blackWhiteClass = props.rowIdx % 2 != props.cellIdx % 2 ? 'chess-board-cell-black' : 'chess-board-cell-white';
  blackWhiteClass += ' chess-board-cell';
  return props.connectDropTarget(<div className={blackWhiteClass} />);
};

const ChessCell = DropTarget('piece', cellTarget, collectTarget)(ChessCellComponent);

const ChessRow = (props: { rowIdx: number; row: Piece[]; movePiece: (p: Piece, x: number, y: number) => {} }) => {
  let rowIdx = props.rowIdx;
  var cells = props.row.map((cell, i) => {
    return <ChessCell rowIdx={props.rowIdx} cellIdx={i} key={i} movePiece={props.movePiece} />;
  }, this);
  return <div className="chess-board-row">{cells}</div>;
};

const BoardDragContextComponent = (props: any) => {
  return <div className="l-chess-board-container">{props.children}</div>;
};

const BoardDragContext = DragDropContext(HTML5Backend)(BoardDragContextComponent);
const ChessBoardComponent = (props: { board: ChessBoard; movePiece: (p: Piece, x: number, y: number) => {} }) => {
  const rows = props.board.board.map((row, i) => {
    return <ChessRow row={row} rowIdx={7 - i} key={i} movePiece={props.movePiece} />;
  });
  var pieces = props.board.getPieces().map(p => {
    return <ChessPieceView piece={p} key={p.id} movePiece={props.movePiece} />;
  });
  return (
    <BoardDragContext>
      <div className="chess-board-container">
        <div className="chess-board">{rows}</div>

        {pieces}
      </div>
    </BoardDragContext>
  );
};

export const ChessBoardView = connect(
  (state: AppState, props: { gameId: number }) => ({
    board: state.playingGames.games[props.gameId].board
  }),
  (dispatch: Dispatch<any>, props: { gameId: number }) => ({
    movePiece(p: Piece, x: number, y: number) {
      dispatch(movePiece(p, x, y, props.gameId));
    }
  })
)(ChessBoardComponent);
