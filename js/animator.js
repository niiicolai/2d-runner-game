
class Animator {
    constructor(playSpeed, showTime, images) {
        this.playSpeed = playSpeed;
        this.showTime = showTime;
        this.images = images;
        this.timer = 0;
        this.index = 0;
    }

    // A method used to update the animation over time.
    update() {
        this.timer += this.playSpeed;
        if (this.timer >= this.showTime) {
            this.timer = 0;
            this.index = (this.index + 1) % this.images.length;
        }
    }

    // A method that returns the current image of the animation.
    getImage() {
        return this.images[this.index];
    }

    // A method that reset the animation to the first image.
    reset() {
        this.index = 0;
    }


    // A method that can be used to create an instance of an animator
    // by specifying images' locations instead of instances of HTMLImageElements.
    static create(playSpeed, showTime, imageSources) {
        const images = [];
        for (let i = 0; i < imageSources.length; i++) {
            const image = new Image();
            image.src = imageSources[i];
            images.push(image);
        }

        return new Animator(playSpeed, showTime, images);
    }
}