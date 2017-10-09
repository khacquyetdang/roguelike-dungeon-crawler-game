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

    render() {
        return (<div
            className="GameCell Wall">
        </div>);
    }
}
export default WallCell;