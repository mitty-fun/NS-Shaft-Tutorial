var game = new Phaser.Game(400, 400, Phaser.AUTO, '',
    { preload: preload, create: create, update: update });

var player;
var keyboard;

var leftWall;
var rightWall;
var ceiling;

var platforms = [];

function preload () {

    game.load.baseURL = 'https://wacamoto.github.io/NS-Shaft-Tutorial/assets/';
    game.load.crossOrigin = 'anonymous';
    game.load.spritesheet('player', 'player.png', 32, 32);
    game.load.image('wall', 'wall.png');
    game.load.image('ceiling', 'ceiling.png');
    game.load.image('normal', 'normal.png');
    game.load.image('nails', 'nails.png');
    game.load.spritesheet('conveyorRight', 'conveyor_right.png', 96, 16);
    game.load.spritesheet('conveyorLeft', 'conveyor_left.png', 96, 16);
    game.load.spritesheet('trampoline', 'trampoline.png', 96, 22);
    game.load.spritesheet('fake', 'fake.png', 96, 36);
}

function create () {

    createPlayer();
    createBounders();

    keyboard = game.input.keyboard.addKeys({
        'up': Phaser.Keyboard.UP,
        'down': Phaser.Keyboard.DOWN,
        'left': Phaser.Keyboard.LEFT,
        'right': Phaser.Keyboard.RIGHT
    });
}

function update () {

    game.physics.arcade.collide(player, [leftWall, rightWall]);
    game.physics.arcade.collide(player, platforms, effect);

    if (keyboard.left.isDown) {
        player.body.velocity.x = -200;
        player.animations.play('left');
    }
    else if (keyboard.right.isDown) {
        player.body.velocity.x = 200;
        player.animations.play('right');
    } else {
        player.body.velocity.x = 0;
        player.frame = 8;
    }

    updatePlatforms();
    createPlatforms();
}

function createPlayer () {
    player = game.add.sprite(200, 100, 'player');
    game.physics.arcade.enable(player);
    player.body.gravity.y = 500;
    player.animations.add('left', [0, 1, 2, 3], 6);
    player.animations.add('right', [9, 10, 11, 12], 6);
    player.frame = 8;
}

function createBounders () {
    leftWall = game.add.sprite(0, 0, 'wall');
    game.physics.arcade.enable(leftWall);
    leftWall.body.immovable = true;

    rightWall = game.add.sprite(383, 0, 'wall');
    game.physics.arcade.enable(rightWall);
    rightWall.body.immovable = true;

    ceiling = game.add.sprite(0, 0, 'ceiling');
}

var lastTime = 0;
function createPlatforms () {
    if(game.time.now > lastTime + 600) {
        lastTime = game.time.now;
        createOnePlatform();
    }
}

function createOnePlatform () {

    var platform;
    var x = Math.random() * (400 - 96 - 40) + 20;
    var rand = Math.random() * 100;

    if (rand < 20) {
        platform = game.add.sprite(x, 400, 'normal');
    } else if (rand < 30) {
        platform = game.add.sprite(x, 400, 'conveyorLeft');
        platform.animations.add('scroll', [0, 1, 2, 3], 16, true);
        platform.play('scroll');
    } else if (rand < 40) {
        platform = game.add.sprite(x, 400, 'conveyorRight');
        platform.animations.add('scroll', [0, 1, 2, 3], 16, true);
        platform.play('scroll');
    } else if (rand < 60) {
        platform = game.add.sprite(x, 400, 'trampoline');
    } else if (rand < 80) {
        platform = game.add.sprite(x, 400, 'nails');
    } else {
        platform = game.add.sprite(x, 400, 'fake');
    }

    game.physics.arcade.enable(platform);
    platform.body.immovable = true;
    platforms.push(platform);
}

function updatePlatforms () {
    for(var i=0; i<platforms.length; i++) {
        platforms[i].body.y -= 2;

        if(platforms[i].body.y < 0) {
            platforms[i].destroy();
            platforms.splice(i, 1);
        }
    }
}

function effect (player, platform) {
    console.log(platform.key);
}
