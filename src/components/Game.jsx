import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../generated/components/styles/Games.css';
import _ from 'lodash';
import WallCell from '../data/WallCell';
import HallCell from '../data/HallCell';
import RoomCell from '../data/RoomCell';
import { setPlayer } from '../actions';
import { debug } from '../config';

const showZoneWidth = 20;
const showZoneHeight = 20;
class Game extends Component {
    
    constructor() {
        super();
        this.state = {
            x: 0,
            y: 0
        }
    }
    componentWillMount(){
        document.addEventListener("keydown", this.onKeyPress.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeyPress.bind(this));
    }



    onKeyPress = (event) => {
        event.preventDefault();
        console.log("onKeyPress ", event.key);
        var { player, ground } = this.props.games;
        switch (event.key) {
            case "ArrowDown":
                if (player.row < this.props.games.ground.length) {
                    if (ground[player.row + 1][player.col] instanceof WallCell) {
                        return;
                    }
                    player.moveBottom();
                }
                break;
            case "ArrowUp":
                if (player.row > 0) {
                    if (ground[player.row - 1][player.col] instanceof WallCell) {
                        return;
                    }
                    player.moveTop();
                }
                break;
            case "ArrowLeft":
                if (player.col > 0) {
                    if (ground[player.row][player.col - 1] instanceof WallCell) {
                        return;
                    }
                    player.moveLeft();
                }
                break;
            case "ArrowRight":
                if (player.col < this.props.games.ground[0].length) {
                    if (ground[player.row][player.col + 1] instanceof WallCell) {
                        return;
                    }

                    player.moveRight();
                }
                break;
        }
        this.props.setPlayer(player);
        if (event.key == 'Enter') {
            this.setState({ value: event.target.value })
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
            item.parent = game2DArr[item.row][item.col]; 
            game2DArr[item.row][item.col] = item;
            
        });
       
        var coordZoneToShow = this.centerMapToPlayer(player);
        game2DArr = _.slice(game2DArr, coordZoneToShow.startRow, coordZoneToShow.startRow + showZoneHeight);
        game2DArr = game2DArr.map(col => {
            return _.slice(col, coordZoneToShow.startCol, coordZoneToShow.startCol + showZoneWidth);
        });

        var gameMapDiv = game2DArr.map((row, indexRow) => {
            var divRow = row.map(
                (cell, index) => {
                        if (debug) {
                            return <div key={index}>{cell.render()} {cell.row + "," + cell.col}</div>;
                        } else {
                            return <div key={index}>{cell.render()}</div>;
                        }
                        //return <div className="GameCell" style={{backgroundColor: 'red'}}key={index}></div>
                    
                }
            );
            return <div key={indexRow} className="GameRow">{divRow}</div>
        });
        return (
            <div onKeyDown={this.onKeyPress}>
                <div
                    className="gameMap" >
                    {gameMapDiv}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { games: state };
}

export default connect(mapStateToProps, { setPlayer })(Game);
