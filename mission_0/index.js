var game = new Phaser.Game(400, 400, Phaser.AUTO, '',
    { preload: preload, create: create, update: update });

function preload () {

    game.load.spritesheet('player', '../assets/player.png', 32, 32);
    game.load.image('wall', '../assets/wall.png');
    game.load.image('ceiling', '../assets/ceiling.png');
    game.load.image('normal', '../assets/normal.png');
    game.load.image('nails', '../assets/nails.png');
    game.load.spritesheet('conveyorRight', '../assets/conveyor_right.png', 96, 16);
    game.load.spritesheet('conveyorLeft', '../assets/conveyor_left.png', 96, 16);
    game.load.spritesheet('trampoline', '../assets/trampoline.png', 96, 22);
    game.load.spritesheet('fake', '../assets/fake.png', 96, 36);
}

function create () {
}

function update () {
}
