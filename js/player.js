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
    this.idleAnimationDownward = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 0, 0, 64, 64, 0.3, 2, true, false);
    this.idleAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 256, 0, 64, 64, 0.3, 2, true, false);
    this.idleAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 0, 64, 64, 64, 0.3, 2, true, false);
    this.walkRightAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 256, 128, 64, 64, 0.15,  4, false, false);
    this.walkLeftAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 0, 128, 64, 64, 0.15,  4, false, false);
    this.walkForwardAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 256, 64, 64, 64, 0.3,  2, false, false);
    this.walkDownwardAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 128, 64, 64, 64, 0.3,  2, false, false);
    this.swingDownwardAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 128, 192, 64, 64, 0.1,  3, false, false);
    this.swingForwardAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 320, 192, 64, 64, 0.1,  3, false, false);
    this.swingLeftAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 320, 256, 64, 64, 0.1,  3, false, false);
    this.swingRightAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 128, 256, 64, 64, 0.1,  3, false, false);
    this.castSpellDownwardAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 0, 384, 64, 64, 0.1,  5, true, false);
    this.castSpellForwardAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 0, 448, 64, 64, 0.1,  5, true, false);
    this.castSpellLeftAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 0, 512, 64, 64, 0.1,  5, true, false);
    this.castSpellRightAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 0, 576, 64, 64, 0.1,  5, true, false);
    this.raiseShieldDownwardAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 0, 640, 64, 64, 0.3,  2, false, false);
    this.raiseShieldForwardAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 128, 640, 64, 64, 0.3,  2, false, false);
    this.raiseShieldLeftAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 256, 640, 64, 64, 0.3,  2, false, false);
    this.raiseShieldRightAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 0, 704, 64, 64, 0.3,  2, false, false);


    this.jumping = false;
    this.walkingRight = false;
    this.walkingLeft = false;
    this.walkingForward = false;
    this.walkingDownward = false;
    this.turnedAround = false;
    this.inMotion = false;
    this.swinging = false;
    this.casting = false;
    this.raising = false;
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

    if (this.game.downward) {
        facingDirection = 2;
        this.walkingDownward = true;
        this.game.downward = false;
    }

    if (swing) {
        this.swinging = true;
        //this.game.swing = false;
    }

    if (raise) {
        this.raising = true;
        //this.game.raise = false;
    }

    if (this.game.cast) {
        this.casting = true;
    }

    if (this.casting && !this.game.cast) {
        this.castSpellDownwardAnimation.elapsedTime = 0;
        this.castSpellForwardAnimation.elapsedTime = 0;
        this.castSpellLeftAnimation.elapsedTime = 0;
        this.castSpellRightAnimation.elapsedTime = 0;
        this.casting = false;
    }

    if (this.walkingRight) {
        if (this.walkRightAnimation.isDone()) {
            this.walkRightAnimation.elapsedTime = 0;
            this.walkingRight = false;
            moving = false;
        }

        //Stop player from moving off screen right
        if (!this.offRight) {
        var walkDistance = this.walkRightAnimation.elapsedTime / this.walkRightAnimation.totalTime;

        if (walkDistance > 0.5)
            walkDistance = 1 - walkDistance;

        var distance = totalDistance*(-4 * (walkDistance * walkDistance - walkDistance));
        this.x = this.x + distance;
        playerStartX = this.x - distance;
      }
    }

    if (this.walkingLeft) {
        if (this.walkLeftAnimation.isDone()) {
            this.walkLeftAnimation.elapsedTime = 0;
            this.walkingLeft = false;
            moving = false;
        }

        //Stop player from going off left side of the screen
        if (!this.offLeft) {
        var walkDistance = this.walkLeftAnimation.elapsedTime / this.walkLeftAnimation.totalTime;

        if (walkDistance > 0.5)
            walkDistance = 1 - walkDistance;

        var distance = totalDistance*(-4 * (walkDistance * walkDistance - walkDistance));
        this.x = this.x - distance;
        playerStartX = this.x + distance;
      }
    }

    if (this.walkingForward) {
        if (this.walkForwardAnimation.isDone()) {
            this.walkForwardAnimation.elapsedTime = 0;
            this.walkingForward = false;
            moving = false;
        }

        //Stop player from moving off screen from the top
        if(!this.offTop) {
        var walkDistance = this.walkForwardAnimation.elapsedTime / this.walkForwardAnimation.totalTime;

        if (walkDistance > 0.5)
            walkDistance = 1 - walkDistance;

        var distance = totalDistance*(-4 * (walkDistance * walkDistance - walkDistance));
        this.y = this.y - distance;
        playerStartY = this.y + distance;
      }
    }

    if (this.walkingDownward) {
        if (this.walkDownwardAnimation.isDone()) {
            this.walkDownwardAnimation.elapsedTime = 0;
            this.walkingDownward = false;
            moving = false;
        }

        //Stop player from going off screen from the bottom
        if (!this.offBottom) {
        var walkDistance = this.walkDownwardAnimation.elapsedTime / this.walkDownwardAnimation.totalTime;

        if (walkDistance > 0.5)
            walkDistance = 1 - walkDistance;

        var distance = totalDistance*(-4 * (walkDistance * walkDistance - walkDistance));
        this.y = this.y + distance;
        playerStartY = this.y - distance;
      }
    }


    //raising shield
    if (this.raising) {
        if (this.raiseShieldDownwardAnimation.isDone()) {
            this.raiseShieldDownwardAnimation.elapsedTime = 0;
            this.raising = false;
            raise = false;
        }
        if (this.raiseShieldForwardAnimation.isDone()) {
            this.raiseShieldForwardAnimation.elapsedTime = 0;
            this.raising = false;
            raise = false;
        }
        if (this.raiseShieldLeftAnimation.isDone()) {
            this.raiseShieldLeftAnimation.elapsedTime = 0;
            this.raising = false;
            raise = false;
        }
        if (this.raiseShieldRightAnimation.isDone()) {
            this.raiseShieldRightAnimation.elapsedTime = 0;
            this.raising = false;
            raise = false;
        }
    }


    //swinging sword
    if (this.swinging) {
        if (this.swingDownwardAnimation.isDone()) {
            this.swingDownwardAnimation.elapsedTime = 0;
            this.swinging = false;
            swing = false;
        }
        if (this.swingForwardAnimation.isDone()) {
            this.swingForwardAnimation.elapsedTime = 0;
            this.swinging = false;
            swing = false;

        }
        if (this.swingLeftAnimation.isDone()) {
            this.swingLeftAnimation.elapsedTime = 0;
            this.swinging = false;
            swing = false;

        }
        if (this.swingRightAnimation.isDone()) {
            this.swingRightAnimation.elapsedTime = 0;
            this.swinging = false;
            swing = false;

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

    if (this.y > $("#gameWorld").height() - 150 && this.walkingDownward) {
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
    else if (this.walkingDownward) {
        this.walkDownwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
    }
    else if (this.raising) {
        this.raiseShield(ctx);
    }
    else if (this.swinging) {
        this.swingSword(ctx);
    }
    else if (this.casting) {
        this.castSpell(ctx);
    }
    else {
        this.standStill(ctx);
    }
    Entity.prototype.draw.call(this);
}


Player.prototype.raiseShield = function (ctx) {
    if (facingDirection === 1) {
        this.raiseShieldForwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
    }
    else if (facingDirection === 2) {
        this.raiseShieldDownwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
    }
    else if (facingDirection === 3) {
        this.raiseShieldLeftAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
    }
    else {
        this.raiseShieldRightAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
    }
}


Player.prototype.castSpell = function (ctx) {
    if (facingDirection === 1) {
        this.castSpellForwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
    }
    else if (facingDirection === 2) {
        this.castSpellDownwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
    }
    else if (facingDirection === 3) {
        this.castSpellLeftAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
    }
    else {
        this.castSpellRightAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
    }
}


Player.prototype.standStill = function (ctx) {
    if (facingDirection === 1) {
        this.idleAnimationForward.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
    } else if (facingDirection === 2) {
        this.idleAnimationDownward.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
    } else if (facingDirection === 3) {
        this.idleAnimationLeft.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
    } else {
        this.idleAnimationRight.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
    }
}


Player.prototype.swingSword = function (ctx) {
    if (facingDirection === 1) {
        this.swingForwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
    }
    else if (facingDirection === 2) {
        this.swingDownwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
    }
    else if (facingDirection === 3) {
        this.swingLeftAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
    }
    else {
        this.swingRightAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
    }
}
