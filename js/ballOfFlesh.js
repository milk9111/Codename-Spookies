/**
 * @author James Roberts
 */
class BallOfFlesh extends Enemy {
    constructor(gameEngine, player, x, y, speed=3, range=350, coolDown = 85) {
        super( gameEngine, player, x, y, speed, range,coolDown,50,60,7,2);
        this.createAnimations();
        this.reverseDirections = this.buildReverseDirections();
        this.damage = 35;
        this.cooldownCounter = 0;
        //This is just a reminder that this will need to be set by the ball of flesh.
        this.soundPath = super.soundPath;
        this.notifySound = super.notifySound;
        // this.scale = 1.5;
    };

    /**
     * Creates all of the animations for the Screamer.
     * @author James Roberts
     */
    createAnimations() {
        //spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse

        this.idleAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/Ball_of_Flesh_SpriteSheet.png"), 192, 192, 64, 64, 0.5, 4, true, false);
        this.idleAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/Ball_of_Flesh_SpriteSheet.png"), 384, 128, 64, 64, 0.5, 3, true, false);
        this.idleAnimationDown = this.idleAnimationRight;
        this.idleAnimationUp = this.idleAnimationLeft;

        //No specific aggro animations.
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


        this.deathAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Ball_of_Flesh_SpriteSheet.png"), 128, 320, 64, 64, 0.1, 8, false, false);
        this.deathAnimationUp = this.deathAnimationDown;
    }

    /**
     * Causes the Ball of Flesh to attack the player, then turn around and roll away until it hits a wall or reaches
     * a certain distance.
     * @author James Roberts
     */
    targetAndAttack() {
        if(!this.reloading) { //just reached the player and can attack.
            this.createAttackBox();
            this.reloading = true;
            this.cooldownCounter = 0;
            this.standingStill = true;
            this.attacking = true;
        } else if (this.reloading && this.cooldownCounter === 0) { //just attacked
            //wait for attack animation to finish then turn around.
            if (!this.attacking || this.attackAnimationRight.timesFinished === 1 || this.attackAnimationLeft.timesFinished === 1
                || this.attackAnimationDown.timesFinished === 1 || this.attackAnimationUp.timesFinished === 1) {
                this.attackAnimationRight.timesFinished = 0;
                this.attackAnimationLeft.timesFinished = 0;
                this.attackAnimationDown.timesFinished = 0;
                this.attackAnimationUp.timesFinished = 0;

                this.facingDirection = this.reverseDirections[this.facingDirection];
                this.cooldownCounter++;
                this.attacking = false;
            }
        } else if(this.cooldownCounter >= this.attackCooldown) { //done moving away from player;
            this.facingDirection = this.reverseDirections[this.facingDirection];
            this.reloading = false;
            this.attacking = false;
            this.standingStill = true;
        } else { //moving away from player
            this.cooldownCounter++;
            this.attacking = false;
            this.standingStill = false;
            let oldY = this.y;
            let oldX = this.x;
            if(this.facingDirection === "up") {
                this.y -= this.speed;
            } else if (this.facingDirection === "down") {
                this.y += this.speed;
            } else if (this.facingDirection === "right") {
                this.x += this.speed;
            } else {
                this.x -= this.speed;
            }
            //hit a wall, stop rolling away
            if(this.hasCollided(this, gameEngine.walls)) {
                this.y = oldY;
                this.x = oldX;
                this.cooldownCounter = this.attackCooldown;
            }

        }

    };

    /**
     *
     * @returns {{}} array where index = direction, value = opposite direction
     * @author James Roberts
     */
    buildReverseDirections() {
        let reverse = {};
        reverse['right'] = 'left';
        reverse['left'] = 'right';
        reverse['up'] = 'down';
        reverse['down'] = 'up';
        return reverse;
    };

    /**
     * Creates the appropriate attack box for the ball of flesh.
     * @author James Roberts
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