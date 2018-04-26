import { Piece, Side } from "./piece";
import { Board } from "./board";


export  class Pawn extends Piece {
    constructor(positionX:number, player:Side) {
        super();
        this.side = player;
        this.positionY = this.initialPosition();
        this.positionX = positionX;
        this.acronym = '';
        this.name='pawn';
    }

    initialPosition() {
        return this.side == Side.White ? 1 : 6;
    }

    _expectedSign() {
        return this.side == Side.White ? 1 : -1;
    }
    canMove(x: number, y: number, board: Board) {
        if(this.canCapture(x,y,board)){
            return true;
        }
        if (x != this.positionX) {
            return false;
        }
        var diff = y - this.positionY;
        var sign = this.side == Side.White ? 1 : -1;

        if (this.positionY == this.initialPosition() && diff == 2 * sign) {
            return !board.get(this.positionX,this.positionY+sign) &&
            !board.get(this.positionX,this.positionY+sign*2);
        } else if (diff == sign) {
            return !board.get(this.positionX,this.positionY+sign);
        } else {
            return null;
        }
    }

    canCapture(x:number,y:number,board:Board){
        var diff = y - this.positionY;
        if (diff != this._expectedSign()) {
            return false;
        }
        if (Math.abs(x - this.positionX) != 1) {
            return false;
        }
        var lastMove = board.lastMovement();
        if (lastMove && lastMove.piece instanceof Pawn && this.between(y, lastMove.fromY, lastMove.y)) {
            return board.get(lastMove.x,lastMove.y);
        }
        var piece = board.get(x, y);
        if(piece&& piece.isCapturable()){
            return piece;
        }
        return null;

    }


    between(num, a, b) {
        return Math.min(a, b) < num && num < Math.max(a, b);
    }

    _internalMove(newPosX, newPosY) {
        var clone = new Pawn(newPosX, this.side);
        clone.positionX = newPosX;
        clone.positionY = newPosY;
        return clone;
    }



}