import React, { Component } from 'react';
import Game from './components/Game';
import Map from './data/Map';

import Maze from './data/Maze';

import './App.css';

class App extends Component {


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
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();


        for (var indexRoomRow = 0; indexRoomRow < maze.rooms.length; indexRoomRow++)
        {
            for (var indexRoomCol = 0; indexRoomCol < maze.rooms[indexRoomRow].length; indexRoomCol++)
            {
                var aroom = maze.rooms[indexRoomRow][indexRoomCol];
                ctx.beginPath();
                ctx.rect(aroom.x1, aroom.y1, aroom.width, aroom.height);
                ctx.fillStyle = "blue";
                ctx.fill();
                ctx.closePath();
            }
        }

        for (var indexWallRow = 0; indexWallRow < maze.walls.length; indexWallRow++)
        {
            for (var indexWallCol = 0; indexWallCol < maze.walls[indexWallRow].length; indexWallCol++)
            {
                var awall = maze.walls[indexWallRow][indexWallCol];
                console.log("awall", awall);
                if (awall.visible === true)
                {
                    ctx.beginPath();
                    ctx.rect(awall.x1, awall.y1, awall.width, awall.height);
                    ctx.fillStyle = "gray";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
    componentDidMount(){
        var amap = new Map(30, 100, 2000, 960);
        console.log("rooms", amap.rooms);
        this.drawRooms(amap);
        this.drawCorridors(amap);

        //constructor(roomSize, wallWidth, roomRow, roomCol, map_size)
        var maze = new Maze(20, 5, 10, 10, 800);
        console.log("maze : ", maze);
        this.drawMaze(maze);
    }
    render() {
        return (
            <div className="App">
                <div className="canvasContainer">
                    <canvas id="canvasMaze"
                        style={{margin : 10}}
                        width='960px' height='960px'
                        ref={(camaze) => { this.canvasMaze = camaze}}>
                    </canvas>
                </div>

                <div className="canvasContainer">
                    <canvas id="myCanvas"
                        width='960px' height='960px'
                        ref={(ca) => { this.gameCanvas = ca}}>
                    </canvas>
                </div>
                {
                //<Game ></Game>
                }
            </div>
        );
    }
}

export default App;
