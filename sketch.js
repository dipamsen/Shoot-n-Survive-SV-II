var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var database;
var player;
var inRange=[];
var form, /*player1, player2, player3, player4,*/ game;
//var everyone=[player1, player2, player3, player4];
var img1, img2, img3, img4, ground;
var playerSprites, p1, p2, p3, p4;
var spawned = false;

/*function preload(){
  img1 = loadImage("images/car1.png");
  img2 = loadImage("images/car2.png");
  img3 = loadImage("images/car3.png");
  img4 = loadImage("images/car4.png");
  ground = loadImage("images/ground.png");
}*/

function setup(){
  canvas = createCanvas(800, 600);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  
}


function draw(){
  if(playerCount === 4){
    
    game.update(1);
  }
  //console.log(allPlayers);
  if(gameState === 1){
    clear();
    for (plr in allPlayers){
      player.x = allPlayers[plr].position.x; player.y = allPlayers[plr].position.y;
    }
    game.play();
  } 
  if(gameState === 2){
    game.end();
  }
}
