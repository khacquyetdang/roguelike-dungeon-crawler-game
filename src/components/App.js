import React, {
    Component
} from 'react';
import { connect } from 'react-redux';
import Toolsbar from './Toolsbar';
import Game from './Game';
import Map from '../data/Map';

import Maze from '../data/Maze';
import {
    drawBSPTree,
    createWallFromBSPTree,
    createHallFromBSPTree,
    testHallDistanceForWall,
    generateGroundFromTree
} from '../data/BSPDungeon';
import generateDungeonTreeForMap from '../data/BSPDungeon';
import '../generated/components/styles/App.css';


import {setMapwithroomandhall, setGround } from '../actions';

class App extends Component {

    constructor() {
        super();

        this.state = {
            ground: null
        };
    }
    componentDidMount() {

        var minWidth = 15;
        var minHeight = 15;
        var mapSizeWidth = 100;
        var mapSizeHeight = 100;
        var map = generateDungeonTreeForMap(0, 0, mapSizeWidth, mapSizeHeight, minWidth, minHeight, mapSizeWidth, mapSizeHeight);

        //this.gameCanvas
        console.log("mapbsp ", map);
        var treeRoom = createWallFromBSPTree(map, minWidth / 2, minHeight / 2);

        var treeWithRoomAndHall = createHallFromBSPTree(treeRoom, 10);

        var ground = generateGroundFromTree(treeWithRoomAndHall);

        

        this.setState({
            mapWithRoomAndHall: treeWithRoomAndHall,
            ground: ground,
            groundWidth: mapSizeWidth,
            groundHeight: mapSizeHeight
        });
    }


    render() {

        //console.log("map BSPTree", map);
        return (<div className="App">
            <Toolsbar />
            <Game
                ground={
                    this.state.ground
                }
                mapWithRoomAndHall={
                    this.state.mapWithRoomAndHall
                }
            >
            </Game>
        </div>
        );
    }
   
}


export default App;