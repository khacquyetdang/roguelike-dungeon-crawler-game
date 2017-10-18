import Cell from '../data/Cell';
import React from 'react';

export const BossesType = {
    GOO: 1,
    TENGU: 2,
    DM300: 3,
    DWARF_KING: 4,
    YOG_DZEWA: 5,

};
class Bosses extends Cell {
    /**
     * 
     * @param {*} x coord x on the table 
     * @param {*} y 
     * @param {*} type must be Monster enum
     */
    constructor(row, col, type = BossesType.GOO) {
        super(row, col);
        this.type = type;
        switch (this.type) {
            case BossesType.DM300: {
                this.strength = 60;
                this.damaged = -7;
                this.experience = 10;
                break;
            }
            case BossesType.GOO: {
                this.strength = 70;
                this.damaged = -10;
                this.experience = 15;
                break;
            }
            case BossesType.TENGU: {
                this.strength = 100;
                this.damaged = -15;
                this.experience = 25;
                break;
            }
            case BossesType.YOG_DZEWA: {
                this.strength = 150;
                this.damaged = -18;
                this.experience = 30;
                break;
            }
            case BossesType.DWARF_KING: {
                this.strength = 200;
                this.damaged = -25;
                this.experience = 40;
                break;    
            }
            default: {
                this.strength = 60;
                this.damaged = -30;
                this.experience = 10;
                break;
            }
        }
    }

    getParentStyles() {
        if (this.parent !== undefined && this.parent !== null) {
            return this.parent.getStyle();
        }
        return {};
    }


    getImageSrc() {
        switch (this.type) {
            case BossesType.DM300: {
                return process.env.PUBLIC_URL + "/image/bosses/DM300_gif.gif";
            }
            case BossesType.GOO: {
                return process.env.PUBLIC_URL + "/image/bosses/Goo_gif.gif";
            }
            case BossesType.TENGU: {
                return process.env.PUBLIC_URL + "/image/bosses/Tengu_gif.gif";
            }
            case BossesType.YOG_DZEWA: {
                return process.env.PUBLIC_URL + "/image/bosses/Yog_Dzewa_gif.gif";
            }
            case BossesType.DWARF_KING: {
                return process.env.PUBLIC_URL + "/image/bosses/Dwarf_King_gif.gif";
            }
            default: {
                return process.env.PUBLIC_URL + "/image/bosses/DM300_gif.gif";
            }
        }
    }

    getName() {
        switch (this.type) {
            case BossesType.DM300: {
                return "DM300";
            }
            case BossesType.GOO: {
                return "Goo";
            }
            case BossesType.TENGU: {
                return "Tengu";
            }
            case BossesType.YOG_DZEWA: {
                return "Yog Dzewa";
            }
            case BossesType.DWARF_KING: {
                return "Dwarf King";
            }
            default: {
                return "DM300";
            }
        }
    }


    render() {
        return (<div
            className="GameCell BOSSES"
            id={this.row + "," + this.col}
            style={this.getParentStyles()}>
            <img src={this.getImageSrc()} className="imgBosses img-responsive" />
        </div>);
    }

}


export default Bosses;