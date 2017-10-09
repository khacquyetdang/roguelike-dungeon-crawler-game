import React, { Component } from 'react';
import '../generated/components/styles/Games.css';
import _ from 'lodash';
import WallCell from '../data/WallCell';
import HallCell from '../data/HallCell';
import RoomCell from '../data/RoomCell';

class Game extends Component {
    constructor() {
        super();
        this.state = {
            x: 0,
            y: 0
        }
    }
    onKeyPress = (event) => {
        event.preventDefault();
        console.log("onKeyPress ", event.key);
        switch (event.key) {
            case "ArrowDown":
                var y = Math.min(this.state.y + 1, this.props.ground.length);
                this.setState({ y: y });
                break;
            case "ArrowUp":
                var y = Math.max(this.state.y - 1, 0);
                this.setState({ y: y });
                break;
            case "ArrowLeft":
                var x = Math.max(this.state.x - 1, 0);
                this.setState({ x: x });
                break;
            case "ArrowRight":
                var x = this.state.x + 1;
                this.setState({ x: x });
                break;
        }
        if (event.key == 'Enter') {
            this.setState({ value: event.target.value })
        }
    }
    render() {

        var game2DArr = this.props.ground;
        if (game2DArr === null) {
            return <div></div>;
        }

        game2DArr = _.slice(game2DArr, this.state.y, this.state.y + 25);
        game2DArr = game2DArr.map(row => {
            return _.slice(row, this.state.x, this.state.x + 50);
        });

        var gameMapDiv = game2DArr.map((row, indexRow) => {
            var divRow = row.map(
                (cell, index) => {
                    return <div key={index}>{cell.render()}</div>;
                }
            );
            return <div key={indexRow} className="GameRow">{divRow}</div>
        });
        return (
            <div tabIndex="0" onKeyDown={this.onKeyPress}>
                <div
                    className="gameMap" >
                    {gameMapDiv}
                </div>
            </div>
        )
    }
}

export default Game;
