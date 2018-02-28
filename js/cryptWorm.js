/**
 * @author James Roberts
 */
class CryptWorm extends Enemy {
    /**
     * Constructor for the plague doctor enemy.
     * @author James Roberts
     */
    constructor(gameEngine, player, x, y, speed = 1, range = 300, coolDown = 75) {
        super(gameEngine, player, x, y, speed, range, coolDown, 32, 64, 16, 0);
        this.defaultYBounds = 0;
        this.defaultHeight = 64;
        this.undergroundHeight = 22;
        this.undergroundYBounds = 42;
        this.collisionBounds.height = this.undergroundHeight;
        this.boundsYOffset = this.undergroundYBounds;
        this.underground = true;
        this.damage = 20; //20
        this.health = 200;
        this.emerging = false;
        //using same as plague doctor for now
        this.soundPath = "../snd/whispers.wav";
        this.notifySound = ASSET_MANAGER.getAsset("../snd/whispers.wav");
        this.createAnimations();
    };

    /**
     * Creates all of the animations for the CryptWorm.
     */
    createAnimations() {

        //spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse
        this.idleAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 1280, 64, 64, 0.5, 1, true, false);
        this.idleAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 1280, 64, 64, 0.5, 1, true, false);
        this.idleAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 1280, 64, 64, 0.5, 1, true, false);
        this.idleAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 1280, 64, 64, 0.5, 1, true, false);

        this.walkAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 1280, 64, 64, 0.175, 3, true, false);
        this.walkAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 1280, 64, 64, 0.175, 3, true, false);
        this.walkAnimationDownAgro = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 1280, 64, 64, 0.175, 3, true, false);
        this.walkAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 1280, 64, 64, 0.175, 3, true, false);
        this.walkAnimationLeftAgro = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 1280, 64, 64, 0.175, 3, true, false);
        this.walkAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 1280, 64, 64, 0.175, 3, true, false);
        this.walkAnimationRightAgro = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 1280, 64, 64, 0.175, 3, true, false);

        this.attackAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 384, 64, 64, 0.15, 8, true, false);
        this.attackAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 256, 64, 64, 0.15, 6, true, false);
        this.attackAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 512, 64, 64, 0.15, 8, true, false);
        this.attackAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 640, 64, 64, 0.15, 8, true, false);

        this.emergeAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 128, 64, 64, 0.2, 7, false, false);
        this.retractAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 1152, 64, 64, 0.2, 7, false, false);
        this.emergeAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 0, 64, 64, 0.2, 7, false, false);
        this.retractAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 1024, 64, 64, 0.2, 7, false, false);

        this.deathAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 896, 64, 64, 0.2, 7, false, false);
        this.deathAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 768, 64, 64, 0.2, 7, false, false);
    };

    /*
    *Only lets the crypt worm move if it is under ground, otherwise target and attack takes over.
     */
    moveToPlayer(lastX,lastY) {
        //console.log(this.collisionBounds);
        if (this.emerging) {
            this.targetAndAttack();
        } else if (this.underground) {
            super.moveToPlayer(lastX, lastY);
        } else {
            this.targetAndAttack();
        }
    }

    /*
    */
    targetAndAttack() {
        this.standingStill = true;
        this.attacking = true;
        if(this.underground) { //CryptWorm is emerging, let animation finish before it attacks
            this.emerging = true;
            if(this.emergeAnimationDown.isDone() || this.emergeAnimationUp.isDone()) {
                this.emergeAnimationDown.elapsedTime = 0;
                this.emergeAnimationUp.elapsedTime = 0;
                this.underground = false;
                this.emerging = false;
                this.boundsYOffset = this.defaultYBounds;
                this.collisionBounds.height = this.defaultHeight;
            }

        } else if (this.reloading) { //CryptWorm needs to move, is retracting
            if(this.retractAnimationDown.isDone() || this.retractAnimationUp.isDone()) {
                this.retractAnimationDown.elapsedTime = 0;
                this.retractAnimationUp.elapsedTime = 0;
                this.underground = true;
                this.reloading = false;
                this.attacking = false;
                this.boundsYOffset = this.undergroundYBounds;
                this.collisionBounds.height = this.undergroundHeight;
                this.cooldownCounter = this.attackCooldown;
            }

        } else if(this.cooldownCounter >= this.attackCooldown) { //CryptWorm ready to attack
            let distance = Math.getDistance(this.player.x + 32, this.player.y + 32, this.x + 32, this.y + 32);
            if((this.facingDirection === "left" &&  distance <= 62)
                || (this.facingDirection === "right" &&  distance <= 62)
                || (this.facingDirection === "up" &&  distance <= 80)
                || (this.facingDirection === "down" &&  distance <= 70)) { //Player in range
                let canHit = false;
                if (this.y > this.player.y - 36 && this.y < this.player.y + 36) {
                    canHit = true;
                    if (this.player.x > this.x + 5) {
                        this.facingDirection = "right";
                    } else {
                        this.facingDirection = "left";
                    }
                } else if (this.x >= this.player.x - 16 && this.x <= this.player.x + 20) {
                    canHit = true;
                    if (this.player.y > this.y + 5) {
                        this.facingDirection = "down";
                    } else {
                        this.facingDirection = "up";
                    }
                }
                if(canHit) {
                    this.cooldownCounter = 0;
                    this.createAttackBox();
                } else {
                    this.reloading = true;
                }
            } else {
                this.reloading = true;
            }
        } else {
            this.cooldownCounter++;
        }
    };
    /*
    *creates an attack box at the edge of an enemy
     */
    createAttackBox() {
        let attackBoxX;
        let attackBoxY;
        let attackBoxWidth;
        let attackBoxHeight;
        switch(this.facingDirection) {
            case "up":
                attackBoxX = this.x + 7;
                attackBoxY = this.y - 20;
                attackBoxWidth = 50;
                attackBoxHeight = 60;
                break;
            case "down":
                attackBoxX = this.x + 7;
                attackBoxY = this.y + 32;
                attackBoxWidth = 50;
                attackBoxHeight = 50;
                break;
            case "right":
                attackBoxX = this.x + 28;
                attackBoxY = this.y + 7;
                attackBoxWidth = 50;
                attackBoxHeight = 50;
                break;
            case "left":
                attackBoxX = this.x - 16;
                attackBoxY = this.y + 7;
                attackBoxWidth = 50;
                attackBoxHeight = 50;
                break;
        }
        gameEngine.addEntity(new AttackBox(this.game,this.player,attackBoxWidth,attackBoxHeight,attackBoxX, attackBoxY, this.damage, this.facingDirection));
    }

    smack(damage, distance, direction, speed) {
        if(!this.underground) {
            this.health -= damage;
            if(this.health <= 0) {
                this.dead = true;
            }
        }
    };

    draw(ctx) {

        if (this.isDraw && this.reloading) {
            switch (this.facingDirection) {
                case "down":
                    this.retractAnimationDown.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, this.scale);
                    break;
                case "up":
                    this.retractAnimationUp.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, this.scale);
                    break;
                case "left":
                    this.retractAnimationDown.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, this.scale);
                    break;
                case "right":
                    this.retractAnimationDown.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, this.scale);
                    break;
            }
        } else if (this.isDraw && this.attacking && this.underground) {
            switch (this.facingDirection) {
                case "down":
                    this.emergeAnimationDown.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, this.scale);
                    break;
                case "up":
                    this.emergeAnimationUp.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, this.scale);
                    break;
                case "left":
                    this.emergeAnimationDown.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, this.scale);
                    break;
                case "right":
                    this.emergeAnimationDown.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, this.scale);
                    break;
            }

        } else {
            super.draw(ctx);
        }
    }

}