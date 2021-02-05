var monkey , monkey_running, junglebg;

var banana ,bananaImage, obstacle, obstacleImage,
    jungleImage;

var foodGroup, obstacleGroup;

var score;

var gameState = "play";

function preload(){
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png",    "sprite_2.png","sprite_3.png","sprite_4.png",
"sprite_5.png","sprite_6.png","sprite_7.png",
"sprite_8.png");
  
  jungleImage = loadImage("jungle.jpg");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
 
}

function setup() {
  //createCanvas(550,500);
  
  var survivalTime = 0;
  
  junglebg = createSprite(200,200,200,100);
  junglebg.addImage("moving_bg", jungleImage);
  junglebg.velocityX = -4;
  junglebg.x = junglebg.width/2;
  
  monkey = createSprite(85,15,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.07;
  
  ground = createSprite(450,380,800,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  ground.visible = false;
  
  score = 0;
  //survivalTime = 0;
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
}

function draw() {
  background("yellow");
  
  if(gameState === "play") {
    
    if(junglebg.x < 0) {
      junglebg.x = junglebg.width/2;
    }

    if(ground.x < 0) {
      ground.x = ground.width/2;
    }

    if(keyDown("space")) {
      monkey.velocityY = -12;
    }

    monkey.velocityY = monkey.velocityY+0.8;

    monkey.collide(ground);

    spawnBananas();

    spawnObstacles();

    drawSprites();

    stroke("white");
    textSize(20);
    fill("white");
    text("Score:"+score, 500, 50);

    stroke("black");
    textSize(20);
    fill("black");
    //survivalTime = Math.ceil(frameCount/frameRate());
    text("Survival Time:"+ score, 100, 50);

    if(foodGroup.isTouching(monkey)) {
      score = score+2;

      foodGroup.destroyEach();

      Monkey_size();
  }
  
  if(obstacleGroup.isTouching(monkey)) {
      ground.velocityX = 0;
      monkey.velocityY = 0;
      junglebg.velocityX = 0;

      monkey.scale = 0.07;

      foodGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0);

      foodGroup.setLifetimeEach(-1);
      obstacleGroup.setLifetimeEach(-1);

      gameState = "end";
    }
  }
  
  if(gameState === "end"){
    stroke("black");
    textSize(25);
    fill("black");
    text("Game Over",170,200);
  }
}

function Monkey_size() {
  switch(score) {
    case 10: monkey.scale = 0.09;
      break;
    case 20: monkey.scale = 0.1;
      break;
    case 30: monkey.scale = 0.2;
      break;
    case 40: monkey.scale = 0.3;
      break;
    case 50: monkey.sclae = 0.4;
      break;
    default:break;
  }
}

function spawnBananas() {
  if(frameCount % 80 === 0) {
    banana = createSprite(600,250,35,10);
    banana.y = Math.round(random(120,200));
    banana.velocityX = -5;
    
    banana.lifetime = 300;
    monkey.depth = banana.depth+1;
    
    banana.addImage(bananaImage);
    banana.scale = 0.07;
    
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,340,10,40);
    obstacle.velocityX = -5;
    
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    
    obstacle.lifetime = 300;
    
    obstacleGroup.add(obstacle);
  }
}

