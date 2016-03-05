
import {PLAYER_1, PLAYER_2, TIE, Game} from './game.js';

export class AI {

    getAllAvailableCells(game) {
        let cells = [];
        for(let i=0; i<game.size; i++) {
            for(let j=0; j<game.size; j++) {
                if(game.board[i][j] === null) {
                    cells.push( {i:i, j:j} );
                }
            }
        }
        return cells;
    }

    firstAvailableCell(game) {
        let cells = this.getAllAvailableCells(game);
        if(cells.length > 0) {
            return cells[0];
        }
        return null;
    }

    randomCell(game) {
        let cells = this.getAllAvailableCells(game);
        if(cells.length > 0) {
            return cells[Math.floor(Math.random() * cells.length)];
        }
        return null;
    }

    findWinningMove(game, player) {
        //check all possibilities, find one which would let the other player win
        let cells = this.getAllAvailableCells(game);

        for(let cell of cells) {
            //TODO: make a clone of the board
            game.board[cell.i][cell.j] = player;
            let winner = game.checkWinner();
            game.board[cell.i][cell.j] = null;

            if(winner === player){
                return cell;
            }
        }

        return null;
    }

    avoidLoosing(game) {
        return this.findWinningMove(game, PLAYER_1);
    }

    tryWinning(game) {
        return this.findWinningMove(game, PLAYER_2);
    }

    chooseMove(game) {
        return this.tryWinning(game) || this.avoidLoosing(game) || this.randomCell(game);
    }

}
