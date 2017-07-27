let game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

let player, cursors, enemies;

function preload() {

    game.load.image('picard', 'img/picard.png');
    game.load.image('cube', 'img/cube.png');
    game.load.audio('theme', 'sound/theme.mp3');

    game.load.audio('engage', 'sound/engage.mp3');
    game.load.audio('getoff', 'sound/getoff.mp3');
    game.load.audio('notgood', 'sound/notgoodenough.mp3');

    game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

}

function create() {

    player = game.add.sprite(20, 20, 'picard');

    game.physics.arcade.enable(player);

    player.body.bounce.y = 0.5;
    player.body.gravity.y = 1500;
    player.body.collideWorldBounds = true;

    soundBytes = [
        game.add.audio('engage'),
        game.add.audio('getoff'),
        game.add.audio('notgood')
    ];

    cursors = game.input.keyboard.createCursorKeys();

    space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    space.onDown.add(jump, this);

    music = game.add.audio('theme');
    music.onDecoded.add(start, this);

    game.time.events.loop(Phaser.Timer.SECOND*10, picardSaySomething, this);
    game.time.events.loop(Phaser.Timer.SECOND*5, addCube, this);

    enemies = [];

}

function addCube() {
    let cube = game.add.sprite(800, game.world.randomY, 'cube');

    game.physics.enable(cube, Phaser.Physics.ARCADE);

    cube.body.bounce.y = 0.9;
    cube.body.collideWorldBounds = true;

    enemies.push(cube);
}


function start() {

    music.fadeIn(500);

}

function update() {

    for(let i = 0; i < enemies.length; i++){
        game.physics.arcade.moveToPointer(enemies[i], 60, player, 500);
    }

}

function picardSaySomething() {
    soundBytes[getRandomInt(0, soundBytes.length-1)].play();
}

function jump() {
    player.body.velocity.y = -500;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}