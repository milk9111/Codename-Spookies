
class MiniSpook extends Enemy {
    constructor (game, player, x, y) {
        super (game, player, x, y, 0, 300, 35, 64, 64, 0, 0);

        this.game = game;

        this.scale = 0.25;
        this.width = 64;
        this.height = 64;
        this.boundsXOffset = 0;
        this.boundsYOffset = 0;
        let boundsX = this.x + this.boundsXOffset;
        let boundsY = this.y + this.boundsYOffset;
        this.collisionBounds = {width: this.width, height: this.height, x: boundsX, y: boundsY};
        this.stoppingDistance = 32;
        this.damage = 2;
        this.health = 5;

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
    }


    update () {
        if (this.dead && (this.deathAnimationDown.isDone() || this.deathAnimationUp.isDone())) {
            this.removeFromWorld = true;
            //return;
        }

        //If not dead the enemy can move or change state as needed
        if(!this.dead) {
            let lastX = this.x + this.boundsXOffset;
            let lastY = this.y + this.boundsYOffset;
            let xDir = 0;

            let yDir = 0;

            //Check if aggroed on the player.
            if (this.isPlayerInRange() && !this.isSmacked) {

                // not close enough to attack.
                if (!this.reloading && !Math.intersects({collisionBounds: {width: this.collisionBounds.width, height: this.collisionBounds.height, x: this.x + this.boundsXOffset, y: this.y + this.boundsYOffset}}, this.player)
                    && Math.getDistance(this.player.x + 32, this.player.y + 32, (this.x + this.boundsXOffset) + (this.width / 2), (this.y + this.boundsYOffset) + (this.height / 2)) > this.stoppingDistance) {
                    //prevent melee enemies from moving too early after attacking
                    if(this.cooldownCounter >= this.attackCooldown) {
                        this.moveToPlayer(lastX, lastY);
                    } else {
                        this.cooldownCounter++;
                    }
                } else {
                    this.targetAndMelee(lastX, lastY);
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

    draw (ctx) {
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
        }
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

    targetAndMelee() {
        this.standingStill = true;
        this.attacking = true;
        if(this.cooldownCounter >= this.attackCooldown) {
            this.cooldownCounter = 0;
            this.createAttackBox();
        }
        this.cooldownCounter++;
    }

    createAttackBox() {
        let attackBoxX;
        let attackBoxY;
        let attackBoxWidth;
        let attackBoxHeight;
        switch(this.facingDirection) { // 96, 74, 80, 80
            case "up":
                attackBoxX = this.x + 12;
                attackBoxY = this.y + 12;
                attackBoxWidth = 40;
                attackBoxHeight = 40;
                break;
            case "down":
                attackBoxX = this.x + 12;
                attackBoxY = this.y + 12;
                attackBoxWidth = 40;
                attackBoxHeight = 40;
                break;
            case "right":
                attackBoxX = this.x + 12;
                attackBoxY = this.y + 12;
                attackBoxWidth = 40;
                attackBoxHeight = 40;
                break;
            case "left":
                attackBoxX = this.x + 12;
                attackBoxY = this.y + 12;
                attackBoxWidth = 40;
                attackBoxHeight = 40;
                break;
        }
        gameEngine.addEntity(new AttackBox(this.game,this.player,attackBoxWidth,attackBoxHeight,attackBoxX, attackBoxY, this.damage, this.facingDirection));
    }
}