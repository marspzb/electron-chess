import { Piece, Side } from "./piece";
import { Board } from "./board";



export  class Tower extends Piece {
    constructor(positionX:number, player:Side) {
        super();
        this.side = player;
        this.positionX = positionX;
        this.positionY = this.initialYPosition();
        this.acronym = 'R';
        this.name='tower';
    }


    canMove(x:number, y:number,board:Board) {
        
        return this._checkDirectionalMove(this.positionX,this.positionY,x,y,1,0,board)||
        this._checkDirectionalMove(this.positionX,this.positionY,x,y,0,1,board);
        
    }
    _internalMove(x:number,y:number,board:Board){
      
        var clone = new Tower(x, this.side);
        clone.positionX = x;
        clone.positionY = y;
        return clone;
  
    }
    

    

}