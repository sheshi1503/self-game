var PLAY = 1;

var END = 0;

var gameState = PLAY;


var trex, trex_running, trex_collided;

var ground, invisibleGround, groundImage;


var cloudsGroup, cloudImage;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;


var score=0;


var gameOver, restart;

var vill,enem,villages,backgroundn;


localStorage["HighestScore"] = 0;


function preload(){
  trex_running =   loadAnimation("game png/villager.png")
 
trex_collided = loadAnimation("game png/villager.png");

groundImage = loadImage("ground2.png");
  
 
cloudImage = loadImage("cloud.png");
  
 
obstacle1 = loadImage("game png/enhead.png");
  
obstacle2 = loadImage("game png/en1.png");

obstacle3 = loadImage("game png/en2.png");

  
 
 gameOverImg = loadImage("gameOver.png");

  restartImg = loadImage("restart.png");

  backgroundn = loadImage("game png/background.jpg")
}


function setup() {
  createCanvas(900, 500);
 
trex = createSprite(100,350,20,50);
  
  
trex.addAnimation("running", trex_running);
  
trex.addAnimation("collided", trex_collided);
  
trex.scale = 0.15;
  
  
ground = createSprite(200,400,400,20);
  
ground.addImage("ground",groundImage);
 
 ground.x = ground.width /2;
 
 ground.velocityX = -(6 + 3*score/100);
  
  
gameOver = createSprite(300,250);
  
gameOver.addImage(gameOverImg);
  
 
 restart = createSprite(300,280);
  
restart.addImage(restartImg);
  
  
gameOver.scale = 0.5;
  
restart.scale = 0.5;

  
gameOver.visible = false;
  
restart.visible = false;
  
  
invisibleGround = createSprite(200,400,400,10);
  
invisibleGround.visible = false;
  
  
cloudsGroup = new Group();
  
obstaclesGroup = new Group();
  
  
score = 0;
}


function draw() {
  //trex.debug = true;

  background(backgroundn);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){

    trex.visible=true
    
score = score + Math.round(getFrameRate()/60);

    ground.velocityX = -(6 + 3*score/100);

  
    if(keyDown("space") && trex.y >= 159) {
      trex.velocityY = -12;
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
    spawnClouds();

    randnum =Math.round(random(1,3)); 
    spawnObstacles(randnum);
  
    if(obstaclesGroup.isTouching(trex)){
       if (randnum === 1 || randnum === 3)
   {
    trex.visible=false
   }
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
 
obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles(randNum) {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,350,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    switch(randNum) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    //obstacle.debug=true
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}