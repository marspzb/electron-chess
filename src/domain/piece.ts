import { Board } from "./board";

export enum Side {
    Black="black",
    White="white"
  }
  
  export abstract class Piece {
    side: Side;
    positionX: number;
    positionY: number;
    acronym: string;
    name:string;
  
    constructor() {}
    opositePlayer() {
      return this.side == Side.White ? Side.Black : Side.White;
    }
    abstract canMove(x:number, y:number,board:Board);
    abstract _internalMove(x:number,y:number,board:Board);
    
    move(x:number,y:number,board:Board){
        if(this.canMove(x,y,board)){
            return this._internalMove(x,y,board);
        }
        return null;
    }
    initialYPosition() {
      return this.side == Side.White ? 0 : 7;
    }
    
    get x() {
      return this.positionX;
    }
    get y() {
      return this.positionY;
    }
    _checkDirectionalMove(fromX:number,fromY:number,toX:number,toY:number,dirX:number,dirY:number,board:Board){
       const diffX=toX-fromX;
       const diffY=toY-fromY;
       let canMove=false;
       if(dirX===1&&dirY==1){
            canMove=Math.abs(diffX)==Math.abs(diffY);
       }else if(dirX===1){
            canMove=diffY===0;
       }else if(dirY===1){
           canMove=diffX===0;
       }else{
           throw "Internal error";
       }
       if(!canMove){
           return false;
       }
       const moveX=Math.sign(diffX)* dirX;
       const moveY=Math.sign(diffY)*dirY;
       let x=fromX;
       let y=fromY;
       while(x!==toX||y!==toY){
        x+=moveX;
        y+=moveY;   
        if(board.get(x,y)&&(x!==toX||y!==toY)){
            return false;
        }
 
       }  
        return true;
  }

  canCapture(x:number,y:number,board:Board):Piece{
      const pieceToCapture=board.get(x,y);
    if(this.canMove(x,y,board) && pieceToCapture){
        return pieceToCapture;
    }
}
isCapturable(){
    return true;
}
   
  }
  