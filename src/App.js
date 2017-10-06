import React, { Component } from 'react';
import Game from './components/Game';
import Map from './data/Map';

import Maze from './data/Maze';
import { drawBSPTree, createWallFromBSPTree, createHallFromBSPTree, testHallDistanceForWall, generateGroundFromTree} from './data/BSPDungeon';
import generateDungeonTreeForMap from './data/BSPDungeon';
import './App.css';

class App extends Component {

    constructor() {
        super();

        this.state = { ground : null };
    }
    drawRooms = (amap) => {
        var ctx = this.gameCanvas.getContext('2d');
        ctx.beginPath();
        ctx.rect(0, 0, amap.map_size + 1 , amap.map_size + 1);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();

        for (var indexRoom = 0; indexRoom < amap.rooms.length; indexRoom++)
        {
            var aroom = amap.rooms[indexRoom];
            ctx.beginPath();
            ctx.rect(aroom.x1, aroom.y1, aroom.width, aroom.height);
            ctx.fillStyle = "blue";
            ctx.fill();
            ctx.fillStyle = "black";
            ctx.fillRect(aroom.x1,aroom.y1,2,2);
            ctx.fillRect(aroom.x2,aroom.y2,2,2);
            ctx.closePath();
        }
    }

    drawCorridors = (amap) => {
        var ctx = this.gameCanvas.getContext('2d');


        for (var indexRoom = 0; indexRoom < amap.rooms.length - 1; indexRoom++)
        {
            var currentRoom = amap.rooms[indexRoom];
            var centerCurrentX = currentRoom.centerX;
            var centerCurrentY = currentRoom.centerY;

            var nextRoom = amap.rooms[indexRoom + 1];
            var centerNextX = nextRoom.centerX;
            var centerNextY = nextRoom.centerY;


            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.strokeStyle = "green";
            ctx.moveTo(centerCurrentX, centerCurrentY);
            ctx.lineTo(centerNextX,centerCurrentY);
            ctx.lineTo(centerNextX,centerNextY);
            ctx.stroke();
            ctx.closePath();
        }
    }


    drawMaze = (maze) => {
        var ctx = this.canvasMaze.getContext('2d');

        ctx.beginPath();
        ctx.rect(0, 0, maze.map_size + 1 , maze.map_size + 1);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
        var textColor = "black";

        for (var indexRoomRow = 0; indexRoomRow < maze.rooms.length; indexRoomRow++)
        {
            for (var indexRoomCol = 0; indexRoomCol < maze.rooms[indexRoomRow].length; indexRoomCol++)
            {
                var aroom = maze.rooms[indexRoomRow][indexRoomCol];
                ctx.beginPath();
                ctx.rect(aroom.x1+ 1, aroom.y1+ 1, aroom.width - 1, aroom.height - 1);
                ctx.fillStyle = "#E5E8E8";
                ctx.fill();
                ctx.font = "10px Arial";
                ctx.fillStyle = textColor;
                //ctx.fillText("(" +aroom.indexRow +"," + aroom.indexCol + ")",aroom.x1 + + aroom.width / 4 , aroom.centerY);
                ctx.closePath();
            }
        }

        for (var indexWallRow = 0; indexWallRow < maze.walls.length; indexWallRow++)
        {
            for (var indexWallCol = 0; indexWallCol < maze.walls[indexWallRow].length; indexWallCol++)
            {
                var awall = maze.walls[indexWallRow][indexWallCol];
                if (awall.visible === true)
                {
                    ctx.beginPath();
                    ctx.rect(awall.x1, awall.y1, awall.width, awall.height);
                    ctx.fillStyle = "#F1C40F";
                    ctx.fill();
                    ctx.font = "10px Arial";
                    ctx.fillStyle = textColor;
                    //ctx.fillText("(" +awall.indexRow +"," + awall.indexCol + ")",awall.x1 + awall.width / 10 , awall.y1 + awall.height / 2 );
                    ctx.closePath();
                }
            }
        }
    }


    componentDidMount() {
        /*
        var amap = new Map(30, 100, 2000, 960);
        console.log("rooms", amap.rooms);
        //this.drawRooms(amap);
        //this.drawCorridors(amap);

        //constructor(roomSize, wallWidth, map_size)
        //var maze = new Maze(30, 30, 900);
        console.log("maze : ", maze);
        this.drawMaze(maze);*/

        testHallDistanceForWall();
        var minWidth = 20;
        var minHeight = 20;
        var mapSize = 1000;
        var mapSizeHeight = 1000;
        var map = generateDungeonTreeForMap(0, 0, mapSize, mapSizeHeight, minWidth, minHeight, mapSize, mapSize);
        drawBSPTree(map, this.gameCanvas.getContext('2d'), 0);

        //this.gameCanvas
        console.log("mapbsp ", map);
        var treeRoom = createWallFromBSPTree(map, minWidth / 2, minHeight / 2);

        var treeWithRoomAndHall = createHallFromBSPTree(treeRoom, 10);

        drawBSPTree(treeWithRoomAndHall, this.canvasMaze.getContext('2d'), 0);

        var ground = generateGroundFromTree(treeWithRoomAndHall);
        this.setState({ ground : ground});
    }

    render() {

        //console.log("map BSPTree", map);
        return (
            <div className="App" >
                {

                <div className="canvasContainer">
                    <canvas id="myCanvas"
                        width='100px' height='100px'
                        ref={(ca) => { this.gameCanvas = ca}}>
                    </canvas>
                </div>
                }

                <div className="canvasContainer">
                    <canvas id="canvasMaze"
                        style={{margin : 10}}
                        width='100px' height='100px'
                        ref={(camaze) => { this.canvasMaze = camaze}}>
                    </canvas>
                </div>
                {
                <Game ground={this.state.ground}></Game>
                }
            </div>
        );
    }
}

export default App;
