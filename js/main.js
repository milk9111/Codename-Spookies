
class Animation {
    constructor (spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
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

    drawFrame (game, tick, ctx, x, y, scale) {
        let lastFrame = false;
        if (!game.stop) {
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
            }

            if (lastFrame) {
                this.elapsedTime = this.totalTime;
            }
        }
    }
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


/** This is now a black background that changes when the level ends**/
class Background extends Entity
 {
     constructor (game) {
         super(game, 0, 0);
         this.canvasW = $("#gameWorld").width();
         this.canvasH = $("#gameWorld").height();
         this.alpha = 1;
         this.start = true;
         this.changing = true;
         this.uiPos = 0;

         this.step = .01;
         this.waitTimeBeforeFade = 0;
         this.waitTimeCount = 0;
     }

    /** Updates the background **/
    update ()  {

        if (this.waitTimeCount >= this.waitTimeBeforeFade) {
            //If starting level slowly fade black in, else slowly fade to black
            if (this.start && this.alpha > 0) {
                this.alpha = Number(this.alpha).toFixed(2) - Number(this.step).toFixed(2);
                if (this.alpha <= 0) {
                    this.changing = false;
                }
            } else if (!this.start && this.alpha <= 1) {
                this.alpha += .01;
            }
        } else {
            this.waitTimeCount++;
        }
    }

    /** Draws the background when needed
    *@param {context} ctx Canvas element
    **/
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
    super(game, game.surfaceWidth, game.surfaceHeight, false, 0, 0, 0, 0, "Darkness");
    this.game = game;
    this.width = 1500;
    this.height = 1500;
    this.canvasW = $("#gameWorld").width();
    this.canvasH = $("#gameWorld").height();
    this.offSetSin = 0;
    this.player = player;
    this.newVal = 0;
    this.isDrawing = true;
    this.isExpanding = false;

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
      width: 50,
      height: this.canvasH
    };
  }

  set drawing(isDrawing) {
    this.isDrawing = isDrawing;
  }

  update() {

    //Controls the darkness image and how it updates
    let temp = this.width + this.offSetSin;

    //Real health for player, so prevents the darkness from being to small
    let fakeHealth = this.player.health + 25;

    //This makes it so the darkenss isn't to large
    if (fakeHealth > 100) {
      fakeHealth = 100;
    }

    if (fakeHealth > 25 ) {

      this.newVal = map(Math.sin(temp), -1, 1, 0, 100);
      this.offSetSin += .05;

      //This is controls the size of the darkness tied to the player health
      let offSet = map(fakeHealth, 100, 0, 85, 800);

      this.x = -(this.game.surfaceWidth) + playerStartX + offSet;
      this.y = -(this.game.surfaceHeight) + playerStartY + offSet;

      if (!this.isExpanding) {
          let tempWandH = map(fakeHealth, 0, 100, 0, 1500);
          this.width = tempWandH;
          this.height = tempWandH;
      }

      //Controls the boxes around the darkness image
      //maps for x and y positions and width and height positions
      let xAndY = map(this.width, 1500, 0, this.canvasW, 350);
      let wAndH = map(this.width, 1500, 0, 0, 350);

      //Update dimensions and positions
      this.bottomBox.y = xAndY;
      this.bottomBox.height = wAndH + 100;

      this.topBox.height = wAndH;

      this.leftBox.width = wAndH;

      this.rightBox.x = xAndY + 50;
      this.rightBox.width = wAndH + 50;
    }

  }

  draw(ctx) {
    if (this.isDrawing) {
      ctx.drawImage(ASSET_MANAGER.getAsset("../img/light2.png"), this.x - this.newVal / 2  + 10, this.y - this.newVal / 2 - 12, this.width + this.newVal, this.height + this.newVal);
        //this.cropForProjectiles(ctx);
      Entity.prototype.draw.call(this);

      ctx.fillRect(this.rightBox.x, this.rightBox.y, this.rightBox.width, this.rightBox.height);
      ctx.fillRect(this.leftBox.x, this.leftBox.y, this.leftBox.width, this.leftBox.height);
      ctx.fillRect(this.topBox.x, this.topBox.y, this.topBox.width, this.topBox.height);
      ctx.fillRect(this.bottomBox.x, this.bottomBox.y, this.bottomBox.width, this.bottomBox.height);
    }

  }

  cropForProjectiles (ctx) {
      let projectiles = this.game.projectiles;

      for (let i = 0; i < projectiles.length; i++) {
          Darkness.cropSingleProjectile(ctx, projectiles[i].x + 20, projectiles[i].y + 20, projectiles[i].width, projectiles[i].height);
      }
  }

   static cropSingleProjectile (ctx, imageX, imageY, imageWidth, imageHeight) {
      let imageData = ctx.getImageData(imageX, imageY, imageWidth, imageHeight);

      let data = imageData.data;

      for(let p = 0, len = data.length; p < len; p+=4) {
          data[p    ] = data[p    ]; //red
          data[p + 1] = data[p + 1]; //green
          data[p + 2] = data[p + 2]; //blue
          data[p + 3] = 255; //alpha
      }
      ctx.putImageData(imageData, imageX, imageY);
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
    if (document.getElementById('soundCheck').checked) {
        document.getElementById('soundLabel').innerText = "Disable Sounds";
    } else {
        document.getElementById('soundLabel').innerText = "Enable Sounds";
    }
    ASSET_MANAGER.toggleSound();
}


