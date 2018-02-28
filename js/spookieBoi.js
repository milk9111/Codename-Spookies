
/**
 * The final boss class.
 */
class SpookieBoi extends Enemy {

    constructor (game, player, x, y, speed=1.5, range=300, coolDown = 35) {
        super(game, player, x, y, speed, range, coolDown, 96, 74, 80, 80, 200);

        this.game = game;
        
        this.adjustedX = this.x + this.boundsXOffset;
        this.adjustedY = this.y + this.boundsYOffset;

        this.firstTarget = true;

        this.idleAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 256 * 6, 0, 256, 256, 0.2, 2, true, false);
        this.idleAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 256 * 8, 0, 256, 256, 0.2, 2, true, false);
        this.idleAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 256 * 3, 0, 256, 256, 0.2, 3, true, false);
        this.idleAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 0, 0, 256, 256, 0.2, 3, true, false);

        this.walkAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 256 * 9, 256, 256, 256, 0.2, 3, true, false);
        this.walkAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 256 * 6, 256, 256, 256, 0.2, 3, true, false);
        this.walkAnimationDownAgro = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 256 * 6, 256, 256, 256, 0.2, 3, true, false);
        this.walkAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 0, 256, 256, 256, 0.2, 3, true, false);
        this.walkAnimationLeftAgro = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 0, 256, 256, 256, 0.2, 3, true, false);
        this.walkAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 256 * 3, 256, 256, 256, 0.2, 3, true, false);
        this.walkAnimationRightAgro = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 256 * 3, 256, 256, 256, 0.2, 3, true, false);

        this.attackAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 256 * 6, 256 * 3, 256, 256, 0.1, 7, true, false);
        this.attackAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 256 * 3, 256 * 4, 256, 256, 0.1, 7, true, false);
        this.attackAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 256 * 2, 256 * 2, 256, 256, 0.1, 7, true, false);
        this.attackAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 256 * 9, 256 * 2, 256, 256, 0.1, 7, true, false);

        this.deathAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 256, 256 * 9, 256, 256, 0.2, 5, false, false);
        this.deathAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 256 * 6, 256 * 9, 256, 256, 0.2, 5, false, false);
        this.stoppingDistance = 0;
    }

    update () {
        //this.adjustHitBox(this.facingDirection);
        //If a death animation is occurring either do nothing and wait for it to finish playing or
        // remove the entity from the world. The check for if the animation is null is only because some enemies don't
        //have death animations made yet so that value is set to null.
        if (this.dead && (this.deathAnimationDown.isDone() || this.deathAnimationUp.isDone())) {
            this.game.bossHealthBar.removal = true;
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
                if (this.firstTarget) {
                    this.game.bossHealthBar = new BossHealthBar(this.game, this, this.game.surfaceWidth / 8, this.game.surfaceHeight - 70);
                    this.game.addEntity(this.game.bossHealthBar);
                    this.firstTarget = false;
                }
                if (this.notifySoundId === null) {
                    this.notifySoundId = ASSET_MANAGER.playSound(this.soundPath);
                    // this.notifySound.fade(0.0, 0.3, 1000);
                } else {
                    ASSET_MANAGER.playSound(this.soundPath);
                }
                // not close enough to attack.
                //console.log(this.width + ", " + this.height + ", " + this.boundsXOffset + ", " + this.boundsYOffset);
                //console.log(this.x + (this.width / 2) +", "+ this.y + (this.height / 2));
                if (!this.reloading && !Math.intersects({collisionBounds: {width: this.collisionBounds.width, height: this.collisionBounds.height, x: this.x + this.boundsXOffset, y: this.y + this.boundsYOffset}}, this.player)
                    && Math.getDistance(this.player.x + 32, this.player.y + 32, (this.x + this.boundsXOffset) + (this.width / 2), (this.y + this.boundsYOffset) + (this.height / 2)) > this.stoppingDistance) {
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
        let distance = Math.getDistance(this.player.x, this.player.y, (this.x + this.boundsXOffset) + (this.width / 2), (this.y + this.boundsYOffset) + (this.height / 2));
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

        Entity.prototype.update.call(this);
    }

    moveToPlayer(lastX, lastY) {
        this.standingStill = false;
        this.attacking = false;
        let xDiff = this.player.x - (this.x + this.boundsXOffset);
        let yDiff = this.player.y - (this.y + this.boundsYOffset);
        //Here we need to multiply the speed by the clock like in example, this is where collision checking
        //needs to happen.
        if (Math.abs(xDiff) > 8) { //See if we can move as desired in the x direction.
            let newX = this.x;
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
        let xDir = lastX - (this.x + this.boundsXOffset);
        let yDir = lastY - (this.y + this.boundsYOffset);
        this.setFacingDirection(xDir, yDir);
    }

    adjustHitBox(facingDirection) {
        switch(facingDirection) {
            case "down":
            case "up":
                this.height = 90;
                this.width = 65;
                this.boundsXOffset = 96;
                this.boundsYOffset = 75;
                break;
            case "left":
            case "right":
                this.height = 50;
                this.width = 128;
                this.boundsXOffset = 60;
                this.boundsYOffset = 104;
                break;
        }

        let boundsX = this.x + this.boundsXOffset;
        let boundsY = this.y + this.boundsYOffset;
        this.collisionBounds = {width: this.width, height: this.height, x: boundsX, y: boundsY};

        let hitAWall = this.getCollisions(this.collisionBounds, this.game.walls);
    }


    /*draw (ctx) {
        super.draw(ctx);
    }*/

    targetAndAttack() {
        this.standingStill = true;
        this.attacking = true;
        this.cooldownCounter++;
        let canHit = false;
        if ((this.y + this.boundsYOffset) > this.player.y - 36 && (this.y + this.boundsYOffset) < this.player.y + 36) {
            canHit = true;
            if (this.player.x > (this.x + this.boundsXOffset)) {
                this.facingDirection = "right";
            } else {
                this.facingDirection = "left";
            }
        } else if ((this.x + this.boundsXOffset) >= this.player.x - 16 && (this.x + this.boundsXOffset) <= this.player.x + 20) {
            canHit = true;
            if (this.player.y > (this.y + this.boundsYOffset)) {
                this.facingDirection = "down";
            } else {
                this.facingDirection = "up";
            }
        } else {
            this.attacking = false;
            this.standingStill = false;
            if ((this.y + this.boundsYOffset) > this.player.y + 64 || (this.y + this.boundsYOffset) < this.player.y - 64) {
                let xDiff = this.player.x - (this.x + this.boundsXOffset);
                let oldX = (this.x + this.boundsXOffset);
                this.x += (xDiff < 0) ? -this.speed : this.speed;
                let newBounds = {collisionBounds : {width: this.collisionBounds.width, height: this.collisionBounds.height, x: (this.x + this.boundsXOffset) + this.boundsXOffset, y: (this.y + this.boundsYOffset) + this.boundsYOffset}};
                if(!this.hasCollided(newBounds,gameEngine.walls)) {
                    this.facingDirection = (xDiff < 0) ? "left" : "right";
                } else { //collision, don't move
                    this.x = oldX;
                }

            } else {
                let yDiff = this.player.y - (this.y + this.boundsYOffset);
                let oldY = (this.y + this.boundsYOffset);
                this.y += (yDiff < 0) ? -this.speed : this.speed;
                let newBounds = {collisionBounds : {width: this.collisionBounds.width, height: this.collisionBounds.height, x: (this.x + this.boundsXOffset) + this.boundsXOffset, y: (this.y + this.boundsYOffset) + this.boundsYOffset}};
                if(!this.hasCollided(newBounds,gameEngine.walls)) {
                    this.facingDirection = (yDiff < 0) ? "up" : "down";
                } else {
                    this.y = oldY;
                }

            }

        }

        if (canHit) {
            this.standingStill = true;
            this.attacking = true;

            //If there is no spell fired by this enemy in existence it can shoot.
            if (this.cooldownCounter >= this.attackCooldown) {
                this.cooldownCounter = 0;
                this.createAttackBox();
            }
        }
    }

    createAttackBox() {
        let attackBoxX;
        let attackBoxY;
        let attackBoxWidth;
        let attackBoxHeight;
        switch(this.facingDirection) { // 96, 74, 80, 80
            case "up":
                console.log("Attacking up");
                attackBoxX = this.x + 80 + 48;
                attackBoxY = this.y + 80;
                attackBoxWidth = 50;
                attackBoxHeight = 20;
                break;
            case "down":
                console.log("Attacking down");
                attackBoxX = this.x + 80 + 48;
                attackBoxY = this.y + 80 + 74;
                attackBoxWidth = 50;
                attackBoxHeight = 20;
                break;
            case "right":
                console.log("Attacking right");
                attackBoxX = this.x + 80 + 96;
                attackBoxY = this.y + 80 + 37;
                attackBoxWidth = 20;
                attackBoxHeight = 50;
                break;
            case "left":
                console.log("Attacking left");
                attackBoxX = this.x + 80 - 40;
                attackBoxY = this.y + 80 + 18.5;
                attackBoxWidth = 20;
                attackBoxHeight = 50;
                break;
        }
        gameEngine.addEntity(new AttackBox(this.game,this.player,attackBoxWidth,attackBoxHeight,attackBoxX, attackBoxY, this.damage, this.facingDirection));
    }
}