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
    setPlayer
} from '../actions';
import {
    getRandomInt
} from '../data/Utils';
import Player, {
    PlayerEnum
} from './Player';
class App extends Component {

    constructor() {
        super();

        this.state = {
            ground: null,
            mapWithRoomAndHall: null
        };
    }

    generatePlayerInit = (treeWithRoomAndHall) => {
        var room1 = treeWithRoomAndHall.getLeafs()[0];
        var y = getRandomInt(room1.y, room1.y + room1.height);
        var x = getRandomInt(room1.x, room1.x + room1.width);

        var player = new Player(x, y, PlayerEnum.WARRIOR, 100);
        this.props.setPlayer(player);
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

        this.generatePlayerInit(treeWithRoomAndHall);
        this.props.setGround(ground);
        this.props.setMapWithRoomAndhall(treeWithRoomAndHall);

    }


    render() {

        //console.log("map BSPTree", map);

        return (
            <div className="App">
                <Toolsbar />
                <Game />
            </div>
        );
    }

}


export default connect(null,
    {
        setGround,
        setMapWithRoomAndhall,
        setPlayer
    })(App);