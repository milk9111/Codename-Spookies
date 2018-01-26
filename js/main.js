
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

class Background extends Entity
 {
     constructor (game) {
         super(game, 0, 400);
         this.radius = 200;
     }

    update ()  {
    }

    draw (ctx) {
        let tile_background = new Image();
        tile_background.src = "../img/Tileable3f.png";
        tile_background.onload = function(){
            let pattern = ctx.createPattern(tile_background, "repeat");
            ctx.fillStyle = pattern;
            ctx.fill();
            //Entity.prototype.draw.call(this);
        };
    }
}



class Darkness extends Entity  {

    constructor (game) {
        super(game, game.surfaceWidth, game.surfaceHeight);
        this.width = 1500;
        this.height = 1500;
        this.offSetSin = 0;
        this.newVal = 0;
        this.isDrawing = true;
    }

    set drawing (isDrawing) {
        this.isDrawing = isDrawing;
    }

    update () {

        let temp = this.width + this.offSetSin;
        this.newVal = map(Math.sin(temp),-1, 1, 0, 100);
        this.offSetSin += .05;

        this.x = -(this.game.surfaceWidth) + playerStartX + 85;
        this.y = -(this.game.surfaceHeight) + playerStartY + 85;
    }

    draw (ctx) {
        if (this.isDrawing) {
            ctx.drawImage(ASSET_MANAGER.getAsset("../img/light2.png"), this.x - this.newVal / 2, this.y - this.newVal / 2, this.width + this.newVal, this.height + this.newVal);
            Entity.prototype.draw.call(this);
        }
    }
}


function drawDarkness() {
    darkness.drawing = document.getElementById('darknessCheck').checked;
}


function drawOutlines() {
    gameEngine.drawing = document.getElementById('collisionCheck').checked;
}


let darkness;
let playerStartX;
let playerStartY;
let gameEngine;

//1 = forward, 2 = downward, 3 = left, 4 = right
let facingDirection;



// the "main" code begins here
let ASSET_MANAGER = new AssetManager();
//We will want to switch to this for a dynamic background, for now it is being
//repeated onto the canvas through style.css
//ASSET_MANAGER.queueDownload("../img/Tileable3f.png");
//ASSET_MANAGER.queueDownload("../img/Player_Box.png");
ASSET_MANAGER.queueDownload("../img/blackness.png");
ASSET_MANAGER.queueDownload("../img/sprites.png");
ASSET_MANAGER.queueDownload("../img/light2.png");
ASSET_MANAGER.queueDownload("../img/Hooded_Figure_SpriteSheet.png");
ASSET_MANAGER.queueDownload("../img/Fireball_SpriteSheet.png");
ASSET_MANAGER.queueDownload("../img/PlagueDoctor_SpriteSheet.png");
ASSET_MANAGER.queueDownload("../snd/heartbeat.mp3", {sound:true});
ASSET_MANAGER.queueDownload("../snd/wyrm.mp3", {sound:true, volume: 0.1, loop:true});
ASSET_MANAGER.queueDownload("../snd/woman_scream.wav", {sound:true, volume: 0.5, loop:false});
ASSET_MANAGER.queueDownload("../snd/sword_woosh.wav", {sound:true, volume: 0.06, loop:false});
ASSET_MANAGER.queueDownload("../snd/crossbow.wav", {sound:true, volume: 0.003, loop:false});
ASSET_MANAGER.queueDownload("../snd/whispers.wav", {sound:true, volume: 0.0, loop:true});
ASSET_MANAGER.queueDownload("../snd/footstep1.wav", {sound:true, volume: 0.06, rate: 2, loop:true});
ASSET_MANAGER.queueDownload("../snd/charging_spell.flac", {sound:true, volume: 0.06, rate: 2, loop:true});

ASSET_MANAGER.downloadAll(function() {


  let canvas = document.getElementById('gameWorld');
  let ctx = canvas.getContext('2d');

  document.getElementById('darknessCheck').checked = true;
  document.getElementById('collisionCheck').checked = false;

  //LOAD ENTITIES
  //start facing downwards.
  facingDirection = 2;
  gameEngine = new GameEngine();
  gameEngine.drawing = document.getElementById('collisionCheck').checked;

  let player = new Player(gameEngine);

  //Load tile map
  let tileMap = new TileMap();
  tileMap.loadMap(Map.getTestMap(), 32, 32, gameEngine, player, ctx);

  //Load ObejctMap
  let objectMap = new ObjectMap();
  objectMap.loadMap(Map.getTestMapO(), 32, 32, player, ctx);


  let bg = new Background(gameEngine);
  darkness = new Darkness(gameEngine);
  darkness.drawing = document.getElementById('darknessCheck').checked;

  //ADD ENTITIES
  //gameEngine.addEntity(bg);

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
      }
    }
  }
  ASSET_MANAGER.getAsset("../snd/wyrm.mp3").play();
  //ASSET_MANAGER.getAsset("../snd/heartbeat.mp3").play();

  gameEngine.addEntity(darkness);

  //START GAME
  gameEngine.init(ctx);
  player.x = (gameEngine.surfaceWidth / 2 - 32);
  player.y = (gameEngine.surfaceHeight / 2 - 32);
  playerStartX = (gameEngine.surfaceWidth / 2 - 32);
  playerStartY = (gameEngine.surfaceHeight / 2 - 32);
  console.log(player.x + ", " + player.y);

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
