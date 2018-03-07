/**
 * @author James Roberts
 */
class GraveWraith extends Enemy {
    /**
     * Constructor for the plague doctor enemy.
     * @author James Roberts
     */
    constructor(gameEngine, player, x, y, speed = 1.75, range = 300, coolDown = 100) {
        super(gameEngine, player, x, y, speed, range, coolDown, 32, 64, 16, 0);
        this.stoppingDistance = 100;
        this.spottedCounter = 0;
        this.maxTimeSpotted = 175;
        this.reverseDirections = this.buildReverseDirections();
        //need to replace
        this.soundPath = "../snd/graveWraith.wav";
        this.notifySound = ASSET_MANAGER.getAsset(this.soundPath);
        this.createAnimations();
        this.currentProjectile = null;
    };


    /**
     * Creates all of the animations for the Grave Wraith.
     */
    createAnimations() {

        //spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse
        this.idleAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Grave_Wraith_SpriteSheet.png"), 0, 128, 64, 64, 0.4, 2, true, false);
        this.idleAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/Grave_Wraith_SpriteSheet.png"), 256, 128, 64, 64, 0.5, 2, true, false);
        this.idleAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/Grave_Wraith_SpriteSheet.png"), 128, 128, 64, 64, 0.4, 2, true, false);
        this.idleAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/Grave_Wraith_SpriteSheet.png"), 0, 192, 64, 64, 0.4, 2, true, false);

        this.walkAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/Grave_Wraith_SpriteSheet.png"), 128, 192, 64, 64, 0.2, 4, true, false);
        this.walkAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Grave_Wraith_SpriteSheet.png"), 0, 256, 64, 64, 0.2, 5, true, false);
        this.walkAnimationDownAgro = new Animation(ASSET_MANAGER.getAsset("../img/Grave_Wraith_SpriteSheet.png"), 0, 256, 64, 64, 0.2, 5, true, false);
        this.walkAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/Grave_Wraith_SpriteSheet.png"), 0, 320, 64, 64, 0.2, 5, true, false);
        this.walkAnimationLeftAgro = new Animation(ASSET_MANAGER.getAsset("../img/Grave_Wraith_SpriteSheet.png"), 0, 320, 64, 64, 0.2, 5, true, false);
        this.walkAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/Grave_Wraith_SpriteSheet.png"), 0, 384, 64, 64, 0.2, 5, true, false);
        this.walkAnimationRightAgro = new Animation(ASSET_MANAGER.getAsset("../img/Grave_Wraith_SpriteSheet.png"), 0, 384, 64, 64, 0.2, 5, true, false);

        this.attackAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Grave_Wraith_SpriteSheet.png"), 0, 576, 64, 64, 0.2, 6, true, false);
        this.attackAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/Grave_Wraith_SpriteSheet.png"), 256, 128, 64, 64, 0.4, 2, true, false);
        this.attackAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/Grave_Wraith_SpriteSheet.png"), 0, 448, 64, 64, 0.2, 6, true, false);
        this.attackAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/Grave_Wraith_SpriteSheet.png"), 0, 512, 64, 64, 0.2, 6, true, false);

        this.spellAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/Grave_Wraith_SpriteSheet.png"), 192, 0, 64, 64, 0.2, 3, true, false);
        this.spellAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Grave_Wraith_SpriteSheet.png"), 0, 0, 64, 64, 0.2, 3, true, false);
        this.spellAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/Grave_Wraith_SpriteSheet.png"), 0, 64, 64, 64, 0.2, 3, true, false);
        this.spellAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/Grave_Wraith_SpriteSheet.png"), 192, 64, 64, 64, 0.2, 3, true, false);


        this.deathAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Grave_Wraith_SpriteSheet.png"), 0, 640, 64, 64, 0.2, 6, false, false);
        this.deathAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/Grave_Wraith_SpriteSheet.png"), 0, 640, 64, 64, 0.2, 6, false, false);
    }

    //Causes the Grave Wraith to turn to face the player when it is frozen due to being in the players line of sight
    //Also causes the Grave Wraith to teleport behind the player if it has been looked at for too long.
    canBeSeen() {
        //Face the player
        if(this.facingDirection !== this.reverseDirections[facingDirection]) {
            this.facingDirection = this.reverseDirections[facingDirection];
        }
        //Increment spottedCounter and move if the GraveWraith has been looked at for too long.
        this.spottedCounter++;
        if(this.spottedCounter >= this.maxTimeSpotted) {
            switch(facingDirection) {
                case "up":
                    this.y = this.player.y + (this.player.y - this.y);
                    break;
                case"down":
                    this.y = this.player.y + (this.player.y - this.y);
                    break;
                case"left":
                    this.x = this.player.x + (this.player.x - this.x);
                    break;
                case"right":
                    this.x = this.player.x + (this.player.x - this.x);
                    break;
            }
            this.spottedCounter = 0;
            this.cooldownCounter = this.attackCooldown;
        }
    }

    /*
    *Returns true if the Grave Wraith is in front of the player, false otherwise.
     */
    playerCanSee() {
        let canSee = false;

        switch(facingDirection) {
            case "up":
                if(this.player.y >= this.y) canSee = true;
                break;
            case"down":
                if(this.player.y <= this.y) canSee = true;
                break;
            case"left":
                if(this.player.x >= this.x) canSee = true;
                break;
            case"right":
                if(this.player.x <= this.x) canSee = true;
                break;
        }

        return canSee;
    }
    /**
     * Overrides the moveToPlayer function to allow checking for being in the player's line of sight.
     */
    moveToPlayer(lastX,lastY) {

        if(this.playerCanSee()) {
            ASSET_MANAGER.playSound(this.soundPath);
            this.standingStill = true;
            this.attacking = false;
            this.canBeSeen();
        } else {
            super.moveToPlayer(lastX, lastY)
        }
    }

    /**
     * If the Grave Wraith is not in the players line of sight, causes the grave wraith to shoot projectiles
     * at the player and move so that it's projectiles can hit if necessary.
     * Creates a new projectile in the game world.
     */
    targetAndAttack() {
        if(this.playerCanSee()) {
            this.attacking = false;
            this.standingStill = true;
            this.canBeSeen();
        } else {
            super.rangedAttack();
        }

    }
}