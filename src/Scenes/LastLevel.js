class LastLevel extends Phaser.Scene {
    constructor() {
        super("lastLevel");
        this.my = {sprite: {}};

        this.animals = [];
        this.elephant = [];
        this.parrot = [];
        this.my.sprite.bullet = [];   
        this.maxBullets = 4;
        
        this.cityHP = 20;
        this.score = 0;

        this.wave = 1;
        this.numAnimals = 7;
        this.maxAnimals = 10;
        this.numElephant = 2;
        this.numParrot = 1;
    }

    preload() {
        this.load.setPath("./assets/");

        this.load.image("characterModel", "character_roundGreen.png");
        this.load.image("arrow", "weapon_arrow.png");
        this.load.image("animal", "monkey.png");
        this.load.image("animal1", "elephant.png");
        this.load.image("animal2", "parrot.png");

        this.load.image("boom0", "explosion00.png");
        this.load.image("boom1", "explosion01.png");
        this.load.image("boom2", "explosion02.png");
    }

    create() {
        let my = this.my;

        my.sprite.model = this.add.sprite(game.config.width/2, game.config.height - 100, "characterModel");
        //my.sprite.monkey = this.add.sprite(game.config.width/2, game.config.height - 500, "animal");
        //my.sprite.monkey.setScale(0.25);

        //my.sprite.elephant = this.add.sprite(game.config.width/2 + 200, game.config.height - 500, "animal1");
        //my.sprite.elephant.setScale(0.25);

        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.tKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);

        this.playerSpeed = 5;
        this.bulletSpeed = 10;

        this.cityText = this.add.text(16, 16, "City HP: " + this.cityHP, { fontFamily: "'Roboto'", fontSize: '16px', fill: '#fff' });
        this.scoreText = this.add.text(16, 50, "Points: " + this.score, { fontFamily: "'Roboto'", fontSize: '16px', fill: '#ADD8E6' });

        this.anims.create({
            key: "kaboom",
            frames: [
                { key: "boom0" },
                { key: "boom1" },
                { key: "boom2" },
            ],
            framerate: 30,
            repeat: 1,
            hideOnComplete: true
        });

        this.sKeyPressed = false;

        document.getElementById('description').innerHTML = '<h2>Animal Shooter</h2><h3>Your objective is to shoot the animals and not let them reach the city which is behind you<h3><br>A: left // D: right // Space: Fire Arrow // S: Start Game // R: Reset Level // T: Title Screen can only be pressed when game is not active'
    }

    update() {
        let my = this.my;

        if (this.aKey.isDown) {
            if (my.sprite.model.x > (my.sprite.model.displayWidth/2)) {
                my.sprite.model.x -= this.playerSpeed;
            }
            my.sprite.model.flipX = true;
        }

        if (this.dKey.isDown) {
            if (my.sprite.model.x < (game.config.width - (my.sprite.model.displayWidth/2))) {
                my.sprite.model.x += this.playerSpeed;
            }
            my.sprite.model.flipX = false;
        }

        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            if (my.sprite.bullet.length < this.maxBullets) {
                my.sprite.bullet.push(this.add.sprite(my.sprite.model.x, my.sprite.model.y-(my.sprite.model.displayHeight/2), "arrow"));
            }
        }

        for (let bullet of my.sprite.bullet) {
            bullet.y -= this.bulletSpeed;
        }

        my.sprite.bullet = my.sprite.bullet.filter((bullet) => bullet.y > -(bullet.displayHeight/2)); 

        if (Phaser.Input.Keyboard.JustDown(this.sKey)) {
            this.sKeyPressed = true;
        }

        if (this.sKeyPressed) {
            if (this.animals.length < this.maxAnimals) {
                if (this.animals.length < this.numAnimals) {
                    let newAnimal = this.add.sprite(Math.random() * game.config.width, -50, "animal");
                    newAnimal.setScale(0.25);
                    this.animals.push(newAnimal);
                }
            }
        }

        if (this.sKeyPressed) {
            if (this.elephant.length < this.maxAnimals) {
                if (this.elephant.length < this.numElephant) {
                    let newAnimals = this.add.sprite(Math.random() * game.config.width, -50, "animal1");
                    newAnimals.setScale(0.25);
                    this.elephant.push(newAnimals);
                }
            }
        }

        if (this.sKeyPressed) {
            if (this.parrot.length < this.maxAnimals) {
                if (this.parrot.length < this.numParrot) {
                    let newAnimals = this.add.sprite(Math.random() * game.config.width, -50, "animal2");
                    newAnimals.setScale(0.25);
                    this.parrot.push(newAnimals);
                }
            }
        }

        for (let animal of this.animals) {
            animal.y += 3;
            if (animal.y > game.config.height + 50) {
                animal.destroy();
                this.animals.splice(this.animals.indexOf(animal), 1);
                this.cityHP -= 1;
                this.cityText.setText("City HP: " + this.cityHP);
            }
        }

        for (let animal of this.elephant) {
            animal.y += 4;
            if (animal.y > game.config.height + 50) {
                animal.destroy();
                this.elephant.splice(this.elephant.indexOf(animal), 1);
                this.cityHP -= 2;
                this.cityText.setText("City HP: " + this.cityHP);
            }
        }

        for (let animal of this.parrot) {
            animal.y += 5;
            if (animal.y > game.config.height + 50) {
                animal.destroy();
                this.parrot.splice(this.parrot.indexOf(animal), 1);
                this.cityHP -= 4;
                this.cityText.setText("City HP: " + this.cityHP);
            }
        }

        for (let bullet of my.sprite.bullet) {
            for (let animal of this.animals) {
                if (this.collides(animal, bullet)) {
                    bullet.destroy();
                    animal.destroy();
                    my.sprite.bullet.splice(my.sprite.bullet.indexOf(bullet), 1);
                    this.animals.splice(this.animals.indexOf(animal), 1);
                    this.score += 1;
                    this.scoreText.setText("Points: " + this.score);
                    this.add.sprite(animal.x, animal.y, "boom02").setScale(0.25).play("kaboom");
                    break;
                }
            }
        }

        for (let bullet of my.sprite.bullet) {
            for (let animal of this.elephant) {
                if (this.collides(animal, bullet)) {
                    bullet.destroy();
                    animal.destroy();
                    my.sprite.bullet.splice(my.sprite.bullet.indexOf(bullet), 1);
                    this.elephant.splice(this.elephant.indexOf(animal), 1);
                    this.score += 3;
                    this.scoreText.setText("Points: " + this.score);
                    this.add.sprite(animal.x, animal.y, "boom02").setScale(0.25).play("kaboom");
                    break;
                }
            }
        }

        for (let bullet of my.sprite.bullet) {
            for (let animal of this.parrot) {
                if (this.collides(animal, bullet)) {
                    bullet.destroy();
                    animal.destroy();
                    my.sprite.bullet.splice(my.sprite.bullet.indexOf(bullet), 1);
                    this.parrot.splice(this.parrot.indexOf(animal), 1);
                    this.score += 7;
                    this.scoreText.setText("Points: " + this.score);
                    this.add.sprite(animal.x, animal.y, "boom02").setScale(0.25).play("kaboom");
                    break;
                }
            }
        }

        if (Phaser.Input.Keyboard.JustDown(this.rKey)) {
            this.resetGame();
        }

        if (this.cityHP <= 0) {
            this.add.text(200, 300, "GAME OVER!!!", { fontFamily: "'Roboto'", fontSize: '64px', fill: '#ADD8E6' })
            for (let i = 0; i < this.animals.length; i++) {
                this.animals[i].destroy();
            }
            this.animals = [];
            this.sKeyPressed = false;
        }

        if (this.cityHP <= 0) {
            this.add.text(200, 300, "GAME OVER!!!", { fontFamily: "'Roboto'", fontSize: '64px', fill: '#ADD8E6' })
            for (let i = 0; i < this.elephant.length; i++) {
                this.elephant[i].destroy();
            }
            this.elephant = [];
            this.sKeyPressed = false;
        }

        if (this.cityHP <= 0) {
            this.add.text(200, 300, "GAME OVER!!!", { fontFamily: "'Roboto'", fontSize: '64px', fill: '#ADD8E6' })
            for (let i = 0; i < this.parrot.length; i++) {
                this.parrot[i].destroy();
            }
            this.parrot = [];
            this.sKeyPressed = false;
        }
        
        if (!this.sKeyPressed) {
            if (Phaser.Input.Keyboard.JustDown(this.tKey)) {
                this.scene.start("titleScreen");
            }
        }

        if (this.score >= 60) {
            this.add.text(100, 300, "You Win!!!", { fontFamily: "'Roboto'", fontSize: '64px', fill: '#ADD8E6' })
            for (let i = 0; i < this.animals.length; i++) {
                this.animals[i].destroy();
            }
            this.animals = [];
            this.elephant = [];
            this.parrot = [];
            this.sKeyPressed = false;
        }
    }

    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) {
            return false;
        }
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) {
            return false
        }
        return true;
    }

    resetGame() {
        for (let i = 0; i < this.animals.length; i++) {
            this.animals[i].destroy();
        }
        this.animals = [];
        this.cityHP = 7;
        this.score = 0;
        this.cityText.setText("City HP: " + this.cityHP);
        this.scoreText.setText("Points: " + this.score);
        this.sKeyPressed = false;
    }
}