var game = new Phaser.Game(400, 400, Phaser.AUTO, '',
    { preload: preload, create: create, update: update });

var player1;
var cursor;

var platforms = [];

var leftWall;
var rightWall;
var ceiling;

var text1;
var text2;

var distance = 0;

// gameOver, pause, running
var status = 'running';

function preload () {

    game.load.spritesheet('player', '../assets/player.png', 32, 32);
    game.load.image('block', '../assets/block.png');
    game.load.image('nails', '../assets/nails.png');
    game.load.spritesheet('conveyorRight', '../assets/conveyor_right.png', 96, 16);
    game.load.spritesheet('conveyorLeft', '../assets/conveyor_left.png', 96, 16);
    game.load.spritesheet('trampoline', '../assets/trampoline.png', 96, 22);
    game.load.spritesheet('fake', '../assets/fake.png', 96, 36);
    game.load.image('wall', '../assets/wall.png');
    game.load.image('ceiling', '../assets/ceiling.png');

}

function create () {

    cursor = game.input.keyboard.addKeys({
        'up': Phaser.Keyboard.UP,
        'down': Phaser.Keyboard.DOWN,
        'left': Phaser.Keyboard.LEFT,
        'right': Phaser.Keyboard.RIGHT,
        'w': Phaser.Keyboard.W,
        'a': Phaser.Keyboard.A,
        's': Phaser.Keyboard.S,
        'd': Phaser.Keyboard.D
    });

    createBounders();
    createPlatforms();
    createPlayer();
    createScoreBoard();
}

function update () {

    this.physics.arcade.collide([player1], platforms, effect);
    this.physics.arcade.collide([player1], [leftWall, rightWall]);

    playerMove();
    playerAnimate(player1);
    scroll();
    checkTouchCeiling(player1);
    checkGameOver();

    text1.setText(player1.life);
    text2.setText(distance);
}

function createBounders () {
    leftWall = game.add.sprite(0, 0, 'wall');
    game.physics.arcade.enable(leftWall);
    leftWall.body.immovable = true;

    rightWall = game.add.sprite(383, 0, 'wall');
    game.physics.arcade.enable(rightWall);
    rightWall.body.immovable = true;

    ceiling = game.add.image(0, 0, 'ceiling');
}

function createPlatforms() {
    for (var i=0; i<6; i++) {
        var x = Math.random()*(400 - 96 - 40) + 20;
        var y = i*70 + 400;
        createOnePlatform(x, y);
    }
    game.physics.arcade.enable(platforms);
}

function createOnePlatform(x, y) {

    var platform;
    var rand = Math.random() * 100;

    if(rand < 20) {
        platform = game.add.sprite(x, y, 'block');
    }
    else if (rand < 40) {
        platform = game.add.sprite(x, y, 'nails');
        game.physics.arcade.enable(platform);
        platform.body.setSize(96, 15, 0, 15);
    } else if (rand < 50) {
        platform = game.add.sprite(x, y, 'conveyorLeft');
        platform.animations.add('scroll', [0, 1, 2, 3], 16, true);
        platform.play('scroll');
    } else if (rand < 60) {
        platform = game.add.sprite(x, y, 'conveyorRight');
        platform.animations.add('scroll', [0, 1, 2, 3], 16, true);
        platform.play('scroll');
    } else if (rand < 80) {
        platform = game.add.sprite(x, y, 'trampoline');
        platform.animations.add('jump', [4, 5, 4, 3, 2, 1, 0, 1, 2, 3], 120);
        platform.frame = 3;
    } else {
        platform = game.add.sprite(x, y, 'fake');
        platform.animations.add('turn', [0, 1, 2, 3, 4, 5, 0], 14);
    }

    game.physics.arcade.enable(platform);
    platform.body.immovable = true;
    platforms.push(platform);

    platform.body.checkCollision.down = false;
    platform.body.checkCollision.left = false;
    platform.body.checkCollision.right = false;
}

