class BSPTree {
    constructor(x, y, width, height, childLeft, childRight)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.childLeft = childLeft;
        this.childRight = childRight;
    }

    getLeafs = () => {
        if (this.isLeaf())
        {
            return [this];
        }
        else {
            var childLeft = this.childLeft;
            var childRight = this.childRight;
            var leafs = [];
            if (childLeft !== null)
            {
                leafs = leafs.concat(childLeft.getLeafs());
            }
            if (childRight !== null)
            {
                leafs= leafs.concat(childRight.getLeafs());
            }
            return leafs;
        }
    }

    isLeaf = () => {
        return this.childRight === null && this.childLeft === null;
    }
}

export default BSPTree;
