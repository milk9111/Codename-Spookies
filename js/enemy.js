/**
 * Contains logic to sit in one spot, then aggro on a player if they are in range.
 * @author Myles Haynes
 */
class Enemy extends Entity {


    constructor(gameEngine, player, x, y, speed, range, coolDown, frameWidth, frameHeight, boundsXOffset, boundsYOffset) {
        super(gameEngine, x, y, true, frameWidth, frameHeight, boundsXOffset, boundsYOffset, "enemy");
        this.game = gameEngine;
        this.player = player;
        this.isDraw = false;
        this.speed = speed || 0.5;
        this.range = range || 100;
        //this.attackBox = null;
        /**How many pixels from the player the enemy stops to begin attacking.*/
        this.stoppingDistance = 32;
        this.attackCooldown = coolDown;
        this.cooldownCounter = this.attackCooldown;
        this.health = 100;
        this.frozen = false;
        this.reloading = false;
        this.width = frameWidth;
        this.height = frameHeight;

        //The enemy's current position and state in the game world.
        this.x = x;
        this.y = y;
        this.facingDirection = "down";
        this.standingStill = true;
        this.attacking = false;
        this.dead = false;
        //These variables will need to be changed by the children, defaulting to the plague doctor sounds.
        //We may also want to have variables for the specific values taken by the fade method if necessary.
        this.soundPath = "../snd/whispers.wav";
        this.notifySound = ASSET_MANAGER.getAsset(this.soundPath);
        this.notifySoundId = null;

        //These all must be set by the child class. Look at plague doctor or the screamer for different
        //examples of how this is done. A better way to handle this would be by creating a default animation
        //but that may not be worth the effort.
        this.idleAnimationDown = null;
        this.idleAnimationUp = null;
        this.idleAnimationRight = null;
        this.idleAnimationLeft = null;

        this.walkAnimationUp = null;
        this.walkAnimationDown = null;
        this.walkAnimationDownAgro = null;
        this.walkAnimationLeft = null;
        this.walkAnimationLeftAgro = null;
        this.walkAnimationRight = null;
        this.walkAnimationRightAgro = null;

        this.attackAnimationDown = null;
        this.attackAnimationUp = null;
        this.attackAnimationLeft = null;
        this.attackAnimationRight = null;

        this.deathAnimationDown = null;
        this.deathAnimationUp = null;
        //Speed at which character moves with map
        this.mapSpeedX = 2;
        this.mapSpeedY = 2;
    };

    /**
     * Sets the facing direction of the enemy based on the change in it's x and y positions
     * @param xDir lastX-newX
     * @param yDir lastY - newY
     */
    setFacingDirection(xDir, yDir) {
        if (xDir === yDir) return;
        if (Math.abs(xDir) < Math.abs(yDir) || yDir !== 0) {
            this.facingDirection = (yDir < 0) ? "down" : "up";
        } else if (Math.abs(xDir) > Math.abs(yDir)) {
            this.facingDirection = (xDir < 0) ? "right" : "left";
        }
    };

    /**
     * Is the player in range?
     * @returns {boolean}
     */
    isPlayerInRange() {
        return areEntitiesInRange({x: this.x, y: this.y}, this.player, this.range);
    };

    /**
     * Sets the state of the enemy, including movement, death and attacking.
     * Determines if the enemy needs to be drawn to the canvas and moves it with the map.
     */
    update() {

        //If a death animation is occurring either do nothing and wait for it to finish playing or
        // remove the entity from the world. The check for if the animation is null is only because some enemies don't
        //have death animations made yet so that value is set to null.
        if (this.dead && (this.deathAnimationDown.isDone() || this.deathAnimationUp.isDone())) {
            this.removeFromWorld = true;
        }

        //If not dead the enemy can move or change state as needed
        if(!this.dead && !this.frozen) {
            let lastX = this.x;
            let lastY = this.y;
            let xDir = 0;
            let yDir = 0;
            //Check if aggroed on the player.
            if (this.isPlayerInRange() && !this.isSmacked) {
                if (this.notifySoundId === null) {
                    this.notifySoundId = ASSET_MANAGER.playSound(this.soundPath);
                    // this.notifySound.fade(0.0, 0.3, 1000);
                } else {
                    ASSET_MANAGER.playSound(this.soundPath);
                }
                // not close enough to attack.
                if (!this.reloading && !Math.intersects(this, this.player)
                    && Math.getDistance(this.player.x + 32, this.player.y + 32, this.x, this.y) > this.stoppingDistance) {
                    //prevent melee enemies from moving too early after attacking
                    if((this instanceof PlagueDoctor) || this.cooldownCounter >= this.attackCooldown) {
                        this.moveToPlayer(lastX,lastY);
                    } else {
                        this.cooldownCounter++;
                    }
                } else {
                    this.targetAndAttack(lastX,lastY);
                }
            } else {
                this.standingStill = true;
                this.attacking = false;
                this.setFacingDirection(xDir, yDir);
            }
        }

        //Get distance from Enemy to player
        let distance = Math.getDistance(this.player.x, this.player.y, this.x, this.y);
        //If close to player then draw, else don't draw
        this.isDraw = distance < drawDistance;

        //Controls the map movement on/off screen
        if (this.player.offRight) {
            this.x -= this.mapSpeedX;
        } else if (this.player.offLeft) {
            this.x += this.mapSpeedX;
        } else if (this.player.offTop) {
            this.y += this.mapSpeedY;
        } else if (this.player.offBottom) {
            this.y -= this.mapSpeedY;
        }

        super.update();
    };

    moveToPlayer(lastX,lastY) {
        this.standingStill = false;
        this.attacking = false;
        let xDiff = this.player.x - this.x;
        let yDiff = this.player.y - this.y;
        //Here we need to multiply the speed by the clock like in example, this is where collision checking
        //needs to happen.
        if (Math.abs(xDiff) > 8) { //See if we can move as desired in the x direction.
            let newX = this.x ;
            newX += (xDiff < 0) ? -this.speed : this.speed;
            let newBounds = {collisionBounds : {width: this.collisionBounds.width, height: this.collisionBounds.height, x: newX + this.boundsXOffset, y: this.y + this.boundsYOffset}};
            if(!this.hasCollided(newBounds,gameEngine.walls)) {
                this.x = newX;
            }
        }
        if (Math.abs(yDiff) > 8) { //See if we can move as desired in the y direction.
            let newY = this.y;
            newY += (yDiff) ? (yDiff < 0) ? -this.speed : this.speed : 0;
            let newBounds = {collisionBounds : {width: this.collisionBounds.width, height: this.collisionBounds.height, x: this.x + this.boundsXOffset, y: newY + this.boundsYOffset}};
            if(!this.hasCollided(newBounds,gameEngine.walls)) {
                this.y = newY;
            }
        }
        let xDir = lastX - this.x;
        let yDir = lastY - this.y;
        this.setFacingDirection(xDir, yDir);
    };
    /**
     * Empty method that will need to be overwritten for each specific child
     */
    targetAndAttack() {};


    /**
     * Draws the correct animation based on the state of the Enemy.
     * @param ctx
     * @author James
     */
    draw(ctx) {
        if (this.isDraw) {
            if (this.dead) {
                this.death(ctx);
            } else if (this.attacking) {
                this.attack(ctx);
            } else if (this.standingStill) {
                this.standStill(ctx);
            } else {
                this.walking(ctx);
            }

            if (this.frozen) {
                Entity.bluealizeImage(ctx, this.x + (this.width / 2), this.y, this.width, this.height);
            }
        }


        Entity.prototype.draw.call(this);
    };

    /**
     * Draws the correct death animation based on the facing direction of the enemy.
     * @param ctx
     * @author James
     */
    death(ctx) {
        if(!this.removeFromWorld) {
            switch (this.facingDirection) {
                case "down":
                    this.deathAnimationDown.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, this.scale);
                    break;
                case "up":
                    this.deathAnimationUp.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, this.scale);
                    break;
                case "left":
                    this.deathAnimationDown.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, this.scale);
                    break;
                case "right":
                    this.deathAnimationDown.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, this.scale);
                    break;
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
        switch (this.facingDirection) {
            case "down":
                this.attackAnimationDown.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, this.scale);
                break;
            case "up":
                this.attackAnimationUp.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, this.scale);
                break;
            case "left":
                this.attackAnimationLeft.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, this.scale);
                break;
            case "right":
                this.attackAnimationRight.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, this.scale);
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
        switch (this.facingDirection) {
            case "down":
                this.idleAnimationDown.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, this.scale);
                break;
            case "up":
                this.idleAnimationUp.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, this.scale);
                break;
            case "left":
                this.idleAnimationLeft.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, this.scale);
                break;
            case "right":
                this.idleAnimationRight.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, this.scale);
                break;
        }

    };

    /**
     * Draws the appropriate walking animation
     * @param ctx
     * @author James Roberts
     */
    walking(ctx) {
        switch (this.facingDirection) {
            case "down":
                if (this.isPlayerInRange()) {
                    this.walkAnimationDownAgro.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, this.scale);
                } else {
                    this.walkAnimationDown.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, this.scale);
                }
                break;
            case "up":
                this.walkAnimationUp.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, this.scale);
                break;
            case "left":
                if (this.isPlayerInRange()) {
                    this.walkAnimationLeftAgro.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, this.scale);
                } else {
                    this.walkAnimationLeft.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, this.scale);
                }
                break;
            case "right":
                if (this.isPlayerInRange()) {
                    this.walkAnimationRightAgro.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, this.scale);
                } else {
                    this.walkAnimationRight.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, this.scale);
                }
                break;
        }
    };


}

