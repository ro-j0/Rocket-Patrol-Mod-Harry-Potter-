class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/Harry Final.png');
        this.load.image('spaceship', './assets/Quaffle.png', {
            width : 16,
            height : 16
        });
        this.load.image('starfield', './assets/BackGround.png');
        this.load.image('golden', './assets/golden snitch.png');
        this.load.spritesheet("explosion", "./assets/explosion.png", {
            frameWidth : 64,
            frameHeight : 32, 
            startFrame : 0,
            endFrame : 9
        });
    }

    create() { 
        //this.sound.stop('menu_bgm');
        // place starfield
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width,
        borderUISize * 2, 0x7F0909).setOrigin(0,0);

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFC500).setOrigin(0,0);

        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFC500).setOrigin(0,0);

        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFC500).setOrigin(0,0);

        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFC500).setOrigin(0,0);

        // add rocket (player 1)
        this.p1Rocket = new Rocket(this, game.config.width/2, (game.config.height - borderUISize - borderPadding)-60, 'rocket').setOrigin(0.5,0);
        
        // add spaceship (x3)

        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4 + Math.floor(Math.random() * 100) + 150, 'spaceship', 0, 10).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 +  borderPadding*2 + Math.floor(Math.random() * 100), 'spaceship', 0, 10).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4 + Math.floor(Math.random() * 100), 'spaceship', 0, 10).setOrigin(0,0);
        this.gs01 = new GoldenSnitch(this, game.config.width, borderUISize*7 + borderPadding*4 + Math.floor(Math.random() * 100), 'golden',0).setOrigin(0,0);

        // define keys 
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.anims.create({
            key: 'explode', 
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9, 
                first: 0
            }), 
            frameRate: 30
        });

        // initialize the game scores
        this.p1Score = 0;

        // display the game scores
        let scoreConfig = {
            fontFamily: 'Adobe Garamond', 
            fontSize: '28px', 
            backgroundColor: 'F3B141', 
            color: '#843605', 
            align: 'right', 
            padding: {
                top: 5, 
                bottom: 0, 
            }, 
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        // Game Over Flag
        this.gameOver = false;

        // 60 seconds clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu.', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {

        // check the key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('menuScene');
        }

        this.starfield.tilePositionX -= starSpeed;
        if(!this.gameOver){
            // update rocket
            this.p1Rocket.update();

            // update ships
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.gs01.update();
        }



        // check collision
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
           this.p1Rocket.reset();
           this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.p1Rocket, this.gs01)){
            this.p1Rocket.reset();
            this.shipExplode(this.gs01);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB collision checking 

        if (rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x 
        && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y) {
            return true;
        }else { 
            return false; 
        } 
    }

    shipExplode(ship) {
        // temporarily hide the ship
        ship.alpha = 0;
        // create explosion sprite at ship position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play("explode");             // play the explosion anim
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');

    }


}