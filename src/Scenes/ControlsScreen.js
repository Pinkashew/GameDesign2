class ControlScreen extends Phaser.Scene {
    constructor() {
        super("controlScreen");
        this.my = {sprite: {}};
    }

    preload() {

    }

    create() {
        let my = this.my;
        this.add.text(game.config.width/5, game.config.height/4 - 50, "Controls", { fontFamily: "'Roboto'", fontSize: '64px', fill: '#ADD8E6' })
        this.add.text(game.config.width/5, game.config.height/4 + 50, "A: Moves you left", { fontFamily: "'Roboto'", fontSize: '32px', fill: '#ADD8E6' })
        this.add.text(game.config.width/5, game.config.height/4 + 100, "D: Moves you right", { fontFamily: "'Roboto'", fontSize: '32px', fill: '#ADD8E6' })
        this.add.text(game.config.width/5, game.config.height/4 + 150, "Space: Shoot Bullet", { fontFamily: "'Roboto'", fontSize: '32px', fill: '#ADD8E6' })
        this.add.text(game.config.width/5, game.config.height/4 + 200, "S: Start Level", { fontFamily: "'Roboto'", fontSize: '32px', fill: '#ADD8E6' })
        this.add.text(game.config.width/5, game.config.height/4 + 250, "L: Go to next level", { fontFamily: "'Roboto'", fontSize: '32px', fill: '#ADD8E6' })
        this.add.text(game.config.width/5, game.config.height/4 + 300, "R: Restart Level", { fontFamily: "'Roboto'", fontSize: '32px', fill: '#ADD8E6' })
        this.add.text(game.config.width/5, game.config.height/4 + 350, "T: Go back to title screen", { fontFamily: "'Roboto'", fontSize: '32px', fill: '#ADD8E6' })


        
        this.nextScene = this.input.keyboard.addKey("S");
        this.mainMenu = this.input.keyboard.addKey("T");
        document.getElementById('description').innerHTML = '<h2>Animal Shooter</h2><br>Controls // B: Back to Start Screen'    
    }

    update() {
        let my = this.my;
        if (Phaser.Input.Keyboard.JustDown(this.mainMenu)) {
            this.scene.start("titleScreen");
        }
    }

}