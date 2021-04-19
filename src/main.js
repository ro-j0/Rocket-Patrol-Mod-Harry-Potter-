// Game configuration 
let config = {
    type: Phaser.CANVAS, 
    width: 1280, 
    height: 720, 
    scene: [Menu, Play]
}


let game = new Phaser.Game(config)

let borderUISize = game.config.height / 30;
let borderPadding = borderUISize / 3;
let starSpeed = 0;

// reserve keyboard bindings
let keyF, keyR, keyLEFT, keyRIGHT;

// something