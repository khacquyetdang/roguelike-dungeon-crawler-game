import Cell from '../data/Cell';
import React from 'react';
export const PlayerEnum = {
    WARRIOR: 1,
    GLADIATOR: 2,
    BERSERKER: 3,
    MAGE: 4
};

const styles = {
    warrior: {
        backgroundImage: "url(" + "/image/player/warrior.png" + ")",
    },
    gladiator: {
        backgroundImage: "url(" + "/image/player/gladiator.png" + ")",
    },
    berserker: {
        backgroundImage: "url(" + "/image/player/berserker.png" + ")",
    },
    mage: {
        backgroundImage: "url(" + "/image/player/mage.png" + ")",
    }
}
class Player extends Cell {
    /**
     * @param {number} row 
     * @param {number} col 
     * @param {PlayerEnum} type 
     * @param {number} health 
     */
    constructor(row, col, type, health) {
        super(row, col);
        this.type = type;
    }

    getParentStyles = () => {
        if (this.parent !== undefined && this.parent !== null) {
            return this.parent.getStyle();
        }
        return {};
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