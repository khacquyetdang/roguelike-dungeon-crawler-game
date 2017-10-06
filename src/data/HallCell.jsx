"use strict";
import Cell from './Cell';

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
}
export default HallCell;