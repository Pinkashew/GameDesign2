class TitleScreen extends Phaser.Scene {
    constructor() {
        super("titleScreen");
        this.my = {sprite: {}};
    }

    preload() {

    }

    create() {
        let my = this.my;
        this.add.text(game.config.width/4, game.config.height/3, "Start Game!!!", { fontFamily: "'Roboto'", fontSize: '64px', fill: '#ADD8E6' })
        
        this.nextScene = this.input.keyboard.addKey("S");
        document.getElementById('description').innerHTML = '<h2>Animal Shooter</h2><br>S: Start Game'    
    }

    update() {
        let my = this.my;

        if (Phaser.Input.Keyboard.JustDown(this.nextScene)) {
            this.scene.start("spriteMovement");
        }
    }

}