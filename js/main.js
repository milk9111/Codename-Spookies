
function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
    this.timesFinished = 0;
}

Animation.prototype.drawFrame = function (game, tick, ctx, x, y, scale) {
    let lastFrame = false;
    if (!game.stop) {
        //console.log("drawing frame");
        let scaleBy = scale || 1;
        this.elapsedTime += tick;
        if (this.loop) {
            if (this.isDone()) {
                this.elapsedTime = 0;
                this.timesFinished++;
            }
        } else if (this.isDone()) {
            this.elapsedTime -= tick;
            lastFrame = true;
            this.timesFinished++;
        }

        let originalFrame = this.currentFrame();
        let index = originalFrame;
        let vindex = 0;
        if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
            index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
            vindex++;
        }
        while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
            index -= Math.floor(this.spriteSheet.width / this.frameWidth);
            vindex++;
        }

        let locX = x;
        let locY = y;
        let offset = vindex === 0 ? this.startX : 0;

        if (!this.reverse) {
            //console.log(index === this.frames - 1);
            if (index === (this.frames - 1) && game.moving) {
                index = originalFrame;
                this.elapsedTime = 0;
                vindex = 0;
            }
            ctx.drawImage(this.spriteSheet,
                          index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
                          this.frameWidth, this.frameHeight,
                          locX, locY,
                          this.frameWidth * scaleBy,
                          this.frameHeight * scaleBy);
        } else {
            if (index === (this.frames - 1) && game.moving) {
                index = originalFrame;
                this.elapsedTime = 0;
                vindex = 0;
            }
            ctx.drawImage(this.spriteSheet,
                index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
                this.frameWidth, this.frameHeight,
                locX, locY,
                this.frameWidth * scaleBy,
                this.frameHeight * scaleBy);

            //For now we can keep this top part here. Once we have actual sprites and animations we should switch to
            //this function below.
            //flipSpriteHorizontally(ctx, this.spriteSheet, locX, locY, index * this.frameWidth + offset,
            //    vindex * this.frameHeight + this.startY, this.frameWidth, this.frameHeight);
        }

        if (lastFrame) {
            this.elapsedTime = this.totalTime;
        }
    } else {
        //game.stop = false;
    }
}


/*
    Not my function, I took this from StackOverflow.
 */
function flipSpriteHorizontally(ctx, img, x, y, spriteX, spriteY, spriteW, spriteH){
    // move to x + img's width
    // adding img.width is necessary because we're flipping from
    //     the right side of the img so after flipping it's still
    //     at [x,y]
    ctx.translate(x+spriteW,y);

    // scaleX by -1; this "trick" flips horizontally
    ctx.scale(-1,1);

    // draw the img
    // no need for x,y since we've already translated
    ctx.drawImage(img,
                spriteX,spriteY,spriteW,spriteH,0,0,spriteW,spriteH
               );

    // always clean up -- reset transformations to default
    ctx.setTransform(1,0,0,1,0,0);
}

/**
 *
 * @param e1 {Object}
 * @param e1.x {number}
 * @param e1.y {number}
 * @param e2 {Object}
 * @param e2.x {number}
 * @param e2.y {number}
 * @param dist {number}
 */
function areEntitiesInRange(e1, e2, dist) {

    let xDist = Math.pow(Math.abs(e1.x - e2.x), 2);
    let yDist = Math.pow(Math.abs(e1.y - e2.y), 2);
    let distance = Math.sqrt(xDist + yDist);
    return distance <= dist;

}


Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

/** This is now a black background that chagnes when the level ends**/
class Background extends Entity
 {
     constructor (game) {
         super(game, 0, 0);
         this.canvasW = $("#gameWorld").width();
         this.canvasH = $("#gameWorld").height();
         this.alpha = 1;
         this.start = true;
         this.changing = true;
     }

    update ()  {

      //If starting level slowly fade black in, else slowly fade to black
      if (this.start && this.alpha > 0) {
        this.alpha = Number(this.alpha).toFixed(2) - Number(.01).toFixed(2);
        if (this.alpha <= 0) {
            this.changing = false;
        }
      } else if (!this.start) {
        this.alpha += .01;
      }
    }

    draw (ctx) {
      //Draw a black square with full alpha until it is time to change maps
      //then make it fade to black.
        if (this.changing) {
            ctx.globalAlpha = this.alpha;

            ctx.fillStyle = 'black';
            ctx.fillRect(this.x, this.y, this.canvasW, this.canvasH)
        }
    }
}



class Darkness extends Entity {

  constructor(game, player) {
    super(game, game.surfaceWidth, game.surfaceHeight);
    this.width = 1500;
    this.height = 1500;
    this.canvasW = $("#gameWorld").width();
    this.canvasH = $("#gameWorld").height();
    this.offSetSin = 0;
    this.player = player;
    this.newVal = 0;
    this.isDrawing = true;

    this.bottomBox = {
      x: 0,
      y: this.canvasW - 100,
      width: this.canvasW,
      height: 100
    };
    this.topBox = {
      x: 0,
      y: 0,
      width: this.canvasW,
      height: 100
    };
    this.leftBox = {
      x: 0,
      y: 0,
      width: 100,
      height: this.canvasH
    };
    this.rightBox = {
      x: this.canvasW,
      y: 0,
      width: 100,
      height: this.canvasH
    };
  }