let darkness;
let playerStartX;
let playerStartY;
let gameEngine;

//up, down, left, right
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
ASSET_MANAGER.queueDownload("../img/Crypt_Worm_SpriteSheet.png");
ASSET_MANAGER.queueDownload("../img/Grave_Wraith_SpriteSheet.png");
ASSET_MANAGER.queueDownload("../img/Spookie_Boi_SpriteSheet.png");
ASSET_MANAGER.queueDownload("../img/Light_Spell.png");
ASSET_MANAGER.queueDownload("../img/Freeze_Spell.png");
ASSET_MANAGER.queueDownload("../img/Heal_Spell.png");
ASSET_MANAGER.queueDownload("../img/logo.png");
ASSET_MANAGER.queueDownload("../img/start.png");
ASSET_MANAGER.queueDownload("../img/start_hover.png");
ASSET_MANAGER.queueDownload("../img/death_screen.png");
ASSET_MANAGER.queueDownload("../img/restart.png");
ASSET_MANAGER.queueDownload("../img/win_screen.png");
ASSET_MANAGER.queueDownload("../img/restart_hover.png");
ASSET_MANAGER.queueDownload("../snd/heartbeat.mp3", {sound:true});
ASSET_MANAGER.queueDownload("../snd/screamer.wav", {sound:true, volume:0.1, loop:false});
ASSET_MANAGER.queueDownload("../snd/player_death_scream.mp3", {sound:true, loop:false});
ASSET_MANAGER.queueDownload("../snd/wyrm.mp3", {sound:true, volume: 0.1, loop:true});
ASSET_MANAGER.queueDownload("../snd/woman_scream.wav", {sound:true, volume: 0.1, loop:false});
ASSET_MANAGER.queueDownload("../snd/boss_battle.wav", {sound:true, volume: 0.5, loop:true});
ASSET_MANAGER.queueDownload("../snd/sword_woosh.wav", {sound:true, volume: 0.06, loop:false});
ASSET_MANAGER.queueDownload("../snd/crossbow.wav", {sound:true, volume: 0.003, loop:false});
ASSET_MANAGER.queueDownload("../snd/whispers.wav", {sound:true, volume: 0.1});
ASSET_MANAGER.queueDownload("../snd/footstep1.wav", {sound:true, volume: 0.06, rate: 2});
ASSET_MANAGER.queueDownload("../snd/charging_spell.flac", {sound:true, volume: 0.06, rate: 2, loop:true});
ASSET_MANAGER.queueDownload("../snd/fireball.mp3", {sound:true, volume: 0.1});
ASSET_MANAGER.queueDownload("../snd/heal.mp3", {sound:true, volume: 0.05});
ASSET_MANAGER.queueDownload("../snd/lightspell.wav", {sound:true, volume: 0.05});
ASSET_MANAGER.queueDownload("../snd/shield_block.wav", {sound:true, volume: 0.2});
ASSET_MANAGER.queueDownload("../snd/fleshy.wav", {sound: true, volume: 0.5});

ASSET_MANAGER.downloadAll(function() {


  let canvas = document.getElementById('gameWorld');
  let ctx = canvas.getContext('2d');

    document.getElementById('darknessCheck').checked = true;
    document.getElementById('collisionCheck').checked = false;
    document.getElementById('soundCheck').checked = true;

    //LOAD ENTITIES
  //start facing downwards.
  facingDirection = "down";
  gameEngine = new GameEngine();
    drawOutlines();
  //gameEngine.drawing = false;
  gameEngine.init(ctx);
  gameEngine.loadTitleScreen(ctx);
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
