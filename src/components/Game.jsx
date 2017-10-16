import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../generated/components/styles/Games.css';
import _ from 'lodash';
import WallCell from '../data/WallCell';
import HallCell from '../data/HallCell';
import RoomCell from '../data/RoomCell';
import { setPlayer, movePlayer, addHealth, addExperience, generateNextLevel } from '../actions';
import { debug } from '../config';
import Food from './Food';
import Monster from './Monster';
import Bosses from './Bosses';
import { PlayerDirectionEnum } from './Player';
const showZoneWidth = 36;
const showZoneHeight = 20;
class Game extends Component {

    componentWillMount() {
        document.addEventListener("keydown", this.onKeyPress.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeyPress.bind(this));
    }


    hitWall = () => {

    }

    onKeyPress = (event) => {
        event.preventDefault();
        console.log("onKeyPress ", event.key);
        var { player, ground } = this.props.games;
        switch (event.key) {
            case "ArrowDown":
                if (player.row + 1 < this.props.games.ground.length) {
                    if (ground[player.row + 1][player.col] instanceof WallCell) {
                        return;
                    }
                    this.props.movePlayer(PlayerDirectionEnum.BOTTOM);
                }
                break;
            case "ArrowUp":
                if (player.row > 0) {
                    if (ground[player.row - 1][player.col] instanceof WallCell) {
                        return;
                    }
                    this.props.movePlayer(PlayerDirectionEnum.TOP);
                }
                break;
            case "ArrowLeft":
                if (player.col > 0) {
                    if (ground[player.row][player.col - 1] instanceof WallCell) {
                        return;
                    }
                    this.props.movePlayer(PlayerDirectionEnum.LEFT);
                }
                break;
            case "ArrowRight":
                if (player.col + 1 < this.props.games.ground[0].length) {
                    if (ground[player.row][player.col + 1] instanceof WallCell) {
                        return;
                    }
                    this.props.movePlayer(PlayerDirectionEnum.RIGHT);
                }
                break;
        }
    }

    centerMapToPlayer(player) {
        var height = this.props.games.ground.length;
        var width = this.props.games.ground[0].length;
        var startZoneRow = 0;
        var startZoneCol = 0;
        if (player.row - showZoneHeight / 2 < 0) {
            startZoneRow = 0;
        }
        else if (player.row + showZoneHeight / 2 > height) {
            startZoneRow = height - showZoneHeight;
        } else {
            startZoneRow = player.row - showZoneHeight / 2;
        }

        if (player.col - showZoneWidth / 2 < 0) {
            startZoneCol = 0;
        }
        else if (player.col + showZoneWidth / 2 > width) {
            startZoneCol = width - showZoneWidth;
        } else {
            startZoneCol = player.col - showZoneWidth / 2;
        }
        return {
            startRow: startZoneRow,
            startCol: startZoneCol
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps");
        if (nextProps.games.bosses !== null && nextProps.games.bosses.strength <= 0) {
            nextProps.generateNextLevel();
        }
    }

    render() {

        var game2DArr = this.props.games.ground;
        if (game2DArr === null) {
            return <div></div>;
        }

        console.log("player ", this.props.games.player);

        var { player } = this.props.games;

        var game2DArr = _.map(game2DArr, _.clone);
        player.parent = game2DArr[player.row][player.col];
        game2DArr[player.row][player.col] = player;

        this.props.games.items.map(item => {
            if (item instanceof Food) {
                if (item.isAvailable == false) {
                    return item;
                }
            }
            if (item instanceof Monster) {
                if (item.strength <= 0) {
                    return item;
                }
            }
            item.parent = game2DArr[item.row][item.col];
            game2DArr[item.row][item.col] = item;
            return item;
        });

        var coordZoneToShow = this.centerMapToPlayer(player);
        game2DArr = _.slice(game2DArr, coordZoneToShow.startRow, coordZoneToShow.startRow + showZoneHeight);
        game2DArr = game2DArr.map(col => {
            return _.slice(col, coordZoneToShow.startCol, coordZoneToShow.startCol + showZoneWidth);
        });

        var gameMapDiv = game2DArr.map((row, indexRow) => {
            var divRow = row.map(
                (cell, index) => {
                    try {
                        if (debug) {
                            return <div key={index}>{cell.render()} {cell.row + "," + cell.col}</div>;
                        } else {
                            return <div key={index}>{cell.render()}</div>;
                        }
                    }
                    catch (err) {
                        var a = "Err";
                        console.log("errr:", err);
                    }
                    //return <div className="GameCell" style={{backgroundColor: 'red'}}key={index}></div>

                }
            );
            return <div key={indexRow} className="GameRow">{divRow}</div>
        });
        return (
            <div onKeyDown={this.onKeyPress}
                className="gameMap" >
                {gameMapDiv}
            </div >
        )
    }
}

function mapStateToProps(state) {
    return { games: state };
}

export default connect(mapStateToProps, { setPlayer, movePlayer, addHealth, addExperience, generateNextLevel })(Game);