function createPlayer() {
    player1 = game.add.sprite(200, 50, 'player');
    game.physics.arcade.enable(player1);
    player1.body.gravity.y = 500;
    player1.animations.add('left', [0, 1, 2, 3], 8, true);
    player1.animations.add('right', [9, 10, 11, 12], 8, true);
    player1.animations.add('leftfall', [18, 19, 20, 21], 8, true);
    player1.animations.add('rightfall', [27, 28, 29, 30], 8, true);
    player1.animations.add('fall', [36, 37, 38, 39], 8, true);
    player1.life = 10;
}

function createScoreBoard() {
    text1 = game.add.text(10, 10, '', {fill: '#ff0000'});
    text2 = game.add.text(350, 10, '', {fill: '#ff0000'});
}

function playerMove() {
    if(cursor.left.isDown) {
        player1.body.velocity.x = -250;
    } else if(cursor.right.isDown) {
        player1.body.velocity.x = 250;
        player1.animations.play('right');
    } else {
        player1.body.velocity.x = 0;
    }
}

function playerAnimate(player) {
    var x = player1.body.velocity.x;
    var y = player1.body.velocity.y;

    if (x < 0 && y > 0) {
        player1.animations.play('leftfall');
    }
    if (x > 0 && y > 0) {
        player1.animations.play('rightfall');
    }
    if (x < 0 && y == 0) {
        player1.animations.play('left');
    }
    if (x > 0 && y == 0) {
        player1.animations.play('right');
    }
    if (x == 0 && y > 0) {
        player1.animations.play('fall');
    }
    if (x == 0 && y == 0) {
      player1.frame = 8;
    }
}

function scroll() {
    if(status == 'gameOver') return;
    for(var i=0; i<platforms.length; i++) {
        var platform = platforms[i];
        platform.body.position.y -= 2;
        if(platform.body.position.y <= -20) {
            platform.destroy();
            platforms.splice(i, 1);
            distance += 1;
            createOnePlatform(Math.random()*(400 - 96 - 40) + 20, 400);
        }
    }
}

var last = 0;
function checkTouchCeiling(player) {
    if(player.body.y < 0) {
        if(player.body.velocity.y < 0) {
            player.body.velocity.y = 0;
        }
        if(game.time.now - 2000 > last) {
            player.life -= 3;
            game.camera.flash(0xff0000, 100);
            last = game.time.now;
        }
    }
}

function checkGameOver() {
    if(player1.life <= 0) {
        gameOver();
    }
    if(player1.body.y > 500) {
        gameOver();
    }
}

function effect(player, platform) {
    if(platform.key == 'conveyorRight') {
        conveyorRightEffect(player, platform);
    }
    if(platform.key == 'conveyorLeft') {
        conveyorLeftEffect(player, platform);
    }
    if(platform.key == 'trampoline') {
        trampolineEffect(player, platform);
    }
    if(platform.key == 'nails') {
        nailsEffect(player, platform);
    }
    if(platform.key == 'block') {
        basicEffect(player, platform);
    }
    if(platform.key == 'fake') {
        fakeEffect(player, platform);
    }
}

function conveyorRightEffect(player, platform) {
    player.body.x += 2;
}

function conveyorLeftEffect(player, platform) {
    player.body.x -= 2;
}

function trampolineEffect(player, platform) {
    platform.animations.play('jump');
    player.body.velocity.y = -350;
}

function nailsEffect(player, platform) {
    if (player.touchOn !== platform) {
        player.life -= 3;
        player.touchOn = platform;
        game.camera.flash(0xff0000, 100);
    }
}

function basicEffect(player, platform) {
  if (player.touchOn !== platform) {
      if(player.life < 10) {
          player.life += 1;
      }
      player.touchOn = platform;
  }
}

function fakeEffect(player, platform) {
    platform.animations.play('turn');
    setTimeout(function() {
      platform.body.checkCollision.up = false;
    }, 100)
}

function gameOver() {
    status = 'gameOver';
}
