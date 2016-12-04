var game = new Phaser.Game(400, 400, Phaser.AUTO, '',
    { preload: preload, create: create, update: update });

var player;
var keyboard;

var leftWall;
var rightWall;
var ceiling;

var platform;

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
    createPlatform();

    keyboard = game.input.keyboard.addKeys({
        'up': Phaser.Keyboard.UP,
        'down': Phaser.Keyboard.DOWN,
        'left': Phaser.Keyboard.LEFT,
        'right': Phaser.Keyboard.RIGHT
    });
}

function update () {

    game.physics.arcade.collide(player, [leftWall, rightWall]);
    game.physics.arcade.collide(player, [platform]);

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

    platform.body.y -= 2;
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

function createPlatform () {
    platform = game.add.sprite(170, 300, 'normal');
    game.physics.arcade.enable(platform);
    platform.body.immovable = true;
}
