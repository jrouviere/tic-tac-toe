import React from 'react';
import ReactDOM from 'react-dom';


class Cell extends React.Component {
    onClick(event) {
        //if an empty cell is clicked call parent handler
        if(this.props.value === null) {
            this.props.onUserClick(this.props.position)
        }
    }

    render() {
        let value = "cell";
        if(this.props.value === true) {
            value = "cell cross";
        } else if(this.props.value === false) {
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
                cells.push(<Cell value={value} position={pos} onUserClick={this.props.onUserClick} />);
            }
            rows.push(<div className="row">{cells}</div>)
        }
        return <div>{rows}</div>
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: [
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ],

            turn: 0
        };
    }

    onUserClick(position) {
        let player = (this.state.turn % 2 == 0);

        this.state.board[position.i][position.j] = player;
        this.state.turn++;

        this.setState(this.state);
    }

    render() {
        return <Board boardState={this.state.board} onUserClick={(pos)=>this.onUserClick(pos)} />
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
