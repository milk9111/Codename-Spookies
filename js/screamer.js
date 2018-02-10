class Screamer extends Enemy {
    constructor(gameEngine, player, x, y, speed=1, range=250) {
        super( gameEngine, player, x, y, speed, range,32,64,16,0);
        //console.log("Making a screamer");
        this.createAnimations();
        //This is just a reminder that this will need to be set by the screamer.
        this.soundPath = super.soundPath;
        this.notifySound = super.notifySound;
    };

    /**
     * Creates all of the animations for the Screamer.
     */
    createAnimations() {
        //spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse
        //Only one idle animation, set all 4 cases to same animation.
        this.idleAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Spider_Monster_SpriteSheet.png"), 0, 0, 64, 64, 0.5, 3, true, false);
        this.idleAnimationUp = this.idleAnimationDown;
        this.idleAnimationRight = this.idleAnimationDown;
        this.idleAnimationLeft = this.idleAnimationDown;

        this.walkAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/Spider_Monster_SpriteSheet.png"), 256, 64, 64, 64, 0.15, 3, true, false);
        //screamer uses down walking animation for all positions but up. There are no specific aggro animations.
        this.walkAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Spider_Monster_SpriteSheet.png"), 192, 0, 64, 64, 0.15, 3, true, false);
        this.walkAnimationDownAgro = this.walkAnimationDown;
        this.walkAnimationLeft = this.walkAnimationDown;
        this.walkAnimationLeftAgro = this.walkAnimationDown;
        this.walkAnimationRight = this.walkAnimationDown;
        this.walkAnimationRightAgro = this.walkAnimationDown;

        this.attackAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Spider_Monster_SpriteSheet.png"), 64, 64, 64, 64, 0.15, 3, true, false);
        this.attackAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/Spider_Monster_SpriteSheet.png"), 128, 128, 64, 64, 0.15, 3, true, false);
        this.attackAnimationLeft = this.attackAnimationDown;
        this.attackAnimationRight = this.attackAnimationDown;

        //no existing death animations
        this.deathAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Spider_Monster_SpriteSheet.png"), 0, 192, 64, 64, 0.15, 6, false, false);
        this.deathAnimationUp = this.deathAnimationDown;
    }


}