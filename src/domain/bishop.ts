import {Piece, Side} from './piece';
import { Board } from './board';

export  class Bishop extends Piece {
    constructor(positionX, player:Side) {
        super();
        this.acronym = 'B';
        this.name='bishop';
        this.side = player;
        this.positionX = positionX;
        this.positionY = this.initialYPosition();

    }

    canMove(x:number, y:number,board:Board) {

        return this._checkDirectionalMove(this.positionX,this.positionY,x,y,1,1,board);
        
    }
    _internalMove(x:number,y:number,board:Board){
        const clone = new Bishop(x, this.side);
            clone.positionX = x;
            clone.positionY = y;
            return clone; 
    }
   
}