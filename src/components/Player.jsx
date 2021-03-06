import Cell from '../data/Cell';
import React from 'react';
import { debug, baseUrl } from '../config';
import { EXP_BERSERKER, EXP_GLADIATOR, EXP_MAGE, EXP_WARRIOR} from '../constant';

import {
    ANIMATION_NONE, ANIMATION_SWITCH_HERO
} from '../constant';

export const PlayerEnum = {
    WARRIOR: 1,
    GLADIATOR: 2,
    BERSERKER: 3,
    MAGE: 4
};

export const PlayerDirectionEnum = {
    LEFT: 1,
    TOP: 2,
    RIGHT: 3,
    BOTTOM: 4
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
    constructor(row, col, type, health, experience = 0, attack = 7) {
        super(row, col);
        this.type = type;
        this.health = health;
        this.experience = experience;
        this.attack = attack;
    }

    getParentStyles() {
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

    getName() {
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
    getStyle() {
        switch (this.type) {
            case PlayerEnum.WARRIOR: {
                return styles.warrior;
            }
            case PlayerEnum.GLADIATOR: {
                return styles.gladiator;
            }
            case PlayerEnum.BERSERKER: {
                return styles.berserker;
            }
            case PlayerEnum.MAGE: {
                return styles.mage;
            }
        }
        return styles.warrior;
    }

    /**
     * 
     * @param {Number} health 
     */
    addHealth(health) {
        this.health = this.health + health;
    }

    addExperience(experience) {
        this.experience = this.experience + experience;
        if (this.type === PlayerEnum.WARRIOR && this.experience >= EXP_GLADIATOR) {
            this.type = PlayerEnum.GLADIATOR;
            this.experience = 0;
            this.attack = 14;
        } else if (this.type === PlayerEnum.GLADIATOR && this.experience >= EXP_BERSERKER) {
            this.type = PlayerEnum.BERSERKER;
            this.experience = 0;
            this.attack = 18;            
        } else if (this.type === PlayerEnum.BERSERKER && this.experience >= EXP_MAGE) {
            this.type = PlayerEnum.MAGE;
            this.experience = 0;
            this.attack = 21;                    
        }
    }

    getImageSrc(){
        switch (this.type) {
            case PlayerEnum.WARRIOR: {
                return baseUrl + "/image/player/warrior.png";
            }
            case PlayerEnum.GLADIATOR: {
                return baseUrl + "/image/player/gladiator.png";
            }
            case PlayerEnum.BERSERKER: {
                return baseUrl + "/image/player/berserker.png";
            }
            case PlayerEnum.MAGE: {
                return baseUrl + "/image/player/mage.png";
            }
        }
        return baseUrl + "/image/player/warrior.png";        
    }
    render() {
        if (this.animation !== undefined && this.animation !== null && this.animation === ANIMATION_SWITCH_HERO)
        {
            return this.renderSwitchHero();
        }

        return (<div
            className="GameCell PlayerContainer"
            style={this.getParentStyles()}>
            <img src={this.getImageSrc()} className="imgFood img-responsive Player" />
        </div>);
    }

    renderSwitchHero() {
        return (<div
            className="GameCell PlayerContainer"
            style={this.getParentStyles()}>
            <img src={this.getImageSrc()} className="imgFood img-responsive Player animateSwitchHero" />
        </div>);
    }

    moveLeft() {
        if (this.col >= 0) {
            this.col = this.col - 1;
        }
    }

    moveRight() {
        this.col = this.col + 1;
    }

    moveTop() {
        if (this.row >= 0) {
            this.row = this.row - 1;
        }
    }
    moveBottom() {
        this.row = this.row + 1;
    }
}

export default Player;