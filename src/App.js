import React, { Component } from 'react';
import Game from './components/Game';
import Map from './data/Map';

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
    componentDidMount(){
        var amap = new Map(50, 200, 40, 960);
        console.log("rooms", amap.rooms);
        this.drawRooms(amap);
    }
    render() {
        return (
            <div className="App">
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
