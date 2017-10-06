import { getRandomInt, distance } from './Utils';
import BSPTree from './BSPTree';
import randomColor from 'randomcolor';
import WallCell from './WallCell';
import HallCell from './HallCell';
import RoomCell from './RoomCell';
import _ from 'lodash';
/**
 * @param {*} x the initial coord normally set to zero
 * @param {*} y the intitial y coord normally set to zero
 * @param {*} dungeonWidth the width of dungeon
 * @param {*} dungeonHeight the height of dungeon
 * @param {*} minDungeonWidth the min width of child dungeon
 * @param {*} minDungeonHeight the min height of child dungeon
 * @param {*} mapWidth the width of games map (games)
 * @param {*} mapHeight the height of games maps
 * @description build the dungeon untill reach the min dungeonWidth and dungeonHeight
 */
export default function generateDungeonTreeForMap(x, y, dungeonWidth, dungeonHeight, minDungeonWidth, minDungeonHeight, mapWidth, mapHeight)
{
    var direction = getRandomInt(0, 1);

    var margin = dungeonWidth / 20;
    var margin = 0;
    if (dungeonWidth === mapWidth || dungeonWidth > dungeonHeight * 3)
    {
        direction = 0;
    }
    if (dungeonHeight === mapHeight || dungeonHeight > dungeonWidth * 3)
    {
        direction = 1;
    }
    // vertical
    if (direction === 0)
    {
        if (dungeonWidth < (minDungeonWidth * 2))
        {
            return new BSPTree(x + margin / 2 , y + margin / 2, dungeonWidth - margin, dungeonHeight - margin, null, null);
        }
        else {
            var coordXSplit = getRandomInt(x, x + dungeonWidth);
            var randomCount = 0;
            while (((coordXSplit - x ) < minDungeonWidth || (x + dungeonWidth - coordXSplit) < minDungeonWidth))
            {
                coordXSplit = getRandomInt(x, x + dungeonWidth);
                randomCount++;
                if (randomCount > 10)
                {
                    //debugger;
                }
            };
            var childLeftWidth = coordXSplit - x;
            var childLeft = generateDungeonTreeForMap(x, y, childLeftWidth, dungeonHeight, minDungeonWidth, minDungeonHeight, mapWidth, mapHeight);
            var childRight = generateDungeonTreeForMap(x + childLeftWidth, y, dungeonWidth - childLeftWidth, dungeonHeight, minDungeonWidth, minDungeonHeight, mapWidth, mapHeight);
            return new BSPTree(x, y, dungeonWidth, dungeonHeight, childLeft, childRight);
        }
    }
    else { // split horizontal
        if (dungeonHeight < (minDungeonHeight * 2))
        {
            return new BSPTree(x+ margin / 2, y + margin / 2, dungeonWidth - margin, dungeonHeight - margin, null, null);
        }
        else {
            var coordYSplit = getRandomInt(y, y + dungeonHeight);
            var randomCount = 0;

            while (((coordYSplit - y) < minDungeonHeight || (y + dungeonHeight - coordYSplit) < minDungeonHeight))
            {
                coordYSplit = getRandomInt(y, y + dungeonHeight);
                randomCount++;
                if (randomCount > 10)
                {
                    //debugger;
                }

            };

            var childTopHeight = coordYSplit - y;
            var childTop = generateDungeonTreeForMap(x, y, dungeonWidth, childTopHeight, minDungeonWidth, minDungeonHeight, mapWidth, mapHeight);
            var childBottom = generateDungeonTreeForMap(x, y + childTopHeight, dungeonWidth, dungeonHeight - childTopHeight, minDungeonWidth, minDungeonHeight, mapWidth, mapHeight);
            return new BSPTree(x, y, dungeonWidth, dungeonHeight, childTop, childBottom);
        }
    }
}

/**
 * 
 * @param {*} tree 
 * @param {*} minWidth 
 * @param {*} minHeight 
 * @description create hall for all room in the tree. A hall (or corridor) is 
 * to connect two room toghether
 */