  set drawing(isDrawing) {
    this.isDrawing = isDrawing;
  }

  update() {

    //Controls the darkness image and how it updates
    let temp = this.width + this.offSetSin;
    this.newVal = map(Math.sin(temp), -1, 1, 0, 100);
    this.offSetSin += .05;

    //This is controls the size of the darkness tied to the player health
    let offSet = map(this.player.health, 100, 0, 85, 800);

    this.x = -(this.game.surfaceWidth) + playerStartX + offSet;
    this.y = -(this.game.surfaceHeight) + playerStartY + offSet;

    let tempWandH = map(this.player.health, 0, 100, 0, 1500);
    this.width = tempWandH;
    this.height = tempWandH;

    //Controls the boxes around the darkness iamge
    //maps for x and y positions and width and height positions
    let xAndY = map(this.width, 1500, 0, this.canvasW, 350);
    let wAndH = map(this.width, 1500, 0, 0, 350);

    //Update dimensions and positions
    this.bottomBox.y = xAndY;
    this.bottomBox.height = wAndH + 100;

    this.topBox.height = wAndH;

    this.leftBox.width = wAndH;

    this.rightBox.x = xAndY;
    this.rightBox.width = wAndH + 100;
  }

  draw(ctx) {
    if (this.isDrawing) {
      ctx.drawImage(ASSET_MANAGER.getAsset("../img/light2.png"), this.x - this.newVal / 2, this.y - this.newVal / 2, this.width + this.newVal, this.height + this.newVal);
      Entity.prototype.draw.call(this);

      ctx.fillRect(this.rightBox.x, this.rightBox.y, this.rightBox.width, this.rightBox.height);
      ctx.fillRect(this.leftBox.x, this.leftBox.y, this.leftBox.width, this.leftBox.height);
      ctx.fillRect(this.topBox.x, this.topBox.y, this.topBox.width, this.topBox.height);
      ctx.fillRect(this.bottomBox.x, this.bottomBox.y, this.bottomBox.width, this.bottomBox.height);
    }


  }
}

class DarknessOutline extends Darkness {

  constructor(game, player) {
    super(game, player);
    this.x = -250;
    this.y = -250;
    this.width = 2500;
    this.height = 2500;
  }

  update() {
    // let xAndY = map(this.player.health, 100, 0, 0, 200);
    // let wAndH = map(this.player.health, 100, 0, 0, 800);
    // this.y = xAndY;
    // this.x = xAndY;
    // this.width = wAndH;
    // this.height = wAndH;
  }

  draw(ctx) {
      ctx.drawImage(ASSET_MANAGER.getAsset("../img/blackOutline.png"), this.x, this.y, this.width, this.height);
      Entity.prototype.draw.call(this);
  }
}


function drawDarkness() {
    darkness.drawing = document.getElementById('darknessCheck').checked;
}


function drawOutlines() {
    gameEngine.drawing = document.getElementById('collisionCheck').checked;
}

function toggleSound() {
    ASSET_MANAGER.toggleSound();
}


let darkness;
let playerStartX;
let playerStartY;
let gameEngine;

//1 = forward, 2 = downward, 3 = left, 4 = right
let facingDirection;



// the "main" code begins here
let ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("../img/blackness.png");
ASSET_MANAGER.queueDownload("../img/blackOutline.png");
ASSET_MANAGER.queueDownload("../img/sprites.png");
ASSET_MANAGER.queueDownload("../img/light2.png");
ASSET_MANAGER.queueDownload("../img/Hooded_Figure_SpriteSheet.png");
ASSET_MANAGER.queueDownload("../img/Fireball_SpriteSheet.png");
ASSET_MANAGER.queueDownload("../img/PlagueDoctor_SpriteSheet.png");
ASSET_MANAGER.queueDownload("../img/PD_Spell_SpriteSheet.png");
ASSET_MANAGER.queueDownload("../img/Spider_Monster_SpriteSheet.png");
ASSET_MANAGER.queueDownload("../img/Ball_of_Flesh_SpriteSheet.png");
ASSET_MANAGER.queueDownload("../img/codename-spookies_title_white.png");
ASSET_MANAGER.queueDownload("../snd/heartbeat.mp3", {sound:true});
ASSET_MANAGER.queueDownload("../snd/wyrm.mp3", {sound:true, volume: 0.1, loop:true});
ASSET_MANAGER.queueDownload("../snd/woman_scream.wav", {sound:true, volume: 0.5, loop:false});
ASSET_MANAGER.queueDownload("../snd/sword_woosh.wav", {sound:true, volume: 0.06, loop:false});
ASSET_MANAGER.queueDownload("../snd/crossbow.wav", {sound:true, volume: 0.003, loop:false});
ASSET_MANAGER.queueDownload("../snd/whispers.wav", {sound:true, volume: 0.0});
ASSET_MANAGER.queueDownload("../snd/footstep1.wav", {sound:true, volume: 0.06, rate: 2});
ASSET_MANAGER.queueDownload("../snd/charging_spell.flac", {sound:true, volume: 0.06, rate: 2, loop:true});

