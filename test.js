import assert from 'assert';

import {PLAYER_1, PLAYER_2, Game} from './game.js';


describe('Game', () => {

    let game;
    beforeEach(() => {
        game = new Game();
    });

    describe('#checkRowWinner()', () => {

        it('returns PLAYER1 if row is all 1', () => {
            assert.equal(game.checkRowWinner([PLAYER_1, PLAYER_1, PLAYER_1]), PLAYER_1);
        });

        it('returns PLAYER2 if row is all 2', () => {
            assert.equal(game.checkRowWinner([PLAYER_2, PLAYER_2, PLAYER_2]), PLAYER_2);
        });

        it('returns null if row is mixed', () => {
            assert.equal(game.checkRowWinner([PLAYER_1, PLAYER_2, PLAYER_1]), null);
        });

        it('returns null if row is incomplete', () => {
            assert.equal(game.checkRowWinner([PLAYER_1, null, PLAYER_1]), null);
        });

    });
    
    describe('#checkWinner()', () => {
        it('returns null if board is empty', () => {
            game.board = [
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ];
            assert.equal(game.checkWinner(), null);
        });
        it('returns winner if row is filled', () => {
            game.board = [
                [PLAYER_1, PLAYER_1, PLAYER_1],
                [null, null, null],
                [null, null, null]
            ];
            assert.equal(game.checkWinner(), PLAYER_1);
        });
        it('returns winner if column is filled', () => {
            game.board = [
                [PLAYER_1, null, null],
                [PLAYER_1, null, null],
                [PLAYER_1, null, null]
            ];
            assert.equal(game.checkWinner(), PLAYER_1);
        });

        it('returns winner if first diagonal is filled', () => {
            game.board = [
                [PLAYER_1, null, null],
                [null, PLAYER_1, null],
                [null, null, PLAYER_1]
            ];
            assert.equal(game.checkWinner(), PLAYER_1);
        });

        it('returns winner if second diagonal is filled', () => {
            game.board = [
                [null, null, PLAYER_1],
                [null, PLAYER_1, null],
                [PLAYER_1, null, null]
            ];
            assert.equal(game.checkWinner(), PLAYER_1);
        });

    });

});
