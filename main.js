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
    //player.body.gravity.y = 1500;
    player.body.collideWorldBounds = true;

    soundBytes = [
        game.add.audio('engage'),
        game.add.audio('getoff'),
        game.add.audio('notgood')
    ];

    cursors = game.input.keyboard.createCursorKeys();

    space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    space.onDown.add(fire, this);

    music = game.add.audio('theme');
    music.onDecoded.add(start, this);

    game.time.events.loop(Phaser.Timer.SECOND*10, picardSaySomething, this);
    game.time.events.loop(Phaser.Timer.SECOND*5, addCube, this);

    player.body.onCollide = new Phaser.Signal();
    player.body.onCollide.add(picardSaySomething, this);

    enemies = [];

}

function start() {
    music.fadeIn(500);
}

function update() {


    for(let i = 0; i < enemies.length; i++){
        game.physics.arcade.collide(enemies[i], player);

        if(player.x > enemies[i].x){enemies[i].x++;}
        if(player.x < enemies[i].x){enemies[i].x--;}
        if(player.y > enemies[i].y){enemies[i].y++;}
        if(player.y < enemies[i].y){enemies[i].y--;}
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) { player.x -= 8; }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {  player.x += 8; }

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) { player.y -= 8; }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
    {  player.y += 8; }

}

function picardSaySomething() {
    soundBytes[getRandomInt(0, soundBytes.length-1)].play();
}

function fire() {



}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function addCube() {
    let cube = game.add.sprite(800, game.world.randomY, 'cube');

    game.physics.enable(cube, Phaser.Physics.ARCADE);
    cube.body.collideWorldBounds = true;

    enemies.push(cube);
}