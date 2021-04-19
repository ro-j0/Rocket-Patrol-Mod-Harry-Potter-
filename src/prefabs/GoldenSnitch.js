class GoldenSnitch extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to scene
        this.points = 150;   // stores pointvalue
        this.moveSpeed = 7; 
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