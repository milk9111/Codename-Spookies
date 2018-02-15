class BallOfFlesh extends Enemy { //speed 3 damage 40
    constructor(gameEngine, player, x, y, speed=3, range=200, coolDown = 50) {
        super( gameEngine, player, x, y, speed, range,coolDown,50,60,7,2);
        this.createAnimations();
        this.damage = 30;
        //This is just a reminder that this will need to be set by the screamer.
        this.soundPath = super.soundPath;
        this.notifySound = super.notifySound;
        // this.scale = 1.5;
    };

    /**
     * Creates all of the animations for the Screamer.
     */
    createAnimations() {
        //spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse

        this.idleAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/Ball_of_Flesh_SpriteSheet.png"), 192, 192, 64, 64, 0.5, 4, true, false);
        this.idleAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/Ball_of_Flesh_SpriteSheet.png"), 384, 128, 64, 64, 0.5, 3, true, false);
        this.idleAnimationDown = this.idleAnimationRight;
        this.idleAnimationUp = this.idleAnimationLeft;

        //No specific agro animations.
        this.walkAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/Ball_of_Flesh_SpriteSheet.png"), 0, 0, 64, 64, 0.1, 4, true, false);
        this.walkAnimationLeftAgro = this.walkAnimationLeft;
        this.walkAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/Ball_of_Flesh_SpriteSheet.png"), 320, 0, 64, 64, 0.1, 4, true, false);
        this.walkAnimationRightAgro = this.walkAnimationRight;
        this.walkAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/Ball_of_Flesh_SpriteSheet.png"), 192, 64, 64, 64, 0.1, 4, true, false);
        this.walkAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Ball_of_Flesh_SpriteSheet.png"), 64, 128, 64, 64, 0.1, 4, true, false);
        this.walkAnimationDownAgro = this.walkAnimationDown;

        this.attackAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/Ball_of_Flesh_SpriteSheet.png"), 0, 256, 64, 64, 0.3, 2, true, false);
        this.attackAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/Ball_of_Flesh_SpriteSheet.png"), 128, 256, 64, 64, 0.3, 2, true, false);
        this.attackAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Ball_of_Flesh_SpriteSheet.png"), 384, 256, 64, 64, 0.3, 2, true, false);
        this.attackAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/Ball_of_Flesh_SpriteSheet.png"), 256, 256, 64, 64, 0.3, 2, true, false);

        //no existing death animations
        this.deathAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Ball_of_Flesh_SpriteSheet.png"), 128, 320, 64, 64, 0.1, 8, false, false);
        this.deathAnimationUp = this.deathAnimationDown;
    }

    createAttackBox() {
        let attackBoxX;
        let attackBoxY;
        //specifics for ball of flesh
        let attackBoxWidth;
        let attackBoxHeight;
        switch(this.facingDirection) {
            case "up":
                attackBoxX = this.x + 7;
                attackBoxY = this.y - 20;
                attackBoxWidth = 50;
                attackBoxHeight = 20;
                break;
            case "down":
                attackBoxX = this.x + 7;
                attackBoxY = this.y + 52;
                attackBoxWidth = 50;
                attackBoxHeight = 20;
                break;
            case "right":
                attackBoxX = this.x + 58;
                attackBoxY = this.y + 7;
                attackBoxWidth = 20;
                attackBoxHeight = 50;
                break;
            case "left":
                attackBoxX = this.x - 16;
                attackBoxY = this.y + 7;
                attackBoxWidth = 20;
                attackBoxHeight = 50;
                break;
        }
        gameEngine.addEntity(new AttackBox(this.game,this.player,attackBoxWidth,attackBoxHeight,attackBoxX, attackBoxY,this.damage,this.facingDirection));
    }
}