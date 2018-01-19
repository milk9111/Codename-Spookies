/**
 * @author James Roberts
 */
class PlagueDoctor extends Enemy {
    /**
     * Constructor for the plague doctor enemy.
     * @author James Roberts
     */
    constructor(gameEngine, player, x, y, speed, range) {
        super( gameEngine, player, x, y, speed, range);
        //spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse
        this.idleAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/EnemyDownward.png"), 0, 0, 64, 64, 0.5, 3, true, false);
        this.idleAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/EUI.png"),0,0,64,64,0.5,2,true,false);
        this.idleAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/EnemyIdleRight.png"), 0, 0, 64, 64, 0.5, 3, true, false);
        this.idleAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/EnemyIdleLeft.png"), 0, 0, 64, 64, 0.5, 3, true, false);
        this.walkAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/EUpWalk.png"), 0, 0, 64, 64, 0.2, 4, true, false);
        this.walkAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/EWalkD.png"), 0, 0, 64, 64, 0.2, 4, true, false);
        this.walkAnimationDownAgro = new Animation(ASSET_MANAGER.getAsset("../img/EWDAgro.png"), 0, 0, 64, 64, 0.2, 4, true, false);
        this.walkAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/EWL.png"), 0, 0, 64, 64, 0.2, 4, true, false);
        this.walkAnimationLeftAgro = new Animation(ASSET_MANAGER.getAsset("../img/EWLA.png"), 0, 0, 64, 64, 0.2, 4, true, false);
        this.walkAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/EWR.png"), 0, 0, 64, 64, 0.2, 4, true, false);
        this.walkAnimationRightAgro = new Animation(ASSET_MANAGER.getAsset("../img/EWRA.png"), 0, 0, 64, 64, 0.2, 4, true, false);
        this.facingDirection = "down";
        this.standingStill = true;
    };

    /**
    * This method determines which direction and in which state the plague doctor is in.
    *@author James Roberts
    */
    update() {

      let lastX = this.x;
      let lastY = this.y;
      //Check if aggroed on the player.
      if (this.isPlayerInRange()) {
          let xDir = this.player.x - this.x;
          let yDir = this.player.y - this.y;
          if (Math.abs(xDir) > Math.abs(yDir)) {
              this.unroundedX += (xDir < 0) ? -this.speed : this.speed;
              this.x = this.unroundedX;
          } else {
              this.unroundedY += (yDir) ? (yDir < 0) ? -this.speed : this.speed : 0;
              this.y = this.unroundedY;
          }
      }
      let xDir = lastX - this.x;
      let yDir = lastY - this.y;

      if (xDir !== 0 || yDir !== 0) {
        this.standingStill = false;
        if (Math.abs(xDir) > Math.abs(yDir)) { //Greater movement in x direction.
          if (xDir > 0) { //Moved to the left
            this.facingDirection = "left";
          } else { //Moved to the right
            this.facingDirection = "right";
          }
        } else { //Greater movement in y direction or an equal change.
          if (yDir < 0) {
            this.facingDirection = "down";
          } else {
            this.facingDirection = "up";
          }
        }
      } else { //No movement.
        this.standingStill = true;
      }
      //check if it needs to be drawn and change x and y if necessary for map movement.
      super.update();
    };

    /**
     * Draws the character on the canvas.
     * @param ctx
     * @author James Roberts
     */
    draw(ctx) {

      if (this.isDraw) {
        if(this.standingStill) {
            this.standStill(ctx);
        } else {
            this.walking(ctx);
        }
      }

    };

    /**
     * Draws the appropriate idle animation.
     *
     * @param ctx
     * @author James Roberts
     */
    standStill(ctx) {
        switch(this.facingDirection) {
            case "down":
                this.idleAnimationDown.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                break;
            case "up":
                this.idleAnimationUp.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                break;
            case "left":
                this.idleAnimationLeft.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                break;
            case "right":
                this.idleAnimationRight.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                break;
        }

    };

    /**
     * Draws the appropriate walking animation
     * @param ctx
     * @author James Roberts
     */
    walking(ctx) {
        switch(this.facingDirection) {
            case "down":
                if(this.isPlayerInRange()) {
                    this.walkAnimationDownAgro.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                } else {
                    this.walkAnimationDown.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                }
                break;
            case "up":
                this.walkAnimationUp.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                break;
            case "left":
                if(this.isPlayerInRange()) {
                    this.walkAnimationLeftAgro.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                } else {
                    this.walkAnimationLeft.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                }
                break;
            case "right":
                if(this.isPlayerInRange()) {
                    this.walkAnimationRightAgro.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                } else {
                    this.walkAnimationRight.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                }
                break;
        }

    };
}
