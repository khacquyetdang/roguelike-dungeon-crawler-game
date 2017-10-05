import { createHallFromBSPTree, bestHallForTwoTree } from './BSPDungeon';
import BSPTree from './BSPTree';

it('generate Hall for 2 Level Tree correctly', () => {
    var treeLevel1 = new BSPTree(0, 0, 960, 960, null, null);
    var treeLevel1ChildLeft = new BSPTree(0, 0, 960, 531, null, null);
    var treeLevel1ChildRight = new BSPTree(0, 531, 960, 429, null, null);
    treeLevel1.childLeft = treeLevel1ChildLeft;
    treeLevel1.childRight = treeLevel1ChildRight;

    var treeLeafLeftLeft = new BSPTree(43, 121, 430, 371, null, null);
    var treeLeafLeftRight = new BSPTree(559, 13, 337, 477, null, null);

    treeLevel1ChildLeft.childLeft = treeLeafLeftLeft;
    treeLevel1ChildLeft.childRight = treeLeafLeftRight;

    var treeLeaftRightLeft = new BSPTree(60, 551, 367, 343, null, null);
    var treeLeaftRightRight = new BSPTree(478, 543, 400, 343, null, null);

    treeLevel1ChildRight.childLeft = treeLeaftRightLeft;
    treeLevel1ChildRight.childRight = treeLeaftRightRight;
    //console.log("tree ", treeLevel1);

    //var treeLevel1WithHall = createHallFromBSPTree(treeLevel1, 10);
    //console.log("tree will hall ", treeLevel1WithHall.hall);

    expect(treeLevel1 != null).toBe(true);
});

it('must give the best hall for two child', () => {
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

    var hall = bestHallForTwoTree(treeLeafLeftLeft, treeLeafLeftRight, 10);
    console.log("best hall ", hall);

    expect(hall != null).toBe(true);
});
