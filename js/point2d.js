
class Point2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // A method that can be used to increase
    // or decrease the value of x and y.
    add(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}