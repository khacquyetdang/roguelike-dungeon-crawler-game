class Wall {

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
        this.visible = true;
    }
}

export default Wall;
