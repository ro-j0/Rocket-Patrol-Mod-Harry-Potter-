class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio files
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('menu_bgm', './assets/Theme.mp3');
        this.load.image('Logo', './assets/Logo.jpg');
    }

    create() { 
        // set menu text
        let menuConfig = {
            fontFamily: 'Adobe Garamond', 
            fontSize: '28px', 
            backgroundColor: 'F3B141', 
            color: '#843605', 
            align: 'right', 
            padding: {
                top: 5, 
                bottom: 5, 
            }, 
            fixedWidth: 0
        }

        // show menu text
        this.add.image(game.config.width/2, game.config.height/2 - 200, "Logo").setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - 60, "Quidditch?", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, "Use <--> arrows to move & (F) to fly ahead", menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = "#7F0909";
        menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 25, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.sound.play('menu_bgm');
    }

    update () {
        
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) { 
            this.sound.stopAll('menu_bgm');
            // easy mode
            game.settings = {
                spaceshipSpeed: 3, 
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.sound.stopAll('menu_bgm');
            // hard mode
            game.settings = {
                spaceshipSpeed: 4, 
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}