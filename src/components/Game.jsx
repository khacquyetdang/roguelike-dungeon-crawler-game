import React, { Component } from 'react';
import '../generated/components/styles/Games.css';
import _ from 'lodash';
import WallCell from '../data/WallCell';
import HallCell from '../data/HallCell';
import RoomCell from '../data/RoomCell';

class Game extends Component {
    render() {

        var game2DArr = this.props.ground;
        if (game2DArr === null) {
            return <div></div>;
        }
       
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
            <div>Hello world
                <div className="gameMap" >
                    {gameMapDiv}
                </div>
            </div>
        )
    }
}

export default Game;
