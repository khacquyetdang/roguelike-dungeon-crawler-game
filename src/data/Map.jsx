import Room from './Room';

class Map {
    constructor(minRoomSize, maxRoomSize, maxRooms, map_size)
    {
        this.minRoomSize = minRoomSize;
        this.maxRoomSize = maxRoomSize;
        this.maxRooms = maxRooms;

        this.map_size = map_size;

        this.placeRooms();
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    placeRooms = () => {
        this.rooms  = new Array();

        for (var index = 0; index < this.maxRooms; index++)
        {
            var w = this.getRandomInt(this.minRoomSize, this.maxRoomSize);
            var h = this.getRandomInt(this.minRoomSize, this.maxRoomSize);
            var x = this.getRandomInt(1, this.map_size - w - 1);
            var y = this.getRandomInt(1, this.map_size - h - 1);

            // create room with randomized values
            var newRoom = new Room(x, y, w, h);

            var failed = false;
            for (var indexRoom = 0; indexRoom < this.rooms.length; indexRoom++) {
                var otherRoom = this.rooms[indexRoom];
                if (newRoom.intersects(otherRoom)) {
                    failed = true;
                    break;
                }
            }
            if (!failed) {
                // push new room into rooms array
                this.rooms.push(newRoom)
            }
        }
    }
}

export default Map;
