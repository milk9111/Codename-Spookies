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
}

Animation.prototype.drawFrame = function (game, tick, ctx, x, y, scaleBy) {
    if (!game.stop) {
        //console.log("drawing frame");
        var scaleBy = scaleBy || 1;
        this.elapsedTime += tick;
        if (this.loop) {
            if (this.isDone()) {
                this.elapsedTime = 0;
            }
        } else if (this.isDone()) {
            return;
        }
        //var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();

        var originalFrame = this.currentFrame();
        var index = originalFrame;
        var vindex = 0;
        if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
            index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
            vindex++;
        }
        while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
            index -= Math.floor(this.spriteSheet.width / this.frameWidth);
            vindex++;
        }

        var locX = x;
        var locY = y;
        var offset = vindex === 0 ? this.startX : 0;

        if (!this.reverse) {
            //console.log(index === this.frames - 1);
            if (index === (this.frames - 1) && game.moving) {
                console.log("in here");
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
            flipSpriteHorizontally(ctx, this.spriteSheet, locX, locY, index * this.frameWidth + offset, 
                vindex * this.frameHeight + this.startY, this.frameWidth, this.frameHeight);
        }
    } else {
        //game.stop = false;
    }
}


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


Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

function Background(game) {
    Entity.call(this, game, 0, 400);
    this.radius = 200;
}

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
}

Background.prototype.draw = function (ctx) {
    ctx.fillStyle = "SaddleBrown";
    ctx.fillRect(0,500,800,300);
    Entity.prototype.draw.call(this);
}

function Unicorn(game) {
    //this.animation = new Animation(ASSET_MANAGER.getAsset("./img/RobotUnicorn.png"), 0, 0, 206, 110, 0.02, 30, true, true);
    //this.jumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/RobotUnicorn.png"), 618, 334, 174, 138, 0.02, 40, false, true);

                                                        //spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse
    this.idleAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Kevin_Idle.png"), 0, 0, 64, 64, 0.1, 10, true, false);
    this.idleBackwardAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Kevin_Idle.png"), 0, 0, 64, 64, 0.1, 10, true, true);
    this.walkForwardAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Kevin_Walking.png"), 0, 0, 64, 64, 0.1,  2, false, false);
    this.walkBackwardAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Kevin_Walking.png"), 0, 0, 64, 64, 0.1,  4, false, true);
    this.jumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/hero_spritesheet.png"), 80, 280, 80, 100, 0.25, 2, false, false);
    this.jumping = false;
    this.walkingForward = false;
    this.walkingBackward = false;
    this.turnedAround = false;
    this.inMotion = false;
    this.radius = 100;
    this.ground = 418;
    Entity.call(this, game, 50, 418); //(0, 400) signify where the sprite will be drawn.
}

Unicorn.prototype = new Entity();
Unicorn.prototype.constructor = Unicorn;

Unicorn.prototype.update = function () {
    if (!this.game.stop) {
        if (this.game.space) {
            this.jumping = true;
        }

        if (this.game.forward) {
            this.walkingForward = true;
        }

        if (this.game.backward) {
            this.walkingBackward = true;
            this.game.backward = false;
        }

        if (this.jumping) {
            if (this.jumpAnimation.isDone()) {
                this.jumpAnimation.elapsedTime = 0;
                this.jumping = false;
            }
            var jumpDistance = this.jumpAnimation.elapsedTime / this.jumpAnimation.totalTime;
            var totalHeight = 200;

            if (jumpDistance > 0.5)
                jumpDistance = 1 - jumpDistance;

            //var height = jumpDistance * 2 * totalHeight;
            var height = totalHeight*(-4 * (jumpDistance * jumpDistance - jumpDistance));
            this.y = this.ground - height;
        }

        if (this.walkingForward) {
            if (this.walkForwardAnimation.isDone()) {
                this.walkForwardAnimation.elapsedTime = 0;
                this.walkingForward = false;
            }

            var walkDistance = this.walkForwardAnimation.elapsedTime / this.walkForwardAnimation.totalTime;
            var totalDistance = 5;

            if (walkDistance > 0.5)
                walkDistance = 1 - walkDistance;

            var distance = totalDistance*(-4 * (walkDistance * walkDistance - walkDistance));
            this.x = this.x + distance;
        }

        if (this.walkingBackward) {
            if (this.walkBackwardAnimation.isDone()) {
                this.walkBackwardAnimation.elapsedTime = 0;
                this.walkingBackward = false;
            }

            var walkDistance = this.walkBackwardAnimation.elapsedTime / this.walkBackwardAnimation.totalTime;
            var totalDistance = 5;

            if (walkDistance > 0.5)
                walkDistance = 1 - walkDistance;

            var distance = totalDistance*(-4 * (walkDistance * walkDistance - walkDistance));
            this.x = this.x - distance;
        }
        Entity.prototype.update.call(this);
    }    
}

Unicorn.prototype.clear = function () {
    this.walkForwardAnimation.elapsedTime = 0;
    this.walkBackwardAnimation.elapsedTime = 0;
}

Unicorn.prototype.draw = function (ctx) {
    if (!this.game.stop) {
        if (this.jumping) {
            this.jumpAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        }
        else if (this.walkingForward) {
            this.walkForwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
            this.turnedAround = false;
        }
        else if (this.walkingBackward) {
            this.walkBackwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
            this.turnedAround = true;
        }
        else {
            if (this.turnedAround) {
                this.idleBackwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
            } else {
                this.idleAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
            }
        }
        Entity.prototype.draw.call(this);
    }

    
}

// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/hero_spritesheet.png");
ASSET_MANAGER.queueDownload("./img/Kevin_Idle.png");
ASSET_MANAGER.queueDownload("./img/Kevin_Walking.png");

ASSET_MANAGER.downloadAll(function () {
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    var bg = new Background(gameEngine);
    var unicorn = new Unicorn(gameEngine);

    gameEngine.addEntity(bg);
    gameEngine.addEntity(unicorn);
 
    gameEngine.init(ctx);
    gameEngine.start();
});
