var sword, sImg;
var bg, bImg;
var f1, f2, f3, f4;
var rand, rand2;
var fgroup, f1g, f2g, f3g, f4g;
var score = 0;
var play = 1;
var end = 0;
var gameState = play;
var eimg, egroup;
var gameOver, go;
var Gsound, CutSound;



function setup(){
  createCanvas(580, 330);
  bg = createSprite(290, 165);
  bg.scale = 2.5;
 
  fgroup = createGroup();
  f1g = createGroup();
  f2g = createGroup();
  f3g = createGroup();
  f4g = createGroup();
   
 sword = createSprite(200, 200);
  sword.scale = 0.5;
  
  egroup = createGroup();
  gameOver = createSprite(width/2, height/2);
  gameOver.visible = false;
}

function preload(){
  sImg = loadImage("sword.png");
  bImg = loadImage("bg.jfif");
  f1 = loadImage("fruit1.png");
  f2 = loadImage("fruit2.png");
  f3 = loadImage("fruit3.png");
  f4 = loadImage("fruit4.png");
  eimg = loadImage("alien1.png");
  go = loadImage("gameover.png");
  Gsound = loadSound("gameover.mp3");
  CutSound = loadSound("knifeSwooshSound.mp3");
}

function draw(){
 
  rand = Math.round(random(1,4));
  rand2 = Math.round(random(1, 2));
  bg.addImage(bImg);
  
  sword.addImage(sImg);
  sword.x = World.mouseX;
  sword.y = World.mouseY;
  
  gameOver.addImage(go);
  gameOver.scale = 2;
  
  
  spawnFruits();
  
  if(sword.isTouching(f1g)){
    f1g.destroyEach();
    score = score+1;
    CutSound.play();
  }
  if(sword.isTouching(f2g)){
    f2g.destroyEach();
    score = score+1;
    CutSound.play();
  }
  if(sword.isTouching(f3g)){
    f3g.destroyEach();
    score = score+1;
    CutSound.play();
  }
  if(sword.isTouching(f4g)){
    f4g.destroyEach();
    score = score+1;
    CutSound.play();
  }
  createEdgeSprites();
  spawnEnemy();
  
  if(egroup.isTouching(sword)){
    gameState = end;
    Gsound.play();
  }
 drawSprites();
  fill(255, 100, 0);
  textSize(38);
  textFont("Georgia");
  text("Score:"+score , 400, 50);
  if(gameState === end){
    gameOver.visible = true;
    sword.destroy();
    egroup.destroyEach();
    egroup.setVelocityEach(0, 0);
    fgroup.destroyEach();
    fgroup.setVelocityEach(0, 0);
  }
 
}

function spawnFruits(){
  
  if(frameCount%60===0&&rand2 === 1){
    var fruit = createSprite(random(width),380);
    fruit.velocityY = -10-(score/10);
    if(rand === 1){
      fruit.addImage(f1);
      fruit.scale = 0.2;
      f1g.add(fruit);
    }else if(rand === 2){
      fruit.addImage(f2);
      fruit.scale = 0.2;
      f2g.add(fruit);
    }else if(rand === 3){
      fruit.addImage(f3);
      fruit.scale = 0.2;
      f3g.add(fruit);
    }else{
      fruit.addImage(f4);
      fruit.scale = 0.2;
      f4g.add(fruit);
    }
  
  fgroup.add(fruit);
    fruit.lifetime = 39;
    
}
  if(frameCount%60===0&&rand2 === 2){
    let fruit = createSprite(random(width),-50);
    fruit.velocityY = 10+(score/10);
    if(rand === 1){
      fruit.addImage(f1);
      fruit.scale = 0.2;
      f1g.add(fruit);
    }else if(rand === 2){
      fruit.addImage(f2);
      fruit.scale = 0.2;
      f2g.add(fruit);
    }else if(rand === 3){
      fruit.addImage(f3);
      fruit.scale = 0.2;
      f3g.add(fruit);
    }else{
      fruit.addImage(f4);
      fruit.scale = 0.2;
      f4g.add(fruit);
    }
  
  fgroup.add(fruit);
    fruit.lifetime = 39;
    
}
  
}
function spawnEnemy(){
  if(frameCount%200===0||frameCount%150===0&&rand2 === 1){
    var enemy = createSprite(random(width), 380);
    enemy.velocityY = -25;
    enemy.addImage(eimg);
    enemy.scale = 1.5;
    enemy.lifeTime = 16;
    egroup.add(enemy);
    
  }
  if(frameCount%200===0||frameCount%150===0&&rand2 === 2){
    let enemy = createSprite(random(width), -50);
    enemy.velocityY = 25;
    enemy.addImage(eimg);
    enemy.scale = 1.5;
    enemy.lifeTime = 16;
    egroup.add(enemy);
    
  }
}