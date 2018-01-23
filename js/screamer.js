class Screamer extends Enemy {
    constructor(gameEngine, player, x, y, speed=2, range=250) {
        super( gameEngine, player, x, y, speed, range);
        //spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse
        this.idleAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Spider_Monster_SpriteSheet.png"), 0, 0, 64, 64, 0.5, 3, true, false);
        this.idleAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/Spider_Monster_SpriteSheet.png"),0,0,64,64,0.5,2,true,false);
        this.idleAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/Spider_Monster_SpriteSheet.png"), 0, 0, 64, 64, 0.5, 3, true, false);
        this.idleAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/Spider_Monster_SpriteSheet.png"), 0, 0, 64, 64, 0.5, 3, true, false);
        this.walkAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/Spider_Monster_SpriteSheet.png"), 0, 0, 64, 64, 0.2, 3, true, false);
        this.walkAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Spider_Monster_SpriteSheet.png"), 0, 0, 64, 64, 0.2, 3, true, false);
        this.walkAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/Spider_Monster_SpriteSheet.png"), 0, 0, 64, 64, 0.2, 3, true, false);
        this.walkAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/Spider_Monster_SpriteSheet.png"), 0, 0, 64, 64, 0.2, 3, true, false);
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

        super.setFacingDirection(xDir,yDir);
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
                this.walkAnimationDown.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                break;
            case "up":
                this.walkAnimationUp.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                break;
            case "left":
                this.walkAnimationLeft.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                break;
            case "right":
                this.walkAnimationRight.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                break;
        }

    };
}