"use strict";
import Cell from './Cell';
import React, { Component } from 'react';


class HallCell extends Cell {
    /**
     * @param {*} row 
     * @param {*} col 
     * @param {*} hallIndex 
     */
    constructor(row, col, hallIndex) {
        super(row, col);
        this.hallIndex = hallIndex;
    }

    getStyle = () =>  {
        return styles;
    }
    render() {
        return (
            <div
                className="GameCell"
                style={styles}>
            </div>
        );
    }
}

const styles = {
        backgroundImage: "url(" +"/image/hall.png" +")",    
}
export default HallCell;