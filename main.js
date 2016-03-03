import React from 'react';
import ReactDOM from 'react-dom';


class Board extends React.Component {
    render() {
        let rows = [];
        for(let i=0; i<3; i++) {
            rows.push(<div className="row">
                <div className="cell">&#x2718;</div>
                <div className="cell">&#x2718;</div>
                <div className="cell">&#x25cb;</div>
            </div>);
        }
        return <div>{rows}</div>
    }
}

class App extends React.Component {
    render() {
        return <Board />
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
