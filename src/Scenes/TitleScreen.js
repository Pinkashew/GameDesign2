class TitleScreen extends Phaser.Scene {
    constructor() {
        super("titleScreen");
        this.my = {sprite: {}};
    }

    preload() {

    }

    create() {
        let my = this.my;
        this.add.text(game.config.width/10, game.config.height/3, "Press S to Start Game!!!", { fontFamily: "'Roboto'", fontSize: '64px', fill: '#ADD8E6' });
        this.add.text(game.config.width/5, game.config.height/3 + 100, "Press C for Controls", { fontFamily: "'Roboto'", fontSize: '48px', fill: '#ADD8E6' });
        
        this.nextScene = this.input.keyboard.addKey("S");
        this.controlScene = this.input.keyboard.addKey("C");
        document.getElementById('description').innerHTML = '<h2>Animal Shooter</h2><br>S: Start Game'    
    }

    update() {
        let my = this.my;

        if (Phaser.Input.Keyboard.JustDown(this.nextScene)) {
            this.scene.start("spriteMovement");
        }

        if (Phaser.Input.Keyboard.JustDown(this.controlScene)) {
            this.scene.start("controlScreen");
        }
    }

}