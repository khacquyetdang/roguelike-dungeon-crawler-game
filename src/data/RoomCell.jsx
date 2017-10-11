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
        this.child = null;
    }

    getStyle = () => {
        switch (this.roomIndex) {
            case 0:
                return styles.Room_1;
            case 1:
                return styles.Room_2;
            case 2:
                return styles.Room_3;
            default:
                return styles.Room_4;
        }
    }
    render() {
        return <div className="GameCell" style={this.getStyle()}></div>;
    }
}

const styles = {
    Room_1: {
        backgroundImage: "url(" + process.env.PUBLIC_URL + "/image/room_1.png)",
    },
    Room_2: {
        backgroundImage: "url(" + process.env.PUBLIC_URL + "/image/room_2.png)",
    },

    Room_3: {
        backgroundImage: "url(" + process.env.PUBLIC_URL + "/image/room_3.png)",
    },

    Room_4: {
        backgroundImage: "url(" + process.env.PUBLIC_URL + "/image/room_4.png)",
    }
}
export default RoomCell;

