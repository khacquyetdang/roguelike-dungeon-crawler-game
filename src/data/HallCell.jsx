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

    render() {
        return (
            <div
                className="GameCell Hall">
            </div>
        );
    }
}
export default HallCell;