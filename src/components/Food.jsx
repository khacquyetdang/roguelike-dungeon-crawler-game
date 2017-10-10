import React from 'react';
import Cell from '../data/Cell';

export const FoodEnum = {
    BREAD: 1,
    CHEESE: 2,
    MEAT: 3
};

const styles = {
    bread: {
        backgroundImage: "url(" + process.env.PUBLIC_URL + "/image/food/bread.png" + ")",
    },
    cheese: {
        backgroundImage: "url(" + process.env.PUBLIC_URL + "/image/food/cheese.png" + ")",
    },
    meat: {
        backgroundImage: "url(" + process.env.PUBLIC_URL + "/image/food/meat.png" + ")",
    },
}
class Food extends Cell {
    /**
     * 
     * @param {*} x coord x on the table 
     * @param {*} y 
     * @param {*} type must be FoodEnum
     */
    constructor(row, col, type = FoodEnum.BREAD) {
        super(row, col);
        this.type = type;
    }

    getStyles = () => {
        switch (this.type) {
            case FoodEnum.BREAD: {
                return styles.bread;
            }
            case FoodEnum.CHEESE: {
                return styles.cheese;
            }
            case FoodEnum.MEAT: {
                return styles.meat;
            }
            default: {
                return styles.bread;
            }
        }
    }

    getImageSrc = () => {
        switch (this.type) {
            case FoodEnum.BREAD: {
                return process.env.PUBLIC_URL + "/image/food/bread.png";
            }
            case FoodEnum.CHEESE: {
                return process.env.PUBLIC_URL + "/image/food/cheese.png";
            }
            case FoodEnum.MEAT: {
                return process.env.PUBLIC_URL + "/image/food/meat.png";
            }
            default: {
                return process.env.PUBLIC_URL + "/image/food/bread.png";
            }
        }
    }

    getParentStyles = () => {
        if (this.parent !== undefined && this.parent !== null) {
            return this.parent.getStyle();
        }
        return {};
    }

    render() {
        return (<div
            className="GameCell"
            id={this.row + "," + this.col}
            style={this.getParentStyles()}>
            <img src={this.getImageSrc()} className="imgFood img-responsive" />
        </div>);
    }
}

export default Food;