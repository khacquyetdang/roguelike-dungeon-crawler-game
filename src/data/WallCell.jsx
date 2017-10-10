"use strict";
import Cell from './Cell';
import React, { Component } from 'react';

class WallCell extends Cell {
    /**
     * @param {*} row 
     * @param {*} col 
     */
    constructor(row, col) {
        super(row, col);
    }

    getStyle = () =>  {
        return styles;
    }
    render() {
        return (<div
            className="GameCell"
            style={styles}>
        </div>);
    }
}
const styles = {
    backgroundImage: "url(" + process.env.PUBLIC_URL +"/image/wall_1.png)",
}
export default WallCell;