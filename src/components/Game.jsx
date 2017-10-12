import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../generated/components/styles/Games.css';
import _ from 'lodash';
import WallCell from '../data/WallCell';
import HallCell from '../data/HallCell';
import RoomCell from '../data/RoomCell';
import { setPlayer, addHealth, addExperience, generateNextLevel } from '../actions';
import { debug } from '../config';
import Food from './Food';
import Monster from './Monster';
import Bosses from './Bosses';
const showZoneWidth = 30;
const showZoneHeight = 20;
class Game extends Component {

    constructor() {
        super();
        this.state = {
            x: 0,
            y: 0
        }
    }
    componentWillMount() {
        document.addEventListener("keydown", this.onKeyPress.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeyPress.bind(this));
    }

    hitWall = () => {

    }

    eatFood = (row, col) => {
        var { player, ground } = this.props.games;
        var foodItem = ground[row][col].child;
        if (foodItem !== undefined && foodItem !== null
            && foodItem instanceof Food && foodItem.isAvailable) {
            foodItem.isAvailable = false;
            this.props.addHealth(foodItem.health);
            return true;
        }
        return false;
    }

    /**
     * @augments row , col
     * @returns true if monster (or boss) is dead or the current cell is not a monster 
     */
    attackMonster = (row, col) => {
        var { player, ground } = this.props.games;
        var monsterItem = ground[row][col].child;
        if (monsterItem !== undefined && monsterItem !== null
            && monsterItem instanceof Monster && monsterItem.strength > 0) {
            monsterItem.strength = monsterItem.strength - this.props.games.attack;
            this.props.addHealth(monsterItem.damaged);
            if (monsterItem.strength > 0) {
                return false;
            } else {
                // @TODO add experience
                this.props.addExperience(monsterItem.experience);        
            }
        }

        var bossItem = ground[row][col].child;
        
        if (bossItem !== undefined && bossItem !== null
            && bossItem instanceof Bosses && bossItem.strength > 0) {
                bossItem.strength = bossItem.strength - this.props.games.attack;
            this.props.addHealth(bossItem.damaged);
            if (bossItem.strength > 0) {
                return false;
            } else {
                this.props.addExperience(bossItem.experience);
                this.props.generateNextLevel();       
                
                //@TODO pass to next level
                // regenerate map for this level
            }
        }
        return true;
    }

        /**
     * @augments row , col
     * @returns true if monster is dead or the current cell is not a monster 
     */
    attackBosses = (row, col) => {
        var { player, ground } = this.props.games;
        var bossItem = ground[row][col].child;
        if (bossItem !== undefined && bossItem !== null
            && bossItem instanceof Bosses && bossItem.strength > 0) {
                bossItem.strength = bossItem.strength - this.props.games.attack;
            this.props.addHealth(bossItem.damaged);
            if (bossItem.strength > 0) {
                return false;
            } else {
                this.props.addExperience(bossItem.experience);
                this.props.generateNextLevel();       
                
                //@TODO pass to next level
                // regenerate map for this level
            }
        }
        return true;
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
                    this.eatFood(player.row + 1, player.col);
                    if (this.attackMonster(player.row + 1, player.col)) {
                        player.moveBottom();
                    }
                }
                break;
            case "ArrowUp":
                if (player.row > 0) {
                    if (ground[player.row - 1][player.col] instanceof WallCell) {
                        return;
                    }
                    this.eatFood(player.row - 1, player.col);
                    if (this.attackMonster(player.row - 1, player.col)) {
                        player.moveTop();
                    }
                }
                break;
            case "ArrowLeft":
                if (player.col > 0) {
                    if (ground[player.row][player.col - 1] instanceof WallCell) {
                        return;
                    }
                    this.eatFood(player.row, player.col - 1);
                    if (this.attackMonster(player.row, player.col - 1)) {
                        player.moveLeft();
                    }
                }
                break;
            case "ArrowRight":
                if (player.col < this.props.games.ground[0].length) {
                    if (ground[player.row][player.col + 1] instanceof WallCell) {
                        return;
                    }
                    this.eatFood(player.row, player.col + 1);
                    if (this.attackMonster(player.row, player.col + 1)) {
                        player.moveRight();
                    }
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
            if (item instanceof Food) {
                if (item.isAvailable == false) {
                    return item;
                }
            }
            if (item instanceof Monster)
            {
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

export default connect(mapStateToProps, { setPlayer, addHealth, addExperience, generateNextLevel })(Game);
