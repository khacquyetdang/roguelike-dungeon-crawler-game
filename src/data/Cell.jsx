"use strict";
class Cell {
    /**
     * 
     * @param {*} row 
     * @param {*} col
     * @description in the games we transpose the matrix so row become col and col became row 
     */
    constructor(row, col) {
        
        this.row = col;
        this.col = row;
        this.child = null;
    }
    
    
}

export default Cell;
