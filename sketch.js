var backImage;
var player, player_running;
var ground;

var  bananaImage;
var  obstacle_img;

var gamestate = "play";
var score=0;


function preload(){
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png",
  "Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(displayWidth,displayHeight);
    
  player = createSprite(100,displayHeight-60,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.2;
  
 //create a long ground
  ground = createSprite(displayWidth/2,displayHeight-40,displayWidth*7,10);
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  //speed of camera position
  x=0;
}

function draw() {
  
  background("brown");
  if(gamestate === "play"){
   x+=4;
   //display jungle image
  //camera span
  camera.position.x = displayWidth + x;
  camera.position.y = displayHeight/2;
  //change monkey position wrt camera
  player.x = camera.position.x - 250;
  
    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
     score = score + 4;
    }
    if(obstaclesGroup.isTouching(player) && t === 0){
     //avoid negative score
      if (score > 0){
     score = score-2;
      }
     t=1;
    
     
    }
    console.log(player.y);
  
    if(keyDown("space") && player.y > 653) {
      player.velocityY = -22;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    spawnFood();
    spawnObstacles();
 
      drawSprites();
       
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, camera.position.x - 50,50);
  }
}

function spawnFood() {
  //write code here to spawn the food
  if(frameCount % 60 === 0) {
    var banana = createSprite(displayWidth,displayHeight -150 ,40,10);
    banana.x = camera.position.x + 100;
    banana.y = random(displayHeight/2 - 50,displayHeight/2 + 50);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
  //  banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
  
}

function spawnObstacles() {
  if(frameCount % 150 === 0) {
    t=0;
    var obstacle = createSprite(displayWidth,displayHeight-60,10,40);
   // obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
   
    obstacle.x = camera.position.x + 100;
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


  
