import * as React from 'react';
import { Piece } from '../../domain/piece';
import { boardCellSize, unit } from './board.constants';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';

const pieceSource = {
  beginDrag(props) {
    return { piece: props.piece };
  },
  endDrag(props, monitor, comp) {
    return { piece: props.piece };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const ChessPieceComponent = (props: { piece: Piece; movePiece: (p: Piece, x: number, y: number) => {} }) => {
  const { piece } = props;

  const className = `chess-piece chess-piece--${piece.name} chess-piece--${piece.side}`;
  const top = (7 - piece.y) * boardCellSize;
  const left = piece.x * boardCellSize;
  const style = { top: `${top}${unit}`, left: `${left}${unit}` };

  return props.connectDropTarget(props.connectDragSource(<div className={className} style={style} />));
};
const pieceTarget = {
  drop(props: { piece: Piece; movePiece: (piece: Piece, x, y) => void }, monitor, comp) {
    var x = props.piece.x;
    var y = props.piece.y;

    props.movePiece(monitor.getItem().piece, x, y);
  }
};
function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

export const ChessPieceView = DropTarget('piece', pieceTarget, collectTarget)(
  DragSource('piece', pieceSource, collect)(ChessPieceComponent)
);
