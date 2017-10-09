import Cell from './data/Cell';
const PlayerEnum = {
    WARRIOR: 1,
    GLADIATOR: 2,
    BERSERKER: 3,
    MAGE: 4
};
class Player extends Cell {
    /**
     * @param {number} row 
     * @param {number} col 
     * @param {PlayerEnum} type 
     * @param {number} health 
     */
    constructor(row, col, type, health) {
        super(row, col);
        this.type = type;
    }

    render() {
        return (<div
            className="GameCell Hall">
        </div>)
    }

    moveLeft() {
        if (this.col >= 0) {
            this.col = this.col - 1;
        }
    }

    moveRight() {
        this.col = this.col + 1;
    }

    moveTop() {
        if (this.row >= 0) {
            this.row = this.row - 1;
        }
    }
    moveBottom() {
        this.row = this.row + 1;
    }
}