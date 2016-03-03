import React from 'react';
import ReactDOM from 'react-dom';

var BOARD_STATE = [
    [true, true, null],
    [null, false, false],
    [true, false, true],
];

class Cell extends React.Component {
    render() {
        let value = "cell";
        if(this.props.value === true) {
            value = "cell cross";
        } else if(this.props.value === false) {
            value = "cell circle";
        }
        return <div className={value} />
    }
}

class Board extends React.Component {
    render() {
        let rows = [];
        for(let boardRow of this.props.boardState) {
            let row = [];
            for(let boardCell of boardRow) {
                row.push(<Cell value={boardCell} />);
            }
            rows.push(<div className="row">{row}</div>)
        }
        return <div>{rows}</div>
    }
}

class App extends React.Component {
    render() {
        return <Board boardState={BOARD_STATE}/>
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
