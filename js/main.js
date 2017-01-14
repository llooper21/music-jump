console.log(Phaser);

//This sets the variable for the spacebar.
var spaceKey;

var ground;
var player;
var obstacle;
var walk;

//This sets the score to start at -1.
var score = 0;


var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var GAME_CONTAINER_ID = 'gameDiv';

//This is the object which runs the game.
function preload(){

//These four things sets the assets for the game. If you want to add music or images, there is where you would preload it.
  game.load.image('background', 'assets/sky.jpg');
  game.load.spritesheet('player', 'assets/Rocket.png', 32, 32);
  game.load.spritesheet('player2', 'assets/Cat.png', 32, 32);
  game.load.spritesheet('player3', 'assets/Dragon2.png', 32, 32);
  game.load.spritesheet('rocketimg', 'assets/Rocket2.png', 32, 32);
  game.load.image('ground', 'assets/wallHorizontal2.png');
  game.load.image('obstacle', 'assets/wallVertical2.png');
  game.load.image('obstacle2', 'assets/wallVertical3.png');
  game.load.image('ground2', 'assets/wallHorizontal3.png');

  //If you'd like to load music files, the format would look like  game.load.audio('[name of music]', ['[location for music file]']);
};

function create() {



  //This sets the game physics to Arcade style.
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //game.stage.backgroundColor = '#3498db';
  //game.stage.backgroundColor = '#00BFFF';
  //game.stage.backgroundImage = 'background';
  game.add.tileSprite(0, 0, 1000, 600, 'background');

  //This sets up a group call platforms. For future functionality we can set all horizontal surfaces to this group.
  platforms = game.add.group();
  platforms.enableBody = true;

  //This creates the ground, and makes it solid object the player will not pass through.
  ground = platforms.create(0, GAME_HEIGHT, 'ground');
  ground.anchor.setTo(0,1);
  ground.scale.setTo(4, 1);
  game.physics.arcade.enable(ground);
  ground.body.immovable = true;

  //This creates the player character at the bottom left side of the screen.
  player = game.add.sprite(game.width/8, game.world.height*(7/8), 'player');
  game.physics.arcade.enable(player);
  walk = player.animations.add('walk');
  player.animations.play('walk', 10, true);

  player2 = game.add.sprite(700, 0, 'player2');
  game.physics.arcade.enable(player2);
  walk = player2.animations.add('walk');
  player2.animations.play('walk', 10, true);
  player2.inputEnabled = true;
  player2.events.onInputDown.add(listener, this);

  player3 = game.add.sprite(732, 0, 'player3');
  game.physics.arcade.enable(player3);
  walk = player3.animations.add('walk');
  player3.animations.play('walk', 10, true);
  player3.inputEnabled = true;
  player3.events.onInputDown.add(listener, this);

  rocketimg = game.add.sprite(668, 0, 'rocketimg');
  game.physics.arcade.enable(rocketimg);
  walk = rocketimg.animations.add('walk');
  rocketimg.animations.play('walk', 10, true);
  rocketimg.inputEnabled = true;
  rocketimg.events.onInputDown.add(listener, this);


  //This sets the spacebar key as the input for this game.
  spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  player.body.bounce.y = 0.2;
  player.body.gravity.y = 600;


  //This creates the first obstacle on the right side of the screen.
  obstacle = game.add.sprite(700,GAME_HEIGHT, 'obstacle');
  obstacle.scale.setTo(1,0.2);
  obstacle.anchor.setTo(0,1);
  game.physics.arcade.enable(obstacle);
  obstacle.body.immovable = true;

  //This adds the scoreboard on the top left side of the screen.
  scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#9400D3' });
};

  function listener() {
    //player = player2;
    player.loadTexture('player2', 0);

    player.animations.add('walk');

    player.animations.play('walk', 10, true);

    obstacle.loadTexture('obstacle2', 0);

    ground.loadTexture('ground2', 0);
  }

  function listener2() {
    //player = player2;
    player.loadTexture('player3', 0);

    player.animations.add('walk');

    player.animations.play('walk', 10, true);

    obstacle.loadTexture('obstacle3', 0);

    ground.loadTexture('ground3', 0);
  }


function update(){
  //This is where the game engine recognizes collision betwen the player and the ground or the obstacle.
  game.physics.arcade.collide(player, ground);
  game.physics.arcade.collide(player, obstacle);

  //This allows the player to jump only if you press the space key and the player is touching the something at the bottom.
  //if (spaceKey.isDown && player.body.touching.down) {
  if (spaceKey.isDown) {
      player.body.velocity.y = -300;
  };

  //This creates a place to add sound when the obstacle reaches the player.
  if (obstacle.x > 600) {
    obstacle.x -= 0.2;
  };
  //This will update the score if the player has not been pushed off the screen, and the wall has gone off the left side.
  //var score = 0;
  if (obstacle.x < 1){
    score++;
    scoreText.text = 'score: ' + score;
  };

  // if (score > 2) {
  //   listener();
    // player.loadTexture('player2', 0);

    // player.animations.add('walk');

    // player.animations.play('walk', 10, true);

    // obstacle.loadTexture('obstacle2', 0);

    // ground.loadTexture('ground2', 0);
  // };


  var y = Math.random() * (GAME_HEIGHT - 0) + 0;
  //This will create a new wall if the old wall goes off the screen.
  if (obstacle.x < 0) {
    obstacle.kill();
    obstacle = game.add.sprite(900,y, 'obstacle');
    obstacle.scale.setTo(1,0.7);
    obstacle.anchor.setTo(0,1);
    game.physics.arcade.enable(obstacle);
    obstacle.body.immovable = true;
  };

  
  //This will tell you "You Lose!" if the player is pushed off the left side of the screen.
  if (player.x < 0){
    scoreText = game.add.text(350,200, 'You Lose!', {fill: '#ff0000'});
    obstacle.kill();
    player.kill();
  };
};

// function changeplayer () {
//   player.loadTexture('player2', 0);

//   player.animations.add('walk');

//   player.animations.play('walk', 10, true);

//   obstacle.loadTexture('obstacle2', 0);

//   ground.loadTexture('ground2', 0);
// }

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', { preload: preload, update: update, create: create });

game.state.start();
