class Room {

    constructor(x, y, width, height)
    {
        this.x1 = x;
        this.x2 = x + width;

        this.y1 = y;
        this.y2 = y + height;

        this.width = width;
        this.height = height;
        this.centerX = Math.floor((this.x1 + this.x2) /2);
        this.centerY = Math.floor((this.y1 + this.y2) /2);
    }

    intersects = (room) => {
        return (this.x1 <= room.x2 && this.x2 >= room.x1 &&
            this.y1 <= room.y2 && this.y2 >= room.y1
        );
    }
}

export default Room;
