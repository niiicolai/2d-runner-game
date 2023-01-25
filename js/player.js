
class Player {
    constructor(position, animator, movement, collider) {
        this.position = position;
        this.animator = animator;
        this.movement = movement;
        this.collider = collider;
    }

    // A method that update the player's movement and animation.
    update() {
        this.movement.update();
        if (this.movement.isGrounded())
            this.animator.update();
    }

    // A method that draws the player object.
    draw(ctx) {
        ctx.beginPath();
        ctx.drawImage(
            this.animator.getImage(),
            this.position.x,
            this.position.y,
            this.collider.w,
            this.collider.h
        );
        ctx.closePath();
    }

    // A method that starts the jumping behaviour.
    jump() {
        if (this.movement.isGrounded()) {
            this.movement.jump();
            this.animator.reset();
        }
    }

    // A method that returns true if the player's collider 
    // overlaps with one in the list of colliders.
    overlapsWithOthers(others) {
        return this.collider.overlapsWithOthers(others);
    }

    // A method that can be used to create a player by
    // passing an object specifying player details.
    static create(options, groundY) {
        const position = new Point2D(options.startX, groundY);
        const collider = new Collider(position, options.width, options.height);
        const animator = Animator.create(options.playSpeed, options.showTime, options.imageSources);
        const movement = new Movement(position, groundY, options.height, options.jumpPower, options.jumpHeight, options.gravity);
        return new Player(position, animator, movement, collider);
    }
}