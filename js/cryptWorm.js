/**
 * @author James Roberts
 */
class CryptWorm extends Enemy {
    /**
     * Constructor for the plague doctor enemy.
     * @author James Roberts
     */
    constructor(gameEngine, player, x, y, speed = .75, range = 300, coolDown = 75) {
        super(gameEngine, player, x, y, speed, range, coolDown, 32, 64, 16, 0);
        this.underground = true;
        this.damage = 0; //20
        this.health = 300;
        //using same as plague doctor for now
        this.soundPath = "../snd/whispers.wav";
        this.notifySound = ASSET_MANAGER.getAsset("../snd/whispers.wav");
        this.createAnimations();
    };

    /**
     * Creates all of the animations for the Plague Doctor.
     */
    createAnimations() {

        //spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse
        this.idleAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 1280, 64, 64, 0.5, 1, true, false);
        this.idleAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 1280, 64, 64, 0.5, 1, true, false);
        this.idleAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 1280, 64, 64, 0.5, 1, true, false);
        this.idleAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 1280, 64, 64, 0.5, 1, true, false);

        this.walkAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 1280, 64, 64, 0.2, 3, true, false);
        this.walkAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 1280, 64, 64, 0.2, 3, true, false);
        this.walkAnimationDownAgro = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 1280, 64, 64, 0.2, 3, true, false);
        this.walkAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 1280, 64, 64, 0.2, 3, true, false);
        this.walkAnimationLeftAgro = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 1280, 64, 64, 0.2, 3, true, false);
        this.walkAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 1280, 64, 64, 0.2, 3, true, false);
        this.walkAnimationRightAgro = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 1280, 64, 64, 0.2, 3, true, false);

        this.attackAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 384, 64, 64, 0.15, 8, true, false);
        this.attackAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 256, 64, 64, 0.15, 6, true, false);
        this.attackAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 512, 64, 64, 0.15, 8, true, false);
        this.attackAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 640, 64, 64, 0.15, 8, true, false);

        this.emergeAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 128, 64, 64, 0.2, 7, true, false);
        this.retractAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 1152, 64, 64, 0.2, 7, true, false);
        this.emergeAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 0, 64, 64, 0.2, 7, true, false);
        this.retractAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 1024, 64, 64, 0.2, 7, true, false);

        this.deathAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 896, 64, 64, 0.2, 7, false, false);
        this.deathAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/Crypt_Worm_SpriteSheet.png"), 0, 768, 64, 64, 0.2, 7, false, false);
    };

    moveToPlayer(lastX,lastY) {
        if(!this.underground) {
            this.reloading = true;
            this.targetAndAttack();
        } else {
            super.moveToPlayer(lastX, lastY);
        }
    }
    /*
    */
    targetAndAttack() {
        this.standingStill = true;
        this.attacking = true;
        if(this.underground) {
            if(this.emergeAnimationDown.timesFinished === 1 || this.emergeAnimationUp.timesFinished ===1) {
                this.emergeAnimationDown.timesFinished = 0;
                this.emergeAnimationUp.timesFinished = 0;
                this.underground = false;
            }
        } else if (this.reloading) {
            if(this.retractAnimationDown.timesFinished === 1 || this.retractAnimationUp.timesFinished ===1) {
                this.retractAnimationDown.timesFinished = 0;
                this.retractAnimationUp.timesFinished = 0;
                this.underground = true;
                this.reloading = false;
                this.attacking = false;
                this.cooldownCounter = this.attackCooldown;
            }
        } else if(this.cooldownCounter >= this.attackCooldown) {
            this.cooldownCounter = 0;
            this.createAttackBox();
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
                attackBoxHeight = 40;
                break;
            case "down":
                attackBoxX = this.x + 7;
                attackBoxY = this.y + 52;
                attackBoxWidth = 50;
                attackBoxHeight = 40;
                break;
            case "right":
                attackBoxX = this.x + 58;
                attackBoxY = this.y + 7;
                attackBoxWidth = 40;
                attackBoxHeight = 50;
                break;
            case "left":
                attackBoxX = this.x - 16;
                attackBoxY = this.y + 7;
                attackBoxWidth = 40;
                attackBoxHeight = 50;
                break;
        }
        gameEngine.addEntity(new AttackBox(this.game,this.player,attackBoxWidth,attackBoxHeight,attackBoxX, attackBoxY, this.damage, this.facingDirection));
    }

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