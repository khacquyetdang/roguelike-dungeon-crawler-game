class Cell {

    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.connected = false;
        this.connectedTo = [];
        this.room = null;
    }

    connect = (other) =>
    {
        this.connectedTo.append(other)
        other.connectedTo.append(this)
        this.connected = true
        other.connected = true
    }
}

export default Cell;
