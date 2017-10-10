import Cell from '../data/Cell';
import React from 'react';

export const MonsterEnum = {
    RAT : 1,
    CRAB : 2
};
class Monster extends Cell {
    /**
     * 
     * @param {*} x coord x on the table 
     * @param {*} y 
     * @param {*} type must be Monster enum
     */
    constructor(row, col, type = MonsterEnum.RAT) {
        super(row, col);
        this.type = type;
    }

    getParentStyles = () => {
        if (this.parent !== undefined && this.parent !== null) {
            return this.parent.getStyle();
        }
        return {};
    }


    getImageSrc = () => {
        switch (this.type) {
            case MonsterEnum.RAT: {
                return process.env.PUBLIC_URL + "/image/monster/albino_rat_gif.gif";
            }
            case MonsterEnum.CRAB: {
                return process.env.PUBLIC_URL + "/image/monster/sewer_crab_gif.gif";
            }
            default: {
                return process.env.PUBLIC_URL + "/image/monster/albino_rat_gif.gif";              
            }
        }
    }

    render() {
        return (<div
            className="GameCell Monster"
            id={this.row + "," + this.col}
            style={this.getParentStyles()}>
            <img src={this.getImageSrc()} className="imgMonster img-responsive" />
        </div>);
    }


}


export default Monster;