export  function createWallFromBSPTree(tree, minWidth, minHeight)
{
    if (tree === null)
    {
        return null;
    }
    else if (tree instanceof BSPTree){

        if (tree.isLeaf())
        {
            var randomWidthIndex = getRandomInt(7, 9);
            var randomHeightIndex = getRandomInt(7, 9);
            var roomWidth = Math.floor(randomWidthIndex / 10 * tree.width);
            var roomHeight = Math.floor(randomHeightIndex / 10 * tree.height);
            var roomX = getRandomInt(tree.x, tree.x + tree.width - roomWidth);
            var roomY = getRandomInt(tree.y, tree.y + tree.height - roomHeight);
            return new BSPTree(roomX, roomY, roomWidth, roomHeight, null, null);

        }
        else {
            return new BSPTree(tree.x, tree.y, tree.width, tree.height, createWallFromBSPTree(tree.childLeft, minWidth, minHeight), createWallFromBSPTree(tree.childRight, minWidth, minHeight))
        }

    }
}


export  function createHallFromBSPTree(tree, hallSize)
{
    if (tree === null)
    {
        return null;
    }
    else if (tree instanceof BSPTree){

        if (tree.isLeaf())
        {
            return tree;
        }
        else {
            if (tree.childLeft !== null && tree.childLeft.isLeaf()
            && tree.childRight != null && tree.childRight.isLeaf()){
                var hallTree = createHallForBSPLeaf(tree.childLeft, tree.childRight, hallSize);
                tree.hall = hallTree;
                return tree;
            }
            else {
                tree.hall = bestHallForTwoTree(tree.childLeft, tree.childRight, hallSize);
                tree.childLeft = createHallFromBSPTree(tree.childLeft, hallSize);
                tree.childRight = createHallFromBSPTree(tree.childRight, hallSize);
                return tree;
            }
        }
    }
}


/**
 * 
 * @param {*} firstChild the left child 
 * @param {*} secondChild the right child
 * @param {*} hallSize the hall size the minimum sise of the hall.
 * @returns the shortest hall that connect two leaft of the tree.
 */
export function bestHallForTwoTree(firstChild, secondChild, hallSize)
{
    if (firstChild === null || secondChild === null) {
        return null;
    }
    var bestDistance = Number.MAX_SAFE_INTEGER;
    var bestLeaftOfFirstChild = null;
    var bestLeaftOfSecondChild = null;

    var leafsOfFirstChild = firstChild.getLeafs();

    var leafsOfSecondChild = secondChild.getLeafs();

    for (var indexFirstChild = 0; indexFirstChild < leafsOfFirstChild.length; indexFirstChild++)
    {
        for (var indexSecondChild = 0; indexSecondChild < leafsOfSecondChild.length; indexSecondChild++)
        {
            var distanceChild = distancebetweenBSPLeaf(leafsOfFirstChild[indexFirstChild], leafsOfSecondChild[indexSecondChild]);
            if (distanceChild < bestDistance)
            {
                bestDistance = distanceChild;
                bestLeaftOfFirstChild = leafsOfFirstChild[indexFirstChild];
                bestLeaftOfSecondChild = leafsOfSecondChild[indexSecondChild];
                console.log("bestLeaftOfFirstChild ", bestLeaftOfFirstChild);
                console.log("bestLeaftOfSecondChild ", bestLeaftOfSecondChild);
                console.log("bestDistance ", bestDistance);
            }
        }
    }
    return createHallForBSPLeaf(bestLeaftOfFirstChild, bestLeaftOfSecondChild, hallSize);

}

/**
 * @param {*} firstChild first leaft
 * @param {*} secondChild second leaft
 * return the distance between two leaf, if the leaf is not face to face, 
 * the distance is then maximum integer number.
 */
export function distancebetweenBSPLeaf(firstChild, secondChild)
{
    var x1 = firstChild.x;
    var y1 = firstChild.y;
    var x1b = x1 + firstChild.width;
    var y1b = y1 + firstChild.height;

    var x2 = secondChild.x;
    var y2 = secondChild.y;
    var x2b = x2 + secondChild.width;
    var y2b = y2 + secondChild.height;
    // secondChild is Right of firstChild
    var isRight = x1b < x2;
    // secondChild is Left of firstChild
    var isLeft= x2b < x1;
    // secondChild is on Top of firstChild
    var isTop = y2b < y1;
    // secondChild is on Bottom of firstChild
    var isBottom = y1b < y2;
    if (isTop && isLeft)
    {
        //return distance(x1, y1, x2b, y2b);
        return Number.MAX_SAFE_INTEGER;
    } else if (isTop && isRight)
    {
        //return distance(x1b, y1, x2, y2b);
        return Number.MAX_SAFE_INTEGER;

    } else if (isBottom && isLeft)
    {
        //return distance(x1, y1b, x2b, y2);
        return Number.MAX_SAFE_INTEGER;
    } else if (isBottom && isRight)
    {
        //return distance(x1b, y1b, x2, y2);
        return Number.MAX_SAFE_INTEGER;
    }
    else if (isLeft)
    {
        return (x1 - x2b);
    } else if (isRight)
    {
        return (x2 - x1b);
    }
    else if (isTop)
    {
        return (y1 - y2b);
    }
    else if (isBottom)
    {
        return (y2 - y1b);
    }
    return 0;
}

export function createHallForBSPLeaf(firstChild, secondChild, wallSize)
{
    var x1 = firstChild.x, y1 = firstChild.y;
    var x1b = x1 + firstChild.width, y1b = y1 + firstChild.height;
    var x2 = secondChild.x, y2 = secondChild.y;
    var x2b = x2 + secondChild.width, y2b = y2 + secondChild.height;
    // secondChild is Right of firstChild
    var isRight = x1b < x2;
    // secondChild is Left of firstChild
    var isLeft= x2b < x1;
    // secondChild is on Top of firstChild
    var isTop = y2b < y1;
    // secondChild is on Bottom of firstChild
    var isBottom = y1b < y2;
    var wallDistance = distancebetweenBSPLeaf(firstChild, secondChild);
    var hallTree = null;
    if (isTop && isLeft)
    {
        return null;
    } else if (isTop && isRight)
    {
        return null;
    }
    else if (isBottom && isLeft)
    {
        return null;
    }
    else if (isBottom && isRight)
    {
        return null;
    }
    else if (isLeft)
    {
        var hallX = x2b;
        var hallMinY = Math.max(y2, y1);
        var hallYB = Math.min(y2b, y1b) - wallSize;
        var hallY = getRandomInt(hallMinY, hallYB);
        hallTree = new BSPTree(hallX, hallY, wallDistance, wallSize, null, null);
    }
    else if (isRight)
    {
        var hallX = x1b;
        var hallMinY = Math.max(y1, y2);
        var hallYB = Math.min(y2b, y1b) - wallSize;
        var hallY = getRandomInt(hallMinY, hallYB);
        hallTree = new BSPTree(hallX, hallY, wallDistance, wallSize, null, null);
    }
    else if (isTop)
    {
        var hallX = Math.max(x1, x2);
        var hallMaxX = Math.min(x1b, x2b) - wallSize;
        hallX = getRandomInt(hallX, hallMaxX);
        var hallY = y2b;
        hallTree = new BSPTree(hallX, hallY, wallSize, wallDistance, null, null);
    }
    else if (isBottom)
    {
        var hallX = Math.max(x1, x2);
        var hallMaxX = Math.min(x1b, x2b) - wallSize;
        hallX = getRandomInt(hallX, hallMaxX);
        var hallY = y1b;
        hallTree = new BSPTree(hallX, hallY, wallSize, wallDistance, null, null);
    }

    return hallTree;
}

/**
 * @param {*} tree an bsp tree
 * @param {*} ctx context of 2d canvas
 * @param {*} color 
 * @param {*} fatherIndex 
 * draw the tree in the canvas
 */
