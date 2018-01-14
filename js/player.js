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
    this.idleAnimationForward = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 128, 0, 64, 64, 0.3, 2, true, false);
    this.idleAnimationBackward = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 0, 0, 64, 64, 0.3, 2, true, false);
    this.idleAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 256, 0, 64, 64, 0.3, 2, true, false);
    this.idleAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 0, 64, 64, 64, 0.3, 2, true, false);
    this.walkRightAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 256, 128, 64, 64, 0.15,  4, false, false);
    this.walkLeftAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 0, 128, 64, 64, 0.15,  4, false, false);
    this.walkForwardAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 256, 64, 64, 64, 0.3,  2, false, false);
    this.walkBackwardAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 128, 64, 64, 64, 0.3,  2, false, false);
    this.swingBackwardAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 128, 192, 64, 64, 0.1,  3, false, false);
    this.swingForwardAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 320, 192, 64, 64, 0.1,  3, false, false);
    this.swingLeftAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 320, 256, 64, 64, 0.1,  3, false, false);
    this.swingRightAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 128, 256, 64, 64, 0.1,  3, false, false);


    this.jumping = false;
    this.walkingRight = false;
    this.walkingLeft = false;
    this.walkingForward = false;
    this.walkingBackward = false;
    this.turnedAround = false;
    this.inMotion = false;
    this.swinging = false;
    this.radius = 100;
    this.ground = 418;

    //If moving off screen
    this.offRight = false;
    this.offLeft = false;
    this.offTop = false;
    this.offBottom = false;

    Entity.call(this, game, game.surfaceWidth/2, game.surfaceHeight/2); //(0, 400) signify where the sprite will be drawn.

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
    var totalDistance = 2;

    if (this.game.right) {
        facingDirection = 4;
        this.walkingRight = true;
        this.game.right = false;
    }

    if (this.game.left) {
        facingDirection = 3;
        this.walkingLeft = true;
        this.game.left = false; //consider removing these if controls stop working
    }

    if (this.game.forward) {
        facingDirection = 1;
        this.walkingForward = true;
        this.game.forward = false;
    }

    if (this.game.backward) {
        facingDirection = 2;
        this.walkingBackward = true;
        this.game.backward = false;
    }

    if (this.game.swing) {
        this.swinging = true;
        this.game.swing = false;
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
        playerStartX = this.x - distance;

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
        playerStartX = this.x + distance;
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
        playerStartY = this.y + distance;
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
        playerStartY = this.y - distance;
    }

    if (this.swinging) {
        if (this.swingBackwardAnimation.isDone()) {
            this.swingBackwardAnimation.elapsedTime = 0;
            this.swinging = false;
        }
        if (this.swingForwardAnimation.isDone()) {
            this.swingForwardAnimation.elapsedTime = 0;
            this.swinging = false;
        }
        if (this.swingLeftAnimation.isDone()) {
            this.swingLeftAnimation.elapsedTime = 0;
            this.swinging = false;
        }
        if (this.swingRightAnimation.isDone()) {
            this.swingRightAnimation.elapsedTime = 0;
            this.swinging = false;
        }
    }

    //Control Bounds
    if (this.x > $("#gameWorld").width() - 150 && this.walkingRight) {
      this.offRight = true;
    } else {
      this.offRight = false;
    }

    if (this.x <  150 && this.walkingLeft) {
      this.offLeft = true;
    } else {
      this.offLeft = false;
    }

    if (this.y <  150 && this.walkingForward) {
      this.offTop = true;
    } else {
      this.offTop = false;
    }

    if (this.y > $("#gameWorld").height() - 150 && this.walkingBackward) {
      this.offBottom = true;
    } else {
      this.offBottom = false;
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
    else if (this.swinging) {
        if (facingDirection === 1) {
            this.swingForwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        }
        else if (facingDirection === 2) {
            this.swingBackwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        }
        else if (facingDirection === 3) {
            this.swingLeftAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        }
        else {
            this.swingRightAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        }
    }
    else {
        if (facingDirection === 1) {
            this.idleAnimationForward.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        } else if (facingDirection == 2) {
            this.idleAnimationBackward.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        } else if (facingDirection === 3) {
            this.idleAnimationLeft.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        } else {
            this.idleAnimationRight.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        }

    }
    Entity.prototype.draw.call(this);

}
