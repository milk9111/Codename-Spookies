class BallOfFlesh extends Enemy {
    constructor(gameEngine, player, x, y, speed=3, range=250) {
        super( gameEngine, player, x, y, speed, range,32,64,16,0);
        console.log("Making a Ball of Flesh");
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

        this.idleAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/Ball_of_Flesh_SpriteSheet.png"), 192, 128, 64, 64, 0.5, 4, true, false);
        this.idleAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/Ball_of_Flesh_SpriteSheet.png"), 0, 128, 64, 64, 0.5, 3, true, false);
        this.idleAnimationDown = this.idleAnimationRight;
        this.idleAnimationUp = this.idleAnimationLeft;

        //No specific agro animations.
        this.walkAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/Ball_of_Flesh_SpriteSheet.png"), 0, 0, 64, 64, 0.5, 4, true, false);
        this.walkAnimationLeftAgro = this.walkAnimationLeft;
        this.walkAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/Ball_of_Flesh_SpriteSheet.png"), 0, 64, 64, 64, 0.5, 4, true, false);
        this.walkAnimationRightAgro = this.walkAnimationRight;
        this.walkAnimationUp = this.walkAnimationLeft;
        this.walkAnimationDown = this.walkAnimationRight;
        this.walkAnimationDownAgro = this.walkAnimationDown;

        this.attackAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/Ball_of_Flesh_SpriteSheet.png"), 128, 192, 64, 64, 0.5, 4, true, false);
        this.attackAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/Ball_of_Flesh_SpriteSheet.png"), 0, 256, 64, 64, 0.5, 4, true, false);
        this.attackAnimationDown = this.attackAnimationLeft;
        this.attackAnimationUp = this.attackAnimationRight;

        //no existing death animations
        this.deathAnimationDown = null;
        this.deathAnimationUp = null;
    }


}