
import {PLAYER_1, PLAYER_2, TIE, Game} from './game.js';

export class AI {

    firstAvailableCell(game) {
        let board = game.board;
        for(let i=0; i<board.length; i++) {
            for(let j=0; j<board[i].length; j++) {
                if(board[i][j] === null) {
                    return {i:i, j:j};
                }
            }
        }
        return null;
    }

    avoidLoosing(game) {
        let board = game.board;
        //check all possibilities, find one which would let us win
        for(let i=0; i<board.length; i++) {
            for(let j=0; j<board[i].length; j++) {
                if(board[i][j] === null) {

                    //TODO: make a clone of the board
                    board[i][j] = PLAYER_1;
                    let winner = game.checkWinner();
                    board[i][j] = null;

                    if(winner === PLAYER_1){
                        return {i:i, j:j};
                    }
                }
            }
        }

        //not found return first available
        return this.firstAvailableCell(game);
    }

}
