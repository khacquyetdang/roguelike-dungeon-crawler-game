import React, { Component } from 'react';
import Cell from './Cell';
import '../generated/components/styles/Games.css';




class Game extends Component {

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getRandomCell() {
        var x = this.getRandomInt(0, this.size - 1);
        var y = this.getRandomInt(0, this.size - 1);
        return this.result[x][y];
    }

    getNeighbourCells(cell)
    {
        var neighbourCells = [];
        var coordNeighBors = [[cell.x - 1, cell.y ], [cell.x, cell.y-1], [cell.x + 1, cell.y], [cell.x, cell.y + 1]];
        for (var indexNeighBour = 0; indexNeighBour < coordNeighBors.length; indexNeighBour++)
        {
            var coordCellNeighBour = coordNeighBors[indexNeighBour];
            var coordX = coordCellNeighBour[0];
            var coordY = coordCellNeighBour[1];
            if (coordX >= 0 && coordX < this.size && coordY >= 0 && coordY < this.size)
            {
                neighbourCells.push[this.map[coordX][coordY]];
            }
        }
        return neighbourCells;
    }
    generateEmptyMap = (size) => {
        var result = new Array(size * size);
        for (var index = 0; index < size * size; index++) {
            var indexRow = index / size;
            var indexCol = index % size;
            result[index] = new Cell(indexRow, indexCol);
        }
        this.size = size;
        this.map = result;

        return result;
    }

    mapTo2dArray = () => {
        var size = this.size;
        var result = new Array(size);
        for (var index = 0; index < size * size; index++) {
            var indexRow = Math.floor(index / size);
            var indexCol = index % size;
            if (indexCol === 0)
            {
                result[indexRow] = new Array(size);
            }
            result[indexRow][indexCol] = this.map[index];
        }
        return result;
    }

    generateRandomMap = () => {
        var current = this.getRandomCell();
        var lastCell = current;
        var firstCell = current;

        current.connected = true;

        while (true)
        {
            var neighbourCells = this.getNeighbourCells(current);
            var unconnectedNeighbor = neighbourCells.filter(function(neighbourCell)
            {
                return neighbourCell.connected === false;
            });

            if (unconnectedNeighbor.length === 0)
            {
                break;
            }
            var neighBor = unconnectedNeighbor[this.getRandomInt(0, unconnectedNeighbor.length)];
            current.connect(neighBor);

            current = neighBor;
            lastCell = neighBor;
        }

        // 4. While there are unconnected cells:
        while (this.map.filter(function(cell) { return cell.connected === false}).length > 0)
        {
            // 4a. Pick a random connected cell with unconnected neighbors and connect to one of them.
            var candidates = [];
            for (var cellIndex =  0; cellIndex < this.map.filter(function(cell) { return cell.connected}).length; cellIndex++)
            {
                var cell = this.map[cellIndex];
                var neighbors = this.getNeighborCells(cell).filter(cellNeighbor => {return cellNeighbor.connected === false});
                if (neighbors.length === 0)
                {
                    continue;
                }
                candidates.append((cell, neighbors));
            }
            //cell, neighbors = random.choice(candidates)
            //cell.connect(random.choice(neighbors))
        }
    }

    render() {
        var gameMap = this.generateEmptyMap(50);

        var game2DArr = this.mapTo2dArray();
        var gameMapDiv = game2DArr.map((row, indexRow) =>{
            var divRow = row.map((cell, indexCell) => {
                if (this.getRandomInt(1, 5) === 1)
                {
                    return <div key={indexCell}className="GameCell Wall"></div>
                }
                else {
                    return <div key={indexCell}className="GameCell Ground"></div>

                }
            });
            return <div key={indexRow} className="GameRow">{divRow}</div>
        });
        return (
            <div>Hello world
                <div className="gameMap">
                    {gameMapDiv}
                </div>
            </div>
        )
    }
}

export default Game;
