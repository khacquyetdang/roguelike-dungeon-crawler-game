import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import '../generated/components/styles/Games.css';
import '../generated/components/styles/Win.css';
import _ from 'lodash';
import WallCell from '../data/WallCell';
import HallCell from '../data/HallCell';
import RoomCell from '../data/RoomCell';
import {
    ANIMATION_GAME_OVER, ANIMATION_NONE, ANIMATION_SWITCH_HERO, ANIMATION_NEW_LEVEL, ANIMATION_GAME_WIN,
} from '../constant';
import {
    setPlayer, movePlayer, addHealth, addExperience, generateNextLevel,
    replayGame,
    turnOffAnimation
} from '../actions';
import { debug } from '../config';
import Food from './Food';
import Monster from './Monster';
import Bosses from './Bosses';
import { PlayerDirectionEnum, PlayerEnum } from './Player';
import { baseUrl, animationTimeOut } from '../config';
import { playSound } from '../configureStore';
const showZoneWidth = 36;
const showZoneHeight = 20;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        borderRadius: '50px',
        transform: 'translate(-50%, -50%)',
        border: 'solid 10px',
        color: '#a94301',
        fontSize: '16px',
        fontStyle: 'bold',
        maxWidth: '3500px',
        maxHeight: '450px',
        textAlign: 'center',
        overflow: 'unset',
    }
};
class Game extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };
    }
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
        if (this.props.games.animation != ANIMATION_NONE) {
            console.log("animation in progress, waiting");
            return;
        }
        var { player, ground } = this.props.games;
        var moveDown
        if (event.key === "ArrowDown" || event.key === 'x') {
            if (player.row + 1 < this.props.games.ground.length) {
                if (ground[player.row + 1][player.col] instanceof WallCell) {
                    return;
                }
                this.props.movePlayer(PlayerDirectionEnum.BOTTOM);
            }
        } else if (event.key === "ArrowUp" || event.key === 'z') {
            if (player.row > 0) {
                if (ground[player.row - 1][player.col] instanceof WallCell) {
                    return;
                }
                this.props.movePlayer(PlayerDirectionEnum.TOP);
            }
        }
        else if (event.key === "ArrowLeft" || event.key === 'q') {
            if (player.col > 0) {
                if (ground[player.row][player.col - 1] instanceof WallCell) {
                    return;
                }
                this.props.movePlayer(PlayerDirectionEnum.LEFT);
            }
        } else if (event.key === "ArrowRight" || event.key === 'd') {
            if (player.col + 1 < this.props.games.ground[0].length) {
                if (ground[player.row][player.col + 1] instanceof WallCell) {
                    return;
                }
                this.props.movePlayer(PlayerDirectionEnum.RIGHT);
            }
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
            if (nextProps.games.animation !== ANIMATION_GAME_WIN) {
                nextProps.generateNextLevel();
            }
        }
    }


    requestCloseFn = () => {
        this.setState({ isModalOpen: false });
    }


    createAnimationMarsLanding(text) {

        return (<Modal
            isOpen={this.props.games.animation != ANIMATION_NONE}
            onRequestClose={this.requestCloseFn}
            closeTimeoutMS={500}
            style={customStyles}
        >
            <div className="centerHorizontal winningModal">
                <div className="space">
                    <div className="ship">
                        <div className="ship-rotate">
                            <div className="pod"></div>
                            <div className="fuselage"></div>
                        </div>
                    </div>
                    <div className="ship-shadow"></div>
                    <div className="mars">
                        <div className="tentacle"></div>
                        <div className="flag">
                            <div className="small-tentacle"></div>
                        </div>
                        <div className="planet">
                            <div className="surface"></div>
                            <div className="crater1"></div>
                            <div className="crater2"></div>
                            <div className="crater3"></div>
                        </div>
                    </div>
                    <div className="test"></div>
                </div>
                <div className="winningFooter">
                    <div className="congratText">
                        {text}
                    </div>
                    <Button
                        onClick={this.props.replayGame}>
                        Replay
                </Button>
                </div>
            </div>
        </Modal>);
    }

    showAnimation = () => {
        const setAnimationTimeOut = (animationTimeOut = 2000) => {
            setTimeout(function () {
                this.props.turnOffAnimation();
            }.bind(this), animationTimeOut);
        }

        const createModal = (text, imgUrl, textBtn, winning = false) => {

            return (<Modal
                isOpen={this.props.games.animation != ANIMATION_NONE}
                onRequestClose={this.requestCloseFn}
                closeTimeoutMS={500}
                style={customStyles}
            >
                <img src={baseUrl + "animation/" + imgUrl} className="img-responsive" />
                <div className="centerHorizontal">
                    <div className="congratText">
                        {text}
                    </div>
                    <Button className="congratText"
                        bsSize="small"
                        onClick={this.props.replayGame}>
                        Take another chance
                    </Button>
                </div>
            </Modal>);
        }
        if (this.props.games.animation === ANIMATION_GAME_OVER) {
            //setAnimationTimeOut(animationTimeOut.gameOver);
            var text = "Game over, try again and kill the big boss!!!";
            var imgUrl = "gameOverWarior.gif";
            switch (this.props.games.player.type) {
                case PlayerEnum.GLADIATOR: {
                    imgUrl = "gameOverGladiator.gif";
                    break;
                }
                case PlayerEnum.MAGE: {
                    imgUrl = "gameOverMage.gif";
                    break;
                }
                case PlayerEnum.BERSERKER: {
                    imgUrl = "gameOverBerserkerr.gif";
                    break;
                }
                default: {
                    imgUrl = "gameOverWarior.gif";
                    break;
                }
            }
            var soundUrl = "mario_game_over.mp3";
            playSound(soundUrl, this.props.games.volume);
            return createModal(text, imgUrl, "Replay", false);
        }

        if (this.props.games.animation === ANIMATION_GAME_WIN) {
            var text = "Congratulation, you kill the big boss and win the games!!!";
            //var imgUrl = "gameOverWarior.gif";
            var soundUrl = "mario_game_win.mp3";
            playSound(soundUrl, this.props.games.volume);
            return this.createAnimationMarsLanding(text);
            //return createModal(text, imgUrl);
        }
        if (this.props.games.animation === ANIMATION_SWITCH_HERO) {
            setAnimationTimeOut(animationTimeOut.switchHero);
            var text = "Wow, you become the heros " + this.props.games.player.getName();
            var imgUrl = "switchHeros.gif";
            var soundUrl = "mario_switch_hero.mp3";
            playSound(soundUrl, this.props.games.volume)
            // we set the animation inside of the cell
            // only animation for the games over and win games
            //return createModal(text, imgUrl);
        }

        if (this.props.games.animation === ANIMATION_NEW_LEVEL) {
            setAnimationTimeOut(animationTimeOut.newLevel);
            var congratText = "Congratulation, you have finished level" + (this.props.games.level - 1);
            var imgUrl = "nextlevel.gif";
            soundUrl = "mario_level_complete.mp3";
            playSound(soundUrl, this.props.games.volume);

            //return createModal(congratText, imgUrl);
        }

        return null;
    }

    render() {

        var game2DArr = this.props.games.ground;
        if (game2DArr === null) {
            return <div></div>;
        }

        console.log("player ", this.props.games.player);

        var { player } = this.props.games;

        player.animation = this.props.games.animation;
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
            if (item instanceof Bosses) {
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
                    //return <div className="GameCell" style={{ backgroundColor: 'red' }} key={index}></div>

                }
            );
            return <div key={indexRow} className="GameRow">{divRow}</div>
        });

        var animationCss = "";
        if (this.props.games.animation === ANIMATION_NEW_LEVEL) {
            animationCss = "animateNewLevel";
        }

        var cssClassGameMap = "gameMap " + animationCss;
        return (

            <div onKeyDown={this.onKeyPress}
                className={cssClassGameMap} >
                {this.showAnimation()}
                {gameMapDiv}
            </div >
        )
    }
}

function mapStateToProps(state) {
    return { games: state };
}

export default connect(mapStateToProps, {
    setPlayer, movePlayer, addHealth, addExperience, generateNextLevel,
    replayGame, turnOffAnimation
})(Game);
