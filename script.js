class start extends Phaser.Scene {
    constructor() {
        super('start');
    }
    preload() {
        this.load.path = './assets/';
    }
    create() {

    }
    update() {

    }
}

let config = {
    type: Phaser.WEBGL,
    width: 1280,
    height: 720,
    scene: [start]
}

let game = new Phaser.Game(config);