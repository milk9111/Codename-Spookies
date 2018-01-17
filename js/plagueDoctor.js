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
        this.walkAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/EUpWalk.png"), 0, 0, 64, 64, 0.3, 3, true, false);
        this.walkAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/EWalkD.png"), 0, 0, 64, 64, 0.3, 3, true, false);
        this.walkAnimationDownAgro = new Animation(ASSET_MANAGER.getAsset("../img/EWDAgro.png"), 0, 0, 64, 64, 0.3, 3, true, false);
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
        super.update();
        let xDir = lastX - this.x;
        let yDir = lastY - this.y;

        if (lastX !== this.x || lastY !== this.y) { //Character moved
            this.standingStill = false;
            if (Math.abs(xDir) > Math.abs(yDir)) { //Greater movement in x direction.
                if (xDir > 0) { //Moved to the left
                    this.facingDirection = "left";
                } else { //Moved to the right
                    this.facingDirection = "right";
                }
            } else { //Greater movement in y direction or an equal change.
                if(yDir < 0) {
                    this.facingDirection = "down";
                } else {
                    this.facingDirection = "up";
                }
            }
        } else { //No movement.
            this.standingStill = true;
        }
    };

    draw(ctx) {
        if(this.standingStill) {
            this.standStill(ctx);
        } else {
            this.walking(ctx);
        }
    };

    standStill(ctx) {
        switch(this.facingDirection) {
            case "down":
                this.idleAnimationDown.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                break;
            case "up":
                this.idleAnimationUp.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                break;
            case "left":
                //super.draw(ctx);
                break;
            case "right":
                //super.draw(ctx);
                break;
        }

    };

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
                //super.draw(ctx);
                break;
            case "right":
                //super.draw(ctx);
                break;
        }

    };
}
