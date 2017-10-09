"use strict";
import Cell from './Cell';
import React, { Component } from 'react';

class RoomCell extends Cell {
    /**
     * @param {*} row 
     * @param {*} col 
     * @param {*} roomIndex 
     */
    constructor(row, col, roomIndex) {
        super(row, col);
        this.roomIndex = roomIndex;
    }

    render() {
        switch (this.roomIndex) {
            case 0:
                return <div className="GameCell Room_1"></div>;
            case 1:
                return <div className="GameCell Room_2"></div>;
            case 2:
                return <div className="GameCell Room_3"></div>;
            default:
                return <div className="GameCell Room_4"></div>;
        }
    }
}
export default RoomCell;