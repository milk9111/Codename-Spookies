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
    var tile_background = new Image();
    tile_background.src = "../img/Tileable3f.png";
    tile_background.onload = function(){
        var pattern = ctx.createPattern(tile_background, "repeat");
        ctx.fillStyle = pattern;
        ctx.fill();
        //Entity.prototype.draw.call(this);
    };
}


/**
 * This is the 'constructor' for the Player object. It holds all of the instance fields
 * for the Player like animations and what the current motion/direction they are doing is.
 *
 * @param game The instance of the GameEngine
 * @constructor
 * @author Connor Lundberg
 */
function Player(game) {
    //spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse
    this.idleAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Player_Box.png"), 0, 0, 64, 64, 0.1, 1, true, false);
    this.walkRightAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Player_Box.png"), 0, 0, 64, 64, 0.1,  1, false, false);
    this.walkLeftAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Player_Box.png"), 0, 0, 64, 64, 0.1,  1, false, false);
    this.walkForwardAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Player_Box.png"), 0, 0, 64, 64, 0.1,  1, false, false);
    this.walkBackwardAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Player_Box.png"), 0, 0, 64, 64, 0.1,  1, false, false);

    this.jumping = false;
    this.walkingRight = false;
    this.walkingLeft = false;
    this.walkingForward = false;
    this.walkingBackward = false;
    this.turnedAround = false;
    this.inMotion = false;
    this.radius = 100;
    this.ground = 418;
    Entity.call(this, game, 50, 418); //(0, 400) signify where the sprite will be drawn.

}

//makes Player a child of Entity
Player.prototype = new Entity();
Player.prototype.constructor = Player;


/**
 * Here the Player will decide what direction they're moving towards next.
 * It handles the actual x & y movement value for the Player object. This
 * is NOT the animation handler.
 *
 * To change the speed of the Player, simply raise or lower the totalDistance variable.
 *
 * @author Connor Lundberg
 */
Player.prototype.update = function () {
    var totalDistance = 10;

    if (this.game.right) {
        this.walkingRight = true;
        this.game.right = false;
    }

    if (this.game.left) {
        this.walkingLeft = true;
        this.game.left = false; //consider removing these if controls stop working
    }

    if (this.game.forward) {
        this.walkingForward = true;
        this.game.forward = false;
    }

    if (this.game.backward) {
        this.walkingBackward = true;
        this.game.backward = false;
    }

    if (this.walkingRight) {
        if (this.walkRightAnimation.isDone()) {
            this.walkRightAnimation.elapsedTime = 0;
            this.walkingRight = false;
        }

        var walkDistance = this.walkRightAnimation.elapsedTime / this.walkRightAnimation.totalTime;

        if (walkDistance > 0.5)
            walkDistance = 1 - walkDistance;

        var distance = totalDistance*(-4 * (walkDistance * walkDistance - walkDistance));
        this.x = this.x + distance;
    }

    if (this.walkingLeft) {
        if (this.walkLeftAnimation.isDone()) {
            this.walkLeftAnimation.elapsedTime = 0;
            this.walkingLeft = false;
        }

        var walkDistance = this.walkLeftAnimation.elapsedTime / this.walkLeftAnimation.totalTime;

        if (walkDistance > 0.5)
            walkDistance = 1 - walkDistance;

        var distance = totalDistance*(-4 * (walkDistance * walkDistance - walkDistance));
        this.x = this.x - distance;
    }

    if (this.walkingForward) {
        if (this.walkForwardAnimation.isDone()) {
            this.walkForwardAnimation.elapsedTime = 0;
            this.walkingForward = false;
        }

        var walkDistance = this.walkForwardAnimation.elapsedTime / this.walkForwardAnimation.totalTime;

        if (walkDistance > 0.5)
            walkDistance = 1 - walkDistance;

        var distance = totalDistance*(-4 * (walkDistance * walkDistance - walkDistance));
        this.y = this.y - distance;
    }

    if (this.walkingBackward) {
        if (this.walkBackwardAnimation.isDone()) {
            this.walkBackwardAnimation.elapsedTime = 0;
            this.walkingBackward = false;
        }

        var walkDistance = this.walkBackwardAnimation.elapsedTime / this.walkBackwardAnimation.totalTime;

        if (walkDistance > 0.5)
            walkDistance = 1 - walkDistance;

        var distance = totalDistance*(-4 * (walkDistance * walkDistance - walkDistance));
        this.y = this.y + distance;
    }
    Entity.prototype.update.call(this);

}


/**
 * Here the corresponding movement direction (as chosen in Player.prototype.update) will
 * start the animation for that action. If no movement is going, it will go to the idle
 * animation.
 *
 * @param ctx The context to draw the image onto.
 * @author Connor Lundberg
 */
Player.prototype.draw = function (ctx) {
    if (this.walkingRight) {
        this.walkRightAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        this.turnedAround = false;
    }
    else if (this.walkingLeft) {
        this.walkLeftAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        this.turnedAround = true;
    }
    else if (this.walkingForward) {
        this.walkForwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
    }
    else if (this.walkingBackward) {
        this.walkBackwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
    }
    else {
        this.idleAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
    }
    Entity.prototype.draw.call(this);

}

// the "main" code begins here
var ASSET_MANAGER = new AssetManager();
//We will want to switch to this for a dynamic background, for now it is being
//repeated onto the canvas through style.css
//ASSET_MANAGER.queueDownload("../img/Tileable3f.png");
ASSET_MANAGER.queueDownload("../img/Player_Box.png");


ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da shield");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    var bg = new Background(gameEngine);
    var player = new Player(gameEngine);

    gameEngine.addEntity(bg);
    gameEngine.addEntity(player);
 
    gameEngine.init(ctx);
    gameEngine.start();
});
