
class EndlessRunnerGame {
    constructor(id, frameRate, groundOffset, playerOptions, spawnerOptions, difficulty) {
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext("2d");
        this.frameRate = frameRate;
        this.groundY = this.canvas.height - groundOffset;
        this.playerOptions = playerOptions;
        this.spawnerOptions = spawnerOptions;
        this.difficulty = difficulty;
        this.initialize();
    }

    // A method used to initialize the game.
    initialize() {
        this.background = new Background(255, this.canvas.width, this.canvas.height);
        this.player = Player.create(playerOptions, this.groundY);
        this.spawner = Spawner.create(spawnerOptions, this.canvas.width, this.groundY);
        this.speed = 0;
        this.score = 0;
        this.gameOver = false;
    }

    // A method used to start the game.
    start() {
        document.addEventListener('keydown', this.keydown.bind(this));
        setInterval(this.loop.bind(this), this.frameRate);
    }

    // A method used to execute the game's keydown events.
    keydown(event) {
        if (event.code == 'Space') {
            // If the game is ended,
            // restart the game.
            if (this.gameOver)
                this.initialize();
            // otherwise, execute the 
            // player's jump behaviour.
            else
                this.player.jump();
        }
    }

    // A method used to execute the game's continuous behaviour.
    loop() {
        // Clear the canvas.
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw game objects
        this.background.draw(this.ctx);
        this.drawGround();
        this.drawScore();
        this.player.draw(this.ctx);
        this.spawner.draw(this.ctx);

        // If the game is ended.
        if (this.gameOver) {
            // Draw game over elements.
            this.drawGameOver();

            // otherwise, execute game behaviour.
        } else {
            // Increase difficulty.
            this.increaseDifficulty();

            // Execute update.
            this.background.update();
            this.player.update();
            this.spawner.update();

            // Check for collisions.
            this.gameOver = this.player.overlapsWithOthers(this.spawner.activeObstacles);

            // Increase score.
            this.score++;
        }
    }

    // A method used to increase the game's difficulty.
    increaseDifficulty() {
        if (this.speed < this.difficulty.maxIncreasement) {
            this.speed += this.difficulty.speedIncreasement;
            this.player.movement.jumpPower += this.difficulty.speedIncreasement;
            this.player.movement.gravity += this.difficulty.speedIncreasement;
            this.spawner.speed += this.difficulty.speedIncreasement;
        }
    }

    // A method used to draw the game over text
    // if the game ends.
    drawGameOver() {
        this.ctx.beginPath();
        this.ctx.fillText("GAMEOVER", this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.closePath();
    }

    // A method used to draw the game's score.
    drawScore() {
        this.ctx.beginPath();
        this.ctx.fillText("score: " + this.score, 10, 20);
        this.ctx.closePath();
    }

    // A method used to draw the scene's ground.
    drawGround() {
        this.ctx.beginPath();
        this.ctx.rect(0, this.groundY, this.canvas.width, 3);
        this.ctx.fill();
        this.ctx.closePath();
    }
}