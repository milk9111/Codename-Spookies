class Screamer extends Enemy {
    constructor(gameEngine, player, x, y, speed=2, range=250) {
        super( gameEngine, player, x, y, speed, range);
        console.log("Making a screamer");
        //spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse
        this.idleAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Spider_Monster_SpriteSheet.png"), 0, 0, 64, 64, 0.5, 3, true, false);

        this.walkAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/Spider_Monster_SpriteSheet.png"), 64, 128, 64, 64, 0.2, 3, true, false);
        this.walkAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Spider_Monster_SpriteSheet.png"), 192, 0, 64, 64, 0.2, 3, true, false);

        this.attackAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/Spider_Monster_SpriteSheet.png"), 0, 192, 64, 64, 0.2, 3, true, false);
        this.attackAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Spider_Monster_SpriteSheet.png"), 128, 64, 64, 64, 0.2, 3, true, false);
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

            // not close enough to attack.
            if(Math.getDistance(this.player.x, this.player.y, this.x, this.y) > 15) {
                this.standingStill = false;
                this.attacking = false;
                let xDir = this.player.x - this.x;
                let yDir = this.player.y - this.y;
                //Here we need to multiply the speed by the clock like in example
                if (Math.abs(xDir) > 10) {
                    this.unroundedX += (xDir < 0) ? -this.speed : this.speed;
                    this.x = this.unroundedX;
                } else if (Math.abs(yDir) > 10){
                    this.unroundedY += (yDir) ? (yDir < 0) ? -this.speed : this.speed : 0;
                    this.y = this.unroundedY;
                }
            } else { //stand still and attack.
                this.standingStill = true;
                this.attacking = true;
            }
        } else {
            this.standingStill = true;
            this.attacking = false;
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
        //console.log("Inside Screamer's draw");
        if (this.isDraw) {
            if(this.attacking) {
                this.attack(ctx);
            } else if(this.standingStill) {
                this.standStill(ctx);
            } else {
                this.walking(ctx);
            }
        }

    };

    /**
     * Draws the appropriate attack animation.
     *
     * @param ctx
     * @author James Roberts
     */
    attack(ctx) {
        switch(this.facingDirection) {
            case "down":
                this.attackAnimationDown.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                break;
            case "up":
                this.attackAnimationUp.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                break;
            case "left":
                this.attackAnimationDown.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                break;
            case "right":
                this.attackAnimationDown.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                break;
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
                this.idleAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                break;
            case "up":
                this.idleAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                break;
            case "left":
                this.idleAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                break;
            case "right":
                this.idleAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
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
                this.walkAnimationDown.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                break;
            case "right":
                this.walkAnimationDown.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                break;
        }

    };
}