
export const TIE = 0;
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

    setCell(i, j, value) {
        this.board[i][j] = value;
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

    checkLineWinner(line) {
        let count = this.countCells(line);
        if(count.player1 === line.length) {
            return PLAYER_1;
        }
        if(count.player2 === line.length) {
            return PLAYER_2;
        }
        return null;
    }

    isGameEnded() {
        //if we find one free cell, the game is not over
        for(let row of this.board) {
            for(let cell of row) {
                if(cell === null) {
                    return false;
                }
            }
        }
        return true;
    }

    getAllLines() {
        let lines = [];

        // all rows
        for(let i=0; i<this.board.length; i++) {
            lines.push(this.board[i]);
        }

        // all columns
        for(let j=0; j<this.board[0].length; j++) {
            let column = [];
            for(let i=0; i<this.board.length; i++) {
                column.push(this.board[i][j]);
            }
            lines.push(column);
        }

        // both diagonals
        let diag1 = [];
        let diag2 = [];
        let length = this.board.length;
        for(let i=0; i<length; i++) {
            diag1.push(this.board[i][i]);
            diag2.push(this.board[i][length-i-1]);
        }
        lines.push(diag1);
        lines.push(diag2);

        return lines;
    }

    checkWinner() {
        let linesToCheck = this.getAllLines();

        for(let line of linesToCheck) {
            let winner = this.checkLineWinner(line);
            if(winner != null) {
                return winner;
            }
        }

        if(this.isGameEnded()) {
            return TIE;
        }

        // no winners
        return null;
    }
}
