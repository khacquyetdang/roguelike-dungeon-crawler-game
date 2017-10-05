import RoomMaze from './RoomMaze';
import Wall from './Wall';
import { getRandomInt } from './Utils';

class Maze {
    constructor(roomSize, wallWidth, map_size)
    {
        this.map_size = map_size;
        this.roomSize = roomSize;
        this.wallWidth = wallWidth;
        this.roomRow = Math.floor((map_size ) / (roomSize + wallWidth));
        this.roomCol = Math.floor((map_size) / (roomSize +  wallWidth));
        this.generateMapMatrix();
        this.generateMaze();
        //this.generateDeadEnd();
    }




    generateMapMatrix = () => {
        this.rooms  = new Array();
        this.walls  = new Array();

        for (var indexRow = 0; indexRow < this.roomRow; indexRow++)
        {
            var roomRows = new Array();
            var wallsRows = new Array();

            for (var indexCol = 0; indexCol < this.roomCol; indexCol++)
            {
                var wallX = indexCol * (this.roomSize + this.wallWidth);
                var wallY = indexRow * (this.roomSize + this.wallWidth);
                var wallVertical = new Wall(indexRow, 2 * indexCol, wallX, wallY, this.wallWidth, this.roomSize + this.wallWidth);

                wallsRows.push(wallVertical);

                var roomX = wallX + this.wallWidth;
                var roomY = wallY;
                var newRoom = new RoomMaze(indexRow, indexCol, roomX, roomY, this.roomSize , this.roomSize);
                //constructor Wall(x, y, width, height)
                // vertical wall
                roomRows.push(newRoom);
                var wallHorizontal = new Wall(indexRow, 2 * indexCol + 1, wallX + this.wallWidth, roomY + this.roomSize, this.roomSize + this.wallWidth, this.wallWidth);
                wallsRows.push(wallHorizontal);
            }
            this.rooms.push(roomRows);
            this.walls.push(wallsRows);
        }

    }

    getUnVisitedNeighBorsForRoom = (currentRoom) => {
        var rooms = this.rooms;
        var neighboardRooms = [{ row : - 1, col : 0},
            { row : 1, col : 0},
            { row : 0, col : -1},
            { row : 0, col : 1}].reduce(function(accu, acell) {
                var indexRow = currentRoom.indexRow + acell.row;
                var indexCol = currentRoom.indexCol + acell.col;
                        //console.log("is visited: ", rooms[indexRow][indexCol]);
                if (indexRow >= 0 && indexRow < rooms[0].length
                    && indexCol >= 0 && indexCol < rooms.length
                ) {
                    if (rooms[indexRow][indexCol].visited === false) {
                        accu.push(rooms[indexRow][indexCol]);
                    }
                }
                return accu;
            },
            []
        );
        return neighboardRooms;
    }

    hasUnvisitedRooms = () => {
        for (var indexRow = 0; indexRow < this.rooms.length; indexRow++)
        {
            for (var indexCol = 0; indexCol < this.rooms[indexRow].length; indexCol++)
            {
                if (this.rooms[indexRow][indexCol].visited === false)
                {
                    return true;
                }
            }
        }
        return false;
    }

    generateMaze = () => {
        var currentRoom = this.rooms[0][0];


        //var
        var stack = [];
        currentRoom.visited = true;
        while (this.hasUnvisitedRooms())
        {
            var unVisitedNeighBors = this.getUnVisitedNeighBorsForRoom(currentRoom);
            if (unVisitedNeighBors.length >= 1)
            {
                // Choose randomly one of the unvisited neighbours
                var randomNeighBor = unVisitedNeighBors[getRandomInt(0, unVisitedNeighBors.length - 1)];
                // push the current cell to the stack
                stack.push(currentRoom);
                // remove the walls
                var indexWallToRemoveRow = Math.min(currentRoom.indexRow, randomNeighBor.indexRow);
                var indexWallToRemoveCol = currentRoom.indexCol +  randomNeighBor.indexCol + 1;
                this.walls[indexWallToRemoveRow][indexWallToRemoveCol].visible = false;
                //Make the chosen cell the current cell and mark it as visited
                currentRoom = randomNeighBor;
                currentRoom.visited = true;
            }
            else if (stack.length > 0)
            {
                currentRoom = stack.pop();
            }
        }

    }


    generateDeadEnd = () => {
        var walls = this.walls;
        for (var indexRoomRow = 0; indexRoomRow < this.rooms.length; indexRoomRow++)
        {
            for (var indexRoomCol = 0; indexRoomCol < this.rooms[indexRoomRow].length; indexRoomCol++)
            {
                var aroom = this.rooms[indexRoomRow][indexRoomCol];

                var neighboardWallsVisible = [{ row : 0, col : 0},
                    { row : 0, col : 1},
                    { row : 0, col : 2},
                    { row : -1, col : 1}].reduce(function(accu, acell) {
                        var indexWallRow = aroom.indexRow + acell.row;
                        var indexWallCol = aroom.indexCol * 2 + acell.col;
                                //console.log("is visited: ", rooms[indexRow][indexCol]);
                        if (indexWallRow >= 0 && indexWallRow < walls.length
                            && indexWallCol >= 0 && indexWallCol < walls[indexWallRow].length
                        ) {
                            if (walls[indexWallRow][indexWallCol].visible === true) {
                                accu.push(walls[indexWallRow][indexWallCol]);
                            }
                        }
                        return accu;
                    },
                    []
                );
                if (neighboardWallsVisible.length >= 3)
                {
                    neighboardWallsVisible.forEach((wall) =>
                    {
                        wall.visible = false;
                    });
                }
            }
        }
    }


}

export default Maze;
