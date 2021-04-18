class Spaceship extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to scene
        this.points = pointValue;   // stores pointvalue
        this.moveSpeed = game.settings.spaceshipSpeed; 
    }

    update () {
        // move spaceship
        this.x -= this.moveSpeed;
        // wrap around
        if(this.x <= 0 - this.width) {
            this.x = game.config.width;
        }
    }

    reset () {
        this.x = game.config.width;
    }
}