import {Bishop} from './bishop';
import {King} from './king';
import {Queen} from './queen';
import {Knight} from './knight';
import {Pawn} from './pawn';
import {Tower} from './tower';
import {Move} from './move';
import { Board } from './board';
import { Piece, Side } from './piece';
export  class ChessBoard implements Board {

    board:Piece[][];
    moves:Move[];
    lastMoveId:number;
    
    constructor() {
        this.board = [];

        for (var i = 0; i < 8; i++) {
            var row = [];
            for (var j = 0; j < 8; j++) {
                row.push(null);
            }
            this.board.push(row);
        }

        for (var i = 0; i < 8; i++) {
            this.addPiece(new Pawn(i, Side.White));
            this.addPiece(new Pawn(i, Side.Black));

        }
        this.addDefaultPieces(Side.White);
        this.addDefaultPieces(Side.Black);
        //console.log(this.board);
        this.moves = [];
        this.lastMoveId = 0;

    }

    addDefaultPieces(player:Side) {
        this.addPiece(new Tower(0, player));
        this.addPiece(new Knight(1, player));
        this.addPiece(new Bishop(2, player));
        this.addPiece(new Queen(player));
        this.addPiece(new King(player));
        this.addPiece(new Bishop(5, player));
        this.addPiece(new Knight(6, player));
        this.addPiece(new Tower(7, player));
    }

    addPiece(piece:Piece) {
        this.board[piece.y][piece.x] = piece;
    }
    get(x:number, y:number):Piece {
        return this.board[y][x];
    }

    move(x:number, y:number, toX:number, toY:number) {
        var piece = this.get(x, y);
        if (piece && this.canMove(piece)) {
            let b = this.clone();
            let check = false;
            //console.log(piece, toX, toY);
            //console.log(piece.canEat(toX, toY, this));
            const capturePiece=piece.canCapture(toX, toY, this);
            if ( (capturePiece&&capturePiece.isCapturable()) || (piece.canMove(toX, toY, this) && !this.get(toX, toY))) {
                b.board[piece.y][piece.x] = null;
                if(capturePiece){
                    b.board[capturePiece.y][capturePiece.x]=null;
                }
                b.board[toY][toX] = piece.move(toX, toY, this);
                
                const newPieces=b.getPieces();
                const kings:Piece[]=newPieces.filter(p=>p instanceof King);
                const checkedKings=kings.filter(k=>{
                 return newPieces.some((p:Piece)=>p.side!==k.side&&(p.canMove(k.x,k.y,b)||p.canCapture(k.x,k.y,b)));   
                })
                check=checkedKings.length>0;
                if(checkedKings.find(k=>k.side==piece.side)){
                    return null;
                }

                b.moves.push(new Move(piece, x, y, toX, toY, check, this.lastMoveId++));
                return b;
            }

        }
        return null;

    }
    canMove(piece:Piece) {
        return piece.side === this.expectedPlayer();
    }
    expectedPlayer() {
        var lastMovement = this.lastMovement();
        var expectedPlayer = Side.White;
        //console.log(lastMovement);
        if (lastMovement && lastMovement.piece.side === Side.White) {
            expectedPlayer = Side.Black;
        }
        return expectedPlayer;
    }
    lastMovement() {
        if (this.moves.length == 0) {
            return null;
        }
        return this.moves[this.moves.length - 1];
    }

    clone() {
        var b = new ChessBoard();
        b.moves = [].concat(this.moves)
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                b.board[i][j] = this.board[i][j];
            }
        }
        return b;
    }

    getPieces() {
        var pieces = [];
        //console.log(this.board);
        this.board.forEach(function (row) {
            row.forEach(function (cell) {
                if (cell) {
                    pieces.push(cell);
                }
            });
        })
        return pieces;
    }
}