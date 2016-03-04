
export const PLAYER_1 = 1;
export const PLAYER_2 = 2;

export class Game {

    constructor() {
        /*
            Each cell is either:
                null -> empty
                1 -> player 1
                2 -> player 2

            The board has to be a square!
        */
        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
    }

    countCells(row) {
        let empty = 0;
        let player1 = 0;
        let player2 = 0;

        for(let value of row) {
            if(value === PLAYER_1) {
                player1++;
            } else if(value === PLAYER_2) {
                player2++;
            } else {
                empty++;
            }
        }

        return {empty, player1, player2};
    }

    checkRowWinner(row) {
        let count = this.countCells(row);
        if(count.player1 === row.length) {
            return PLAYER_1;
        }
        if(count.player2 === row.length) {
            return PLAYER_2;
        }
        return null;
    }

    checkWinner() {
        let toCheck = [];

        // check all rows
        for(let i=0; i<this.board.length; i++) {
            toCheck.push(this.board[i]);
        }

        // check all columns
        for(let j=0; j<this.board[0].length; j++) {
            let column = [];
            for(let i=0; i<this.board.length; i++) {
                column.push(this.board[i][j]);
            }
            toCheck.push(column);
        }

        // check both diagonals
        let diag1 = [];
        let diag2 = [];
        let length = this.board.length;
        for(let i=0; i<length; i++) {
            diag1.push(this.board[i][i]);
            diag2.push(this.board[i][length-i-1]);
        }
        toCheck.push(diag1);
        toCheck.push(diag2);


        for(let row of toCheck) {
            let winner = this.checkRowWinner(row);
            if(winner != null) {
                return winner;
            }
        }

        // no winners
        return null;
    }
}
