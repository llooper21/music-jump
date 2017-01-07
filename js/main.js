console.log(Phaser);

//This sets the variable for the spacebar.
var spaceKey;

var ground;
var player;
var obstacle;

//This sets the score to start at -1.
var score = 0;


var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var GAME_CONTAINER_ID = 'gameDiv';

//This is the object which runs the game.
function preload(){

//These four things sets the assets for the game. If you want to add music or images, there is where you would preload it.
  game.load.image('background', 'assets/background.png');
  game.load.image('player', 'assets/player.png');
  game.load.image('ground', 'assets/wallHorizontal.png');
  game.load.image('obstacle', 'assets/wallVertical.png');

  //If you'd like to load music files, the format would look like  game.load.audio('[name of music]', ['[location for music file]']);
};

function create() {



  //This sets the game physics to Arcade style.
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //game.stage.backgroundColor = '#3498db';
  game.stage.backgroundColor = '#00BFFF';

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

  //This sets the spacebar key as the input for this game.
  spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  player.body.bounce.y = 0.2;
  player.body.gravity.y = 600;

  //This creates the first obstacle on the right side of the screen.
  obstacle = game.add.sprite(700,game.world.height, 'obstacle');
  obstacle.scale.setTo(1,0.2);
  obstacle.anchor.setTo(0,1);
  game.physics.arcade.enable(obstacle);
  obstacle.body.immovable = true;

  //This adds the scoreboard on the top left side of the screen.
  scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
};



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
  //This will create a new wall if the old wall goes off the screen.
  if (obstacle.x < 0) {
    obstacle.kill();
    obstacle = game.add.sprite(900, GAME_HEIGHT, 'obstacle');
    obstacle.scale.setTo(1,0.2);
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

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', { preload: preload, update: update, create: create });

game.state.start();