export  function drawBSPTree(tree, ctx, color, fatherIndex)
{
    if (tree === null)
    {
        return;
    }
    else if (tree instanceof BSPTree){
        if (color === undefined)
        {
            color = randomColor();
        }
        if (fatherIndex === undefined) {
            fatherIndex = 1;
        }

        if (tree.isLeaf())
        {
            ctx.beginPath();
            ctx.rect(tree.x, tree.y, tree.width, tree.height);
            ctx.fillStyle = color;

            ctx.fill();
            ctx.font = "20px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(fatherIndex, tree.x + tree.width / 2 , tree.y + tree.height / 2 );
            //ctx.fillText("(" +awall.indexRow +"," + awall.indexCol + ")",awall.x1 + awall.width / 10 , awall.y1 + awall.height / 2 );
            ctx.closePath();
        }
        else {
            var childColor = randomColor();
            drawBSPTree(tree.childLeft, ctx, childColor, fatherIndex + 1);
            drawBSPTree(tree.childRight, ctx, childColor, fatherIndex + 1);
            if (tree.hall !== undefined && tree.hall !== null)
            {
                drawBSPTree(tree.hall, ctx, "black", fatherIndex + 1);
            }
        }
    }
}


/**
 * @param {*} tree an bsp tree
 * draw the tree in the canvas
 */
export  function generateGroundFromTree(tree)
{
    if (tree === null)
    {
        return null;
    }
    else if (tree instanceof BSPTree){
        var matrix = new Array(tree.width);
        for (var i = 0; i < tree.width; i++) {
            matrix[i] = new Array(tree.height);
            for (var j = 0; j < tree.height; j++) {
                matrix[i][j] = new WallCell(i, j);
            }
        }

        var leafs = tree.getLeafs();
        for (var leafIndex = 0; leafIndex < leafs.length; leafIndex++)
        {
            var leaf = leafs[leafIndex];
            for (var coordLeafX = leaf.x; coordLeafX < leaf.x + leaf.width; coordLeafX++)
            {
                for (var coordLeafY = leaf.y; coordLeafY < leaf.y + leaf.height; coordLeafY++)
                {
                    matrix[coordLeafX][coordLeafY] = new RoomCell(coordLeafX, coordLeafY, leafIndex);
                }
            }
        }

        var halls = tree.getHalls();
        for (var hallIndex = 0; hallIndex < halls.length; hallIndex++)
        {
            var hall = halls[hallIndex];
            for (var coordHallX = hall.x; coordHallX < hall.x + hall.width; coordHallX++)
            {
                for (var coordHallY = hall.y; coordHallY < hall.y + hall.height; coordHallY++)
                {
                    matrix[coordHallX][coordHallY] = new HallCell(coordHallX, coordHallY, hallIndex);
                }
            }
        }
        

        return _.unzip(matrix);
    }
    return null;
}


export function testHallDistanceForWall()
{

        var treeLevel1ChildLeft = new BSPTree(0, 0, 960, 531, null, null);
        var treeLevel1ChildRight = new BSPTree(0, 531, 960, 429, null, null);

        var treeLeafLeftLeft = new BSPTree(43, 121, 430, 371, null, null);
        var treeLeafLeftRight = new BSPTree(559, 13, 337, 477, null, null);

        treeLevel1ChildLeft.childLeft = treeLeafLeftLeft;
        treeLevel1ChildLeft.childRight = treeLeafLeftRight;

        var treeLeaftRightLeft = new BSPTree(60, 551, 367, 343, null, null);
        var treeLeaftRightRight = new BSPTree(478, 543, 400, 343, null, null);

        treeLevel1ChildRight.childLeft = treeLeaftRightLeft;
        treeLevel1ChildRight.childRight = treeLeaftRightRight;

        var hall = bestHallForTwoTree(treeLevel1ChildLeft, treeLevel1ChildRight, 10);
        console.log("best hall ", hall);
}
