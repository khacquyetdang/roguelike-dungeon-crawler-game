export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function distance(x1, y1, x2, y2)
{
    var deltaX = x2 - x1;
    var deltaY = y2 - y1;
    return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
}
