import { Piece, Side } from "./piece";
import { Board } from "./board";


export  class Queen extends Piece {
    constructor(player:Side) {
        super();
        this.side = player;
        this.positionX = 3;
        this.positionY = this.initialYPosition();
        this.acronym = 'Q';
        this.name='queen';
    }

    canMove(x:number, y:number,board:Board) {

        return this._checkDirectionalMove(this.positionX,this.positionY,x,y,1,1,board)||
        this._checkDirectionalMove(this.positionX,this.positionY,x,y,1,0,board)||
        this._checkDirectionalMove(this.positionX,this.positionY,x,y,0,1,board);
        
    }
    _internalMove(x:number,y:number,board:Board){
      
            var clone = new Queen(this.side);
            clone.positionX =x;
            clone.positionY = y;
            return clone;
      
    }
}