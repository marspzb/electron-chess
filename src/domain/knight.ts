import { Piece, Side } from "./piece";
import { Board } from "./board";


export  class Knight extends Piece {
    constructor(positionX:number,side:Side) {
        super();
        this.acronym = 'N';
        this.side = side;
        this.name='knight';
        this.positionX = positionX;
        this.positionY = this.initialYPosition();
    }
    canMove(x: number, y: number, board: Board) {
        var diffX = Math.abs(x - this.positionX);
        var diffY = Math.abs(y - this.positionY);
        return diffX + diffY == 3 && diffX > 0 && diffY > 0;
      }
      _internalMove(x: number, y: number, board: Board) {
        var clone = new Knight(x, this.side);
        clone.positionX = x;
        clone.positionY = y;
        return clone;
      }
    
    
   
}