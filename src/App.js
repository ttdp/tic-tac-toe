import React, { Component } from "react";
import Count from "./Count";

export default function App() {
    return (
        <div>
            <Game />
            <Count />
        </div>
    )
}

class Square extends Component {
    render() {
        return (
            <button className="square" onClick={this.props.onClick}>
                {this.props.value}
            </button>
        )
    }
}

class Board extends Component {
    renderSquare(i) {
        return <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />
    }

    render() {
        let squares = []
        for (let row = 0; row < 3; row ++) {
            let boardRow = []
            for (let col = 0; col < 3; col ++) {
                const position =  row * 3 + col
                boardRow.push(<span key={position}>{this.renderSquare(position)}</span>)
            }
            squares.push(<div className="board-row" key={row}>{boardRow}</div>)
        }

        return (
            <div>
                {squares}
            </div>
        )
    }
}

class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                position: null
            }],
            stepNumber: 0,
            xIsNext: true,
            isDescending: true
        }
        this.handleSort = this.handleSort.bind(this)
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        const current = history[history.length - 1]
        const squares = current.squares.slice()
        if (calculateWinner(squares) || squares[i]) {
            return
        }
        squares[i] = this.state.xIsNext ? "X" : "O"
        this.setState({
            history: history.concat([{
                squares: squares,
                position: i
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        })
    }

    handleSort() {
        this.setState({
            isDescending: !this.state.isDescending
        })
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }

    render() {
        const history = this.state.history
        const current = history[this.state.stepNumber]
        const winner = calculateWinner(current.squares)

        const moves = history.map((step, move) => {
            const location = calculateLocation(step.position)
            const desc = move ? "Go to move #" + move + " " + location: "Go to game start"
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        {move === this.state.stepNumber ? <b>{desc}</b> : desc}
                    </button>
                </li>
            )
        })

        let status
        if (winner) {
            status = "Winner: " + winner
        } else {
            status = "Next player: " + (this.state.xIsNext ? 'X' : 'O')
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>
                        {status}
                        <p><button onClick={this.handleSort}>Sort</button></p>
                    </div>
                    <ol>{this.state.isDescending ? moves : moves.reverse()}</ol>
                </div>
            </div>
        )
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }

    return null
}

function calculateLocation(position) {
    const locations = {
        "0": "(0, 0)",
        "1": "(0, 1)",
        "2": "(0, 2)",
        "3": "(1, 0)",
        "4": "(1, 1)",
        "5": "(1, 2)",
        "6": "(2, 0)",
        "7": "(2, 1)",
        "8": "(2, 2)",
    }
    
    return locations[position]
}