/*
Name: Rohan Jhangiani
CruzID: rjhangia@ucsc.edu
Project Title: Rocket Patrol Mod(Harry Potter)
Date: 4/19/21
Time Taken: around 9 hours
*/
/*
Shrek Tier Redesign (60) 
(The artwork for the player, background, quaffle and the golden snitch were made using pixelart.com)
(sfx for the whoosh and catch were from https://www.zapsplat.com/)
(bgm for menu was downloaded off youtube.com)
Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
(golden snitch worth 150 points)
Create a new title screen (e.g., new artwork, typography, layout) (10)
(Menu screen has the Harry Potter logo, background and UI was recolored to fit a Gryffindor theme, the font from the books was used) 

*/
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