
class Rock {
    constructor(position, noOfParts, w, h) {
        this.position = position;
        this.noOfParts = noOfParts;
        this.w = w;
        this.h = h;

        // Add a collider
        this.collider = new Collider(position, w, h);
    }

    // A method that can be used to draw the rock.
    draw(ctx) {
        for (let i = 0; i < this.noOfParts; i += .3) {
            // Find width and height.
            const w = this.w / (i + 1);
            const h = this.h / (i + 2);

            // Find x and y position.
            const x = this.position.x + (this.w - w) / 2;
            const y = this.position.y + h;

            // Draw rect.
            ctx.beginPath();
            ctx.rect(x, y, w, h);
            ctx.fill();
            ctx.closePath();
        }
    }

    // A method that can be used to create a rock
    // without passing a point2D.
    static create(x, y, w, h, noOfParts) {
        const position = new Point2D(x, y);
        return new Rock(position, noOfParts, w, h);
    }
}
