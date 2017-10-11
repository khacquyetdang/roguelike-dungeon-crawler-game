import Cell from '../data/Cell';
import React from 'react';
import { debug } from '../config';

export const PlayerEnum = {
    WARRIOR: 1,
    GLADIATOR: 2,
    BERSERKER: 3,
    MAGE: 4
};


const styles = {
    warrior: {
        backgroundImage: "url(" + process.env.PUBLIC_URL + "/image/player/warrior.png" + ")",
    },
    gladiator: {
        backgroundImage: "url(" + process.env.PUBLIC_URL + "/image/player/gladiator.png" + ")",
    },
    berserker: {
        backgroundImage: "url(" + process.env.PUBLIC_URL + "/image/player/berserker.png" + ")",
    },
    mage: {
        backgroundImage: "url(" + process.env.PUBLIC_URL + "/image/player/mage.png" + ")",
    }
}
class Player extends Cell {
    /**
     * @param {number} row 
     * @param {number} col 
     * @param {PlayerEnum} type 
     * @param {number} health 
     */
    constructor(row, col, type, health, experience) {
        super(row, col);
        this.type = type;
        this.health = health;
        this.experience = experience;
    }

    getParentStyles = () => {
        if (this.parent !== undefined && this.parent !== null) {
            return this.parent.getStyle();
        }
        return {};
    }
    debugPlayer() {
        if (debug) {
            return (this.row + "," + this.col);
        }
    }

    getName = () => {
        switch (this.type) {
            case PlayerEnum.WARRIOR: {
                return "WARRIOR";
            }
            case PlayerEnum.GLADIATOR: {
                return "GLADIATOR";
            }
            case PlayerEnum.BERSERKER: {
                return "BERSERKER";
            }
            case PlayerEnum.MAGE: {
                return "MAGE";
            }
        }
        return "WARRIOR";
    }
    render() {
        switch (this.type) {
            case PlayerEnum.WARRIOR: {
                return (<div
                    className="GameCell"
                    style={this.getParentStyles()}>
                    <div
                        className="Player"
                        style={styles.warrior}>

                        {
                            this.debugPlayer()
                        }
                    </div>
                </div>);
            }
            case PlayerEnum.GLADIATOR: {
                return (<div
                    className="GameCell"
                    style={this.getParentStyles()}>
                    <div
                        className="Player"
                        style={styles.gladiator}>
                    </div>
                </div>);
            }
            case PlayerEnum.BERSERKER: {
                return (<div
                    className="GameCell"
                    style={this.getParentStyles()}>
                    <div
                        className="Player"
                        style={styles.berserker} />
                </div>);
            }
            case PlayerEnum.MAGE: {
                return (<div
                    className="GameCell"
                    style={this.getParentStyles()}>
                    <div
                        className="Player"
                        style={styles.mage} />
                </div>);
            }

        }
    }

    moveLeft = () => {
        if (this.col >= 0) {
            this.col = this.col - 1;
        }
    }

    moveRight = () => {
        this.col = this.col + 1;
    }

    moveTop = () => {
        if (this.row >= 0) {
            this.row = this.row - 1;
        }
    }
    moveBottom = () => {
        this.row = this.row + 1;
    }
}

export default Player;