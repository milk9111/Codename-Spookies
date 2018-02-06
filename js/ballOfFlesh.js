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
        //Only one idle animation, set all 4 cases to same animation.
        this.idleAnimationDown = null;
        this.idleAnimationUp = this.idleAnimationDown;
        this.idleAnimationRight = this.idleAnimationDown;
        this.idleAnimationLeft = this.idleAnimationDown;

        this.walkAnimationUp = null;
        //screamer uses down walking animation for all positions but up. There are no specific aggro animations.
        this.walkAnimationDown = null;
        this.walkAnimationDownAgro = this.walkAnimationDown;
        this.walkAnimationLeft = this.walkAnimationDown;
        this.walkAnimationLeftAgro = this.walkAnimationDown;
        this.walkAnimationRight = this.walkAnimationDown;
        this.walkAnimationRightAgro = this.walkAnimationDown;

        this.attackAnimationDown = null;
        this.attackAnimationUp = null;
        this.attackAnimationLeft = this.attackAnimationUp;
        this.attackAnimationRight = this.attackAnimationUp;

        //no existing death animations
        this.deathAnimationDown = null;
        this.deathAnimationUp = null;
    }


}