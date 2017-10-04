import RoomMaze from './RoomMaze';
import Wall from './Wall';

class Maze {
    constructor(roomSize, wallWidth, roomRow, roomCol, map_size)
    {
        this.map_size = map_size;
        this.roomSize = roomSize;
        this.wallWidth = wallWidth;
        this.roomRow = Math.floor((map_size ) / (roomSize + wallWidth));
        this.roomCol = Math.floor((map_size) / (roomSize +  wallWidth));
        this.generateMapMatrix();
        this.generateMaze();
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    generateMapMatrix = () => {
        this.rooms  = new Array();
        this.walls  = new Array();

        for (var indexRow = 0; indexRow < this.roomRow; indexRow++)
        {
            var roomRows = new Array();
            var wallsVertical = new Array();
            var wallsHorizontal = new Array();

            for (var indexCol = 0; indexCol < this.roomCol; indexCol++)
            {
                var wallX = indexRow * (this.roomSize + this.wallWidth);
                var wallY = indexCol * (this.roomSize + this.wallWidth);
                var wallVertical = new Wall(wallX, wallY, this.wallWidth, this.roomSize);

                wallsVertical.push(wallVertical);

                var roomX = wallX + this.wallWidth;
                var roomY = wallY;
                var newRoom = new RoomMaze(indexRow, indexCol, roomX, roomY, this.roomSize, this.roomSize);
                //constructor Wall(x, y, width, height)
                // vertical wall
                roomRows.push(newRoom);
                var wallHorizontal = new Wall(wallX + this.wallWidth, roomY + this.roomSize, this.roomSize, this.wallWidth);
                wallsHorizontal.push(wallHorizontal);
            }
            this.rooms.push(roomRows);
            this.walls.push(wallsVertical);
            this.walls.push(wallsHorizontal);
        }

    }

    getUnVisitedNeighBorsForRoom = (currentRoom) => {

        console.log("rooms : ", this.rooms);
        console.log("currentRoom : ", currentRoom);
        var rooms = this.rooms;
        var neighboardRooms = [{ row : - 1, col : 0},
            { row : 1, col : 0},
            { row : 0, col : -1},
            { row : 0, col : 1}].reduce(function(accu, acell) {
                console.log("acell: ", acell, " rooms ", rooms);
                var indexRow = currentRoom.indexRow + acell.row;
                var indexCol = currentRoom.indexCol + acell.col;
                console.log("index Row: ", indexRow, " indexCol ", indexCol);
                console.log("rooms length : ", rooms.length, " indexCol ", indexCol);

                console.log("indexRow >= 0 && indexRow < rooms[0].length && indexCol >= 0 && indexCol < rooms.length : ", (indexRow >= 0 && indexRow < rooms[0].length
                    && indexCol >= 0 && indexCol < rooms.length)
                );
                //console.log("is visited: ", rooms[indexRow][indexCol]);
                if (indexRow >= 0 && indexRow < rooms[0].length
                    && indexCol >= 0 && indexCol < rooms.length
                ) {
                    console.log("is visited: ", rooms[indexRow][indexCol])
                    console.log("is visited: ", rooms[indexRow][indexCol].visited === false)

                    if (rooms[indexRow][indexCol].visited === false) {
                        accu.push(rooms[indexRow][indexCol]);
                    }
                }
                console.log("accu: ", accu);
                return accu;
            },
            []
        );
        console.log("neighboardRooms : ", neighboardRooms);
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
            console.log("unVisitedNeighBors: ", unVisitedNeighBors);
            if (unVisitedNeighBors.length >= 1)
            {
                // Choose randomly one of the unvisited neighbours
                var randomNeighBor = unVisitedNeighBors[this.getRandomInt(0, unVisitedNeighBors.length - 1)];
                // push the current cell to the stack
                stack.push(currentRoom);
                // remove the walls
                var indexWallToRemoveRow = currentRoom.indexRow + randomNeighBor.indexRow + 1;
                var indexWallToRemoveCol = Math.min(currentRoom.indexCol, randomNeighBor.indexCol);
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

}

export default Maze;
