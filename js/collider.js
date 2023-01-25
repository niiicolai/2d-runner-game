
class Collider {
    constructor(position, w, h) {
        this.position = position;
        this.w = w;
        this.h = h;
    }

    // A method that can be used to check if the
    // collider overlaps with another collider.
    overlaps(other) {
        return this.position.x < other.position.x + other.w
            && this.position.x + this.w > other.position.x
            && this.position.y < other.position.y + other.h
            && this.position.y + this.h > other.position.y;
    }

    // A method that returns true if the collider 
    // overlaps with one in the list of colliders.
    overlapsWithOthers(others) {
        for (let i = 0; i < others.length; i++)
            if (this.overlaps(others[i]))
                return true;
        return false;
    }
}