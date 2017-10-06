"use strict";
import Cell from './Cell';

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
}
export default RoomCell;