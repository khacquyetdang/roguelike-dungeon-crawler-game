import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';
import Toolsbar from './Toolsbar';
import Game from './Game';
import Map from '../data/Map';

import Maze from '../data/Maze';
import {
    drawBSPTree,
    createRoomFromBSPTree,
    createHallFromBSPTree,
    testHallDistanceForWall,
    generateGroundFromTree
} from '../data/BSPDungeon';
import generateDungeonTreeForMap from '../data/BSPDungeon';
import '../generated/components/styles/App.css';
import {
    setMapWithRoomAndhall,
    setGround,
    setPlayer,
    setFoods,
    setItems
} from '../actions';
import {
    getRandomInt
} from '../data/Utils';
import Player, {
    PlayerEnum
} from './Player';


import Food, { FoodEnum } from './Food';
import Monster, { MonsterEnum } from './Monster';

class App extends Component {

    constructor() {
        super();

        this.state = {
            ground: null,
            mapWithRoomAndHall: null
        };
    }

    generatePlayerInit = () => {
        var room1 = this.treeWithRoomAndHall.getLeafs()[0];
        var y = getRandomInt(room1.y, room1.y + room1.height - 1);
        var x = getRandomInt(room1.x, room1.x + room1.width - 1);

        var player = new Player(x, y, PlayerEnum.WARRIOR, 100);
        this.player = player;
        this.props.setPlayer(player);
    }


    /**
     * @description 
     * each room will one to 3 food
     */
    generateGameItems = () => {
        var items = [];
        const checkPositionForItem = (x, y) => {
            for (var indexItem = 0; indexItem < items.length; indexItem++) {
                var item = items[indexItem];
                if ((item.row === x && item.col === y)
                    || (this.player.row === x && this.player.col === y)) {
                    return true;
                }
            }
            return false;
        }
        var foodItems = [];
        var monsterItems = [];
        for (var roomIndex = 0; roomIndex < this.treeWithRoomAndHall.getLeafs().length - 1; roomIndex++) {
            // for debug
            //for (var roomIndex = 0; roomIndex < 1; roomIndex++) {

            // each room wi
            var foodMaxItemForRoom = getRandomInt(1, 3);
            var room = this.treeWithRoomAndHall.getLeafs()[roomIndex];
            for (var indexFood = 0; indexFood < foodMaxItemForRoom; indexFood++) {
                var foodKind = getRandomInt(1, 3);
                var foodY = getRandomInt(room.y, room.y + room.height - 1);
                var foodX = getRandomInt(room.x, room.x + room.width - 1);
                while (checkPositionForItem(foodX, foodY)) {
                    foodY = getRandomInt(room.y, room.y + room.height - 1);
                    foodX = getRandomInt(room.x, room.x + room.width - 1);
                }
                var foodType = getRandomInt(FoodEnum.BREAD, FoodEnum.MEAT);

                var food = new Food(foodX, foodY, foodType);
                foodItems.push(food);
                items.push(food);
            }

            var monsterMaxItemForRoom = getRandomInt(0, 2);
            
            for (var indexMonster = 0; indexMonster < monsterMaxItemForRoom; indexMonster++) {
                var monsterY = getRandomInt(room.y, room.y + room.height - 1);
                var monsterX = getRandomInt(room.x, room.x + room.width - 1);
                while (checkPositionForItem(monsterX, monsterY)) {
                    monsterY = getRandomInt(room.y, room.y + room.height - 1);
                    monsterX = getRandomInt(room.x, room.x + room.width - 1);
                }
                var monsterType = getRandomInt(MonsterEnum.RAT, MonsterEnum.CRAB);

                var monster = new Monster(monsterX, monsterY, monsterType);
                monsterItems.push(monster);
                items.push(monster);
            }

        }
        this.props.setFoods(foodItems);
        this.props.setItems(items);
    }

    componentDidMount() {

        var minWidth = 15;
        var minHeight = 15;
        var mapSizeWidth = 50;
        var mapSizeHeight = 50;
        var map = generateDungeonTreeForMap(0, 0, mapSizeWidth, mapSizeHeight, minWidth, minHeight, mapSizeWidth, mapSizeHeight);

        //this.gameCanvas
        console.log("mapbsp ", map);
        var treeRoom = createRoomFromBSPTree(map, minWidth / 2, minHeight / 2);

        var treeWithRoomAndHall = createHallFromBSPTree(treeRoom, 10);

        var ground = generateGroundFromTree(treeWithRoomAndHall);


        this.setState({
            mapWithRoomAndHall: treeWithRoomAndHall,
            ground: ground,
            groundWidth: mapSizeWidth,
            groundHeight: mapSizeHeight
        });

        this.treeWithRoomAndHall = treeWithRoomAndHall;
        this.generatePlayerInit();
        this.generateGameItems();
        this.props.setGround(ground);
        this.props.setMapWithRoomAndhall(treeWithRoomAndHall);

    }


    render() {

        //console.log("map BSPTree", map);

        return (
            <div className="App">
                <Toolsbar />
                <Game ref="games" />
            </div>
        );
    }

}


export default connect(null,
    {
        setGround,
        setMapWithRoomAndhall,
        setPlayer,
        setFoods,
        setItems
    }
)(App);