ASSET_MANAGER.downloadAll(function() {


  let canvas = document.getElementById('gameWorld');
  let ctx = canvas.getContext('2d');

  document.getElementById('darknessCheck').checked = false;
  document.getElementById('collisionCheck').checked = true;

  //LOAD ENTITIES
  //start facing downwards.
  facingDirection = 2;
  gameEngine = new GameEngine();
  gameEngine.drawing = document.getElementById('collisionCheck').checked;

  gameEngine.loadMap1(ctx, canvas);
  gameEngine.init(ctx);
  gameEngine.start();
});

/** Re-maps a number from one range to another.
*@param {int} value Incoming value to be converted
*@param {int} low1 Lower bound of the value's current range
*@param {int} high1 High bound of hte value's current range
*@param {int} low2 Lower bound of the value's target range
*@param {int} high2 Higher bound of the value's target range
*@return New valuw map to new range
*@author p5.js, basically ripped it off from there, since can't use CDN.
*/
function map(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}


//The original map setup in case we need it.
/*let player = new Player(gameEngine);
  //Load tile map
  let tileMap = new TileMap();
  tileMap.loadMap(Map.getTestMap(), 32, 32, gameEngine, player, ctx);

  //Load ObejctMap
  let objectMap = new ObjectMap();
  objectMap.loadMap(Map.getTestMapO(), 32, 32, player, ctx);


  let bg = new Background(gameEngine);
  darkness = new Darkness(gameEngine, player);
  //darknessOutline = new DarknessOutline(gameEngine, player);

  darkness.drawing = document.getElementById('darknessCheck').checked;

  //ADD ENTITIES

  //Add tiles
  for (let i = 0; i < tileMap.map2D.length; i++) {
    for (let j = 0; j < tileMap.map2D[i].length; j++) {

      let temp = new Tile(tileMap.map2D[i][j].x, tileMap.map2D[i][j].y, tileMap.map2D[i][j].type, gameEngine, player, ctx);
      gameEngine.addEntity(temp);
    }
  }

  //Add Objects to map
  for (let i = 0; i < objectMap.map2D.length; i++) {
    for (let j = 0; j < objectMap.map2D[i].length; j++) {

      //Add Potions
      if (objectMap.map2D[i][j] instanceof Potion) {
        //Potion (x, y, type, player)
        let temp = new Potion(objectMap.map2D[i][j].x, objectMap.map2D[i][j].y, objectMap.map2D[i][j].type, player, gameEngine);
        gameEngine.addEntity(temp);

        //Add Tile
      } else if (objectMap.map2D[i][j] instanceof Tile) {
        let temp = new Tile(objectMap.map2D[i][j].x, objectMap.map2D[i][j].y, objectMap.map2D[i][j].type, gameEngine, player, ctx);
        gameEngine.addEntity(temp);
      } else if (objectMap.map2D[i][j] instanceof Exit) {

        let temp = new Exit(objectMap.map2D[i][j].x, objectMap.map2D[i][j].y, player, gameEngine, bg);
        gameEngine.addEntity(temp);
      }
    }
  }

  gameEngine.addEntity(player);
  //Add Enemies to map
  for (let i = 0; i < objectMap.map2D.length; i++) {
    for (let j = 0; j < objectMap.map2D[i].length; j++) {

      //Add Plague Doctor
      if (objectMap.map2D[i][j] instanceof PlagueDoctor) {
        let temp = new PlagueDoctor(gameEngine, player, objectMap.map2D[i][j].x, objectMap.map2D[i][j].y);
        gameEngine.addEntity(temp);
      } else if (objectMap.map2D[i][j] instanceof Screamer) {
          let temp = new Screamer(gameEngine, player, objectMap.map2D[i][j].x, objectMap.map2D[i][j].y);
          gameEngine.addEntity(temp);
      }
    }
  }
  ASSET_MANAGER.playSound("../snd/wyrm.mp3");
  ASSET_MANAGER.playSound("../snd/heartbeat.mp3");
  ASSET_MANAGER.toggleSound();

  //gameEngine.addEntity(darknessOutline);
    player.darkness = darkness;
  gameEngine.addEntity(darkness);
  gameEngine.addEntity(bg);


  //START GAME
  gameEngine.init(ctx, player);
  player.x = (gameEngine.surfaceWidth / 2 - 32);
  player.y = (gameEngine.surfaceHeight / 2 - 32);
  playerStartX = (gameEngine.surfaceWidth / 2 - 32);
  playerStartY = (gameEngine.surfaceHeight / 2 - 32);
  console.log(player.x + ", " + player.y);*/