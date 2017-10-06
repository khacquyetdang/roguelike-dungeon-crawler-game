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
        console.log("onKeyPress ", event.key);
        switch (event.key) {
            case "ArrowDow":
                var x = this.state.x + 1;
                this.setState({ x: x });
                break;
            case "ArrowUp":
                var x = this.state.x - 1;
                this.setState({ x: x });
                break;
            case "ArrowLeft":
                var y = this.state.y - 1;
                this.setState({ y: y });
                break;
            case "ArrowRight":
                var y = this.state.y + 1;
                this.setState({ y: y });
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

        game2DArr = _.slice(game2DArr, this.state.x, this.state.x + 30);
        game2DArr = game2DArr.map(row => {
            return _.slice(row, this.state.y, this.state.y + 30);
        });

        var gameMapDiv = game2DArr.map((row, indexRow) => {
            var divRow = row.map((cell, indexCell) => {
                if (cell instanceof WallCell) {
                    return <div key={indexCell} className="GameCell Wall"></div>
                }
                else {
                    if (cell instanceof RoomCell) {

                        switch (cell.roomIndex % 4) {
                            case 0:
                                return <div key={indexCell} className="GameCell Room_1"></div>;
                            case 1:
                                return <div key={indexCell} className="GameCell Room_2"></div>;
                            case 2:
                                return <div key={indexCell} className="GameCell Room_3"></div>;
                            default:
                                return <div key={indexCell} className="GameCell Room_4"></div>;
                        }
                    }
                    if (cell instanceof HallCell) {
                        return <div key={indexCell} className="GameCell Hall"></div>;
                    }
                }
            });
            return <div key={indexRow} className="GameRow">{divRow}</div>
        });
        return (
            <div tabIndex="0" onKeyDown={this.onKeyPress}>Hello world
                <div
                    className="gameMap" >
                    {gameMapDiv}
                </div>
            </div>
        )
    }
}

export default Game;
