import React from 'react';
import ReactDOM from 'react-dom';

import {PLAYER_1, PLAYER_2, TIE, Game} from './game.js';

class Cell extends React.Component {
    onClick(event) {
        //if an empty cell is clicked call parent handler
        if(this.props.value === null) {
            this.props.onUserClick(this.props.position)
        }
    }

    render() {
        let value = "cell";
        if(this.props.value === PLAYER_1) {
            value = "cell cross";
        } else if(this.props.value === PLAYER_2) {
            value = "cell circle";
        }
        return <div className={value} onClick={(e) => this.onClick(e)} />
    }
}

class Board extends React.Component {
    render() {
        let rows = [];

        for(let i=0; i<this.props.boardState.length; i++) {
            let boardRow = this.props.boardState[i];
            let cells = [];
            for(let j=0; j<boardRow.length; j++) {
                let value = boardRow[j];
                let pos = {i:i, j:j};
                let key = i + "_" + j;
                cells.push(<Cell value={value} position={pos} key={key} onUserClick={this.props.onUserClick} />);
            }
            let key = "row" + i;
            rows.push(<div className="row" key={key}>{cells}</div>)
        }
        return <div>{rows}</div>
    }
}

class GameStatus extends React.Component {
    render() {
        let status = "";

        switch (this.props.winner) {
            case PLAYER_1:
                status = "Player 1 wins!";
                break;
            case PLAYER_2:
                status = "Player 2 wins!";
                break;
            case TIE:
                status = "Tie!";
                break;
        }

        return <div>{status}</div>
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            game: new Game(),
            winner: null,
            turn: 0
        };
    }

    onUserClick(position) {
        if(this.state.winner === null) {
            let player = ((this.state.turn % 2 == 0) ? PLAYER_1 : PLAYER_2);

            this.state.game.board[position.i][position.j] = player;
            this.state.turn++;
            this.state.winner = this.state.game.checkWinner();

            this.setState(this.state);
        }
    }

    render() {
        return (<div>
            <Board boardState={this.state.game.board} onUserClick={(pos)=>this.onUserClick(pos)} />
            <GameStatus winner={this.state.winner}/>
        </div>);
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
