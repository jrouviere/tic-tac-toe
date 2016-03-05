
export const TIE = 0;
export const PLAYER_1 = 1;
export const PLAYER_2 = 2;

export class Game {

    constructor(size=3) {
        /*
            Each cell is either:
                null -> empty
                1 -> player 1
                2 -> player 2

            The board has to be a square!
        */
        //build the board
        this.size = size;
        this.board = [];
        for(let i=0; i<size; i++) {
            let row = [];
            for(let j=0; j<size; j++) {
                row.push(null);
            }
            this.board.push(row);
        }
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
        if(count.player1 === this.size) {
            return PLAYER_1;
        }
        if(count.player2 === this.size) {
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

    getAllAvailableCells() {
        let cells = [];
        for(let i=0; i<this.size; i++) {
            for(let j=0; j<this.size; j++) {
                if(this.board[i][j] === null) {
                    cells.push( {i:i, j:j} );
                }
            }
        }
        return cells;
    }

    getAllLines() {
        let lines = [];

        // all rows
        for(let i=0; i<this.size; i++) {
            lines.push(this.board[i]);
        }

        // all columns
        for(let j=0; j<this.size; j++) {
            let column = [];
            for(let i=0; i<this.size; i++) {
                column.push(this.board[i][j]);
            }
            lines.push(column);
        }

        // both diagonals
        let diag1 = [];
        let diag2 = [];
        for(let i=0; i<this.size; i++) {
            diag1.push(this.board[i][i]);
            diag2.push(this.board[i][this.size-i-1]);
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
