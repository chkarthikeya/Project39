//  to create variables
var PLAY=1;
var END=0;
var gameState=1;
var sword, monster ,fruit;
var swordImage ,monsterImage ,fruit1 ,fruit2 ,fruit3 ,fruit4;
var gameOverImage ,gameOverSound ,score, knifeSwordMusic;
var reset ,resetImg;


function preload(){
  //to load images and animation
  swordImage=loadImage("sword1-removebg-preview.png");
  monsterImage=loadAnimation("monster1-removebg-preview.png","monster2-removebg-preview.png");
  fruit1=loadImage("apple-removebg-preview.png");
  fruit2=loadImage("berry-removebg-preview.png");
  fruit3=loadImage("grapes-removebg-preview.png");
  fruit4=loadImage("pine-removebg-preview.png");
  gameOverImage=loadImage("gameover.png");
  gameOverSound=loadSound("gameover.mp3");
  knifeSwordMusic=loadSound("knifeSwooshSound.mp3");
 
  
}

function setup(){
  //to create canvas
  createCanvas(windowWidth,windowHeight);
  
  
  
  //to create sword sprite and add image to it and to adjust its size
  sword=createSprite(windowWidth / 2, windowHeight / 2 ,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;
  
 // to create score
  score=0;
  
 //to create fruit and enemy group
  fruitGroup= new Group();
  enemyGroup= new Group();

  
}

function draw(){
background("lightBlue");
  
  // to text score 
  text("Score:"+score,windowWidth / 2 + camera.position.x - 200, 120);
  
  camera.position.x = sword.x;
  camera.position.y = sword.y;
  
  if(gameState===PLAY){
    // to move sword according to the mouse 
    sword.y=World.mouseY;
    sword.x=World.mouseX;
    
    sword.addImage(swordImage);
    
    //to increase the score and destroy the fruit when the fruit touches the sword
  if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    score=score+2;
    knifeSwordMusic.play();
  }
    
    // to turn the game to end state from the play state when the monster(enemy) touches the sword
  if(enemyGroup.isTouching(sword)){
   
    gameState=END;
  }  
  
    
  }
  else if(gameState===END){
   
    // to destroy fruits and enemies and to play gameOverSound and to show game over the game is in the end state
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.velocityX=0;
    enemyGroup.velocityX=0;
    sword.addImage(gameOverImage);
    sword.y=windowHeight / 2 ;
    sword.x=windowWidth / 2-80;
    score = 0;

    stroke("black");
    textSize(20);
    text("Click Space To Restart",windowWidth / 2-20, windowHeight / 2-200);
    
  }

  if(keyDown("space")){
    gameState=1;
  }
  
  fruits();
  enemy();
   // to text score 
  
  drawSprites();
}

function fruits(){
  
  //to create fruit sprite after every 80 frames at random y position and choose a fruit to show it in the game and to add this in fruits  group
  if( World.frameCount%80===0){
    fruit=createSprite(camera.position.x + windowWidth / 2,
      windowHeight - 60,20,20)
    fruit.scale=0.2;
    
    r=Math.round(random(1,4));  
  if(r===1){
    fruit.addImage(fruit1);
  } 
  else if(r===2){
    fruit.addImage(fruit2);
  }
  else if(r===3){
    fruit.addImage(fruit3);
  }
  else if(r===4){
    fruit.addImage(fruit4);
  }
    
  // to make the fruits come from both the sides and to increase the speed after every 4 score  
  position= Math.round(random(1,2));
    
    if(position==1){
      fruit.x=2000;
      fruit.velocityX=-(7+(score/4));
    }
   else if (position==2){ 
   fruit.x=0;
     fruit.velocityX = (7 +( score/10));
   }   
    fruit.y=Math.round(random(50,340));
    fruit.setLifetime=100;
    
    
    
    fruitGroup.add(fruit);
  }
}

function enemy(){
  
  //to create monster sprite after every 200 frames at random y position and to add this in enemy  group and to increase the speed after every 10 sccore
  if(World.frameCount%200===0){
    monster=createSprite(camera.position.x + windowWidth / 2,
      windowHeight - 60,20,20);
    monster.addAnimation("moving",monsterImage);
    monster.scale=0.5;
    monster.y=Math.round(random(100,1000));
    monster.velocityX = -(8 + (score/10));
    monster.setLifetime=50;
    
    
    
    enemyGroup.add(monster);
  }
}










