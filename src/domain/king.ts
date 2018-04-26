import { Piece, Side } from './piece';
import { Board } from './board';

export class King extends Piece {
  constructor(player:Side) {
    super();
    this.acronym = 'K';
    this.name='king';
    this.side = player;
    this.positionX = this.initialXPosition();
    this.positionY = this.initialYPosition();
  }
  initialXPosition() {
    return 4;
  }

  canMove(x: number, y: number, board: Board) {
    var diffX = Math.abs(x - this.positionX);
    var diffY = Math.abs(y - this.positionY);
    
    return diffX<=1&&diffY<=1;

  }
  _internalMove(x: number, y: number, board: Board) {
    const clone = new King(this.side);
    clone.positionX = x;
    clone.positionY = y;
    return clone;
  }
  isCapturable(){
    return false;
  }

}
