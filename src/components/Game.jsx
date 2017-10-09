import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../generated/components/styles/Games.css';
import _ from 'lodash';
import WallCell from '../data/WallCell';
import HallCell from '../data/HallCell';
import RoomCell from '../data/RoomCell';
import { setPlayer } from '../actions';

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
        var player = this.props.games.player;
        switch (event.key) {
            case "ArrowDown":
                player.moveBottom();
                break;
            case "ArrowUp":
                player.moveTop();
                break;
            case "ArrowLeft":
                player.moveLeft();
                break;
            case "ArrowRight":
                player.moveRight();
                break;
        }
        this.props.setPlayer(player);
        if (event.key == 'Enter') {
            this.setState({ value: event.target.value })
        }
    }

    centerMapToPlayer() {

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
        game2DArr = _.slice(game2DArr, this.state.y, this.state.y + 15);
        game2DArr = game2DArr.map(row => {
            return _.slice(row, this.state.x, this.state.x + 50);
        });

        var gameMapDiv = game2DArr.map((row, indexRow) => {
            var divRow = row.map(
                (cell, index) => {
                    if (player.row === indexRow && player.col === index) {
                        //<div key={index}>{player.render()}</div>;
                        return <div key={index}>{player.render()}</div>;
                    } else {
                        return <div key={index}>{cell.render()}</div>;
                        //return <div className="GameCell" style={{backgroundColor: 'red'}}key={index}></div>
                    }
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

function mapStateToProps(state) {
    return { games: state };
}

export default connect(mapStateToProps, { setPlayer })(Game);
