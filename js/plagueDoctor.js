/**
 * @author James Roberts
 */
class PlagueDoctor extends Enemy {
    /**
     * Constructor for the plague doctor enemy.
     * @author James Roberts
     */
    constructor(gameEngine, player, x, y, speed = 1.5, range = 250) {
        super(gameEngine, player, x, y, speed, range, 32, 64, 16, 0);

        this.stoppingDistance = 200;
        this.soundPath = "../snd/whispers.wav";
        this.notifySound = ASSET_MANAGER.getAsset("../snd/whispers.wav");
        this.createAnimations();
        this.currentProjectile = null;


    };

    /**
     * Creates all of the animations for the Plague Doctor.
     */
    createAnimations() {

        //spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse
        this.idleAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/PlagueDoctor_SpriteSheet.png"), 0, 384, 64, 64, 0.5, 3, true, false);
        this.idleAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/PlagueDoctor_SpriteSheet.png"), 0, 192, 64, 64, 0.5, 2, true, false);
        this.idleAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/PlagueDoctor_SpriteSheet.png"), 0, 256, 64, 64, 0.5, 3, true, false);
        this.idleAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/PlagueDoctor_SpriteSheet.png"), 0, 320, 64, 64, 0.5, 3, true, false);

        this.walkAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/PlagueDoctor_SpriteSheet.png"), 0, 448, 64, 64, 0.2, 4, true, false);
        this.walkAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/PlagueDoctor_SpriteSheet.png"), 0, 512, 64, 64, 0.2, 4, true, false);
        this.walkAnimationDownAgro = new Animation(ASSET_MANAGER.getAsset("../img/PlagueDoctor_SpriteSheet.png"), 0, 576, 64, 64, 0.2, 4, true, false);
        this.walkAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/PlagueDoctor_SpriteSheet.png"), 0, 640, 64, 64, 0.2, 4, true, false);
        this.walkAnimationLeftAgro = new Animation(ASSET_MANAGER.getAsset("../img/PlagueDoctor_SpriteSheet.png"), 0, 704, 64, 64, 0.2, 4, true, false);
        this.walkAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/PlagueDoctor_SpriteSheet.png"), 0, 768, 64, 64, 0.2, 4, true, false);
        this.walkAnimationRightAgro = new Animation(ASSET_MANAGER.getAsset("../img/PlagueDoctor_SpriteSheet.png"), 0, 832, 64, 64, 0.2, 4, true, false);

        this.attackAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/PlagueDoctor_SpriteSheet.png"), 0, 0, 64, 64, 0.6, 4, true, false);
        this.attackAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/PlagueDoctor_SpriteSheet.png"), 128, 192, 64, 64, 0.6, 1, true, false);
        this.attackAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/PlagueDoctor_SpriteSheet.png"), 0, 64, 64, 64, 0.6, 4, true, false);
        this.attackAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/PlagueDoctor_SpriteSheet.png"), 0, 128, 64, 64, 0.6, 4, true, false);

        this.spellAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/PD_Spell_SpriteSheet.png"), 0, 128, 64, 64, 0.2, 3, true, false);
        this.spellAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/PD_Spell_SpriteSheet.png"), 0, 64, 64, 64, 0.2, 3, true, false);
        this.spellAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/PD_Spell_SpriteSheet.png"), 0, 0, 64, 64, 0.2, 3, true, false);
        this.spellAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/PD_Spell_SpriteSheet.png"), 0, 192, 64, 64, 0.2, 3, true, false);


        this.deathAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/PlagueDoctor_SpriteSheet.png"), 0, 896, 64, 64, 0.4, 4, false, false);
        this.deathAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/PlagueDoctor_SpriteSheet.png"), 0, 960, 64, 64, 0.4, 4, false, false);
    }

    /**
     * Causes the plague doctor to shoot projectiles at the player and move so that it's projectiles can hit if necessary.
     * Creates a new projectile in the game world.
     */
    targetAndAttack() {
        let canHit = false;
        if (this.y > this.player.y - 36 && this.y < this.player.y + 36) {
            canHit = true;
            if (this.player.x > this.x) {
                this.facingDirection = "right";
            } else {
                this.facingDirection = "left";
            }
        } else if (this.x >= this.player.x - 16 && this.x <= this.player.x + 20) {
            canHit = true;
            if (this.player.y > this.y) {
                this.facingDirection = "down";
            } else {
                this.facingDirection = "up";
            }
        } else {
            this.attacking = false;
            this.standingStill = false;
            if (this.y > this.player.y + 64 || this.y < this.player.y - 64) {
                let xDiff = this.player.x - this.x;
                this.x += (xDiff < 0) ? -this.speed : this.speed;
                this.facingDirection = (xDiff < 0) ? "left" : "right";

            } else {
                let yDiff = this.player.y - this.y;
                this.y += (yDiff < 0) ? -this.speed : this.speed;
                this.facingDirection = (yDiff < 0) ? "up" : "down";

            }

        }

        if (canHit) {
            this.standingStill = true;
            this.attacking = true;
            //If there is no spell fired by this enemy in existence it can shoot.
            if (this.currentProjectile === null || this.currentProjectile.removeFromWorld) {
                this.createSpell();
            }
        }
    }

    /**
     * Creates a new spell projectile.
     */
    createSpell() {
        let currentSpellAnimation = null;
        let facingNum = 0;
        let spellX = this.x;
        let spellY = this.y;
        switch (this.facingDirection) {

            case "down":
                currentSpellAnimation = this.spellAnimationDown;
                facingNum = 2;
                break;
            case "up":
                spellY = this.y - 32;
                currentSpellAnimation = this.spellAnimationUp;
                facingNum = 1;
                break;
            case "left":
                spellX = this.x - 5;
                spellY = this.y - 2;
                currentSpellAnimation = this.spellAnimationLeft;
                facingNum = 3;
                break;
            case "right":
                spellX = this.x + 5;
                spellY = this.y - 2;
                currentSpellAnimation = this.spellAnimationRight;
                facingNum = 4;
                break;
        }
        this.currentProjectile = new Projectile(this.game, currentSpellAnimation, this.facingDirection, spellX, spellY, this.player, this);
        this.game.addEntity(this.currentProjectile);

    };

}