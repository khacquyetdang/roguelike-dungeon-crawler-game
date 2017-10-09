/**
 * @description the structure to build random room using Binary space partitioning
 * https://en.wikipedia.org/wiki/Binary_space_partitioning
 */
class BSPTree {
    /**
     * 
     * @param {*} x 
     * @param {*} y 
     * @param {*} width 
     * @param {*} height 
     * @param {*} childLeft 
     * @param {*} childRight 
     */
    constructor(x, y, width, height, childLeft, childRight) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.childLeft = childLeft;
        this.childRight = childRight;
    }

    /**
     * @description return all the leafs of the the tree in an array
     * leaf is the same than the room
     */
    getLeafs = () => {
        if (this.isLeaf()) {
            return [this];
        }
        else {
            var childLeft = this.childLeft;
            var childRight = this.childRight;
            var leafs = [];
            if (childLeft !== null) {
                leafs = leafs.concat(childLeft.getLeafs());
            }
            if (childRight !== null) {
                leafs = leafs.concat(childRight.getLeafs());
            }
            return leafs;
        }
    }

    /**
 * @description return all the leafs of the the tree in an array
 */
    getHalls = () => {
        if (this === null)
        {
            return [];
        }
        if (this.isLeaf()) {
            if (this.hall !== undefined && this.hall !== null) {
                return [this.hall];
            }
            return [];
        }
        else {
            var childLeft = this.childLeft;
            var childRight = this.childRight;
            var halls = [];
            if (this.hall !== undefined && this.hall !== null) {
                halls.push(this.hall);
            }
            if (childLeft !== null) {
                halls =  halls.concat(childLeft.getHalls());
            }
            if (childRight !== null) {
                halls = halls.concat(childRight.getHalls());
            }
            return halls;
        }
    }
    /**
     * @description check if the tree is leaf, it means no child left no child right
     */
    isLeaf = () => {
        return this.childRight === null && this.childLeft === null;
    }
}

export default BSPTree;
