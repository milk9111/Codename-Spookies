/**
 * @author James Roberts
 */
class PlagueDoctor extends Enemy {
    /**
     * Constructor for the plague doctor enemy.
     * @author James Roberts
     */
    constructor(gameEngine, player, x, y, speed=1.5, range=250) {
        super( gameEngine, player, x, y, speed, range,32,64,16,0);
        //spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse
        this.idleAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/PlagueDoctor_SpriteSheet.png"), 0, 384, 64, 64, 0.5, 3, true, false);
        this.idleAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/PlagueDoctor_SpriteSheet.png"),0,192,64,64,0.5,2,true,false);
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
        this.notifySound = ASSET_MANAGER.getAsset("../snd/whispers.wav");
        this.notifySoundId = null;
        this.currentProjectile = null;


    };

    /**
    * This method determines which direction and in which state the plague doctor is in.
    *@author James Roberts
    */
    update() {
        //If a death animation is occurring either do nothing and wait for it to finish playing or
        //remove the entity from the world.
        if (this.deathAnimationDown.isDone() || this.deathAnimationUp.isDone()) {
            this.removeFromWorld = true;
        }

        //If not dead the plague doctor can move or change state as needed
        if(!this.dead) {
            let lastX = this.x;
            let lastY = this.y;
            let xDir = 0;
            let yDir = 0;
            //Check if aggroed on the player.
            if (this.isPlayerInRange()) {
                if (this.notifySoundId === null) {
                    this.notifySoundId = ASSET_MANAGER.playSound("../snd/whispers.wav");
                    this.notifySound.fade(0.0, 0.3, 1000);
                } else {
                    ASSET_MANAGER.playSound("../snd/whispers.wav");
                }
                // not close enough to attack.
                if (Math.getDistance(this.player.x + 32, this.player.y + 32, this.x, this.y) > 200) {
                    this.standingStill = false;
                    this.attacking = false;
                    let xDiff = this.player.x - this.x;
                    let yDiff = this.player.y - this.y;
                    //Here we need to multiply the speed by the clock like in example, this is where collision checking
                    //needs to happen since it is the only place where enemies move.
                    if (Math.abs(xDiff) > 10) {
                        this.unroundedX += (xDiff < 0) ? -this.speed : this.speed;
                        this.x = this.unroundedX;
                    } else if (Math.abs(yDiff) > 10) {
                        this.unroundedY += (yDiff) ? (yDiff < 0) ? -this.speed : this.speed : 0;
                        this.y = this.unroundedY;
                    }
                    xDir = lastX - this.x;
                    yDir = lastY - this.y;
                    super.setFacingDirection(xDir, yDir);
                } else { //stand still and attack.
                    this.targetAndAttack();
                }
            } else {
                this.standingStill = true;
                this.attacking = false;
                if (this.notifySoundId !== null && this.notifySound.playing(this.notifySoundId)) {
                    this.notifySound.fade(this.notifySound.volume(), 0.0, 2000);
                    this.notifySoundId = null;
                }
                super.setFacingDirection(xDir, yDir);
            }

        }
      //check if it needs to be drawn and change x and y if necessary for map movement.
      super.update();
    };

    targetAndAttack() {
        let canHit = false;
        if(this.y > this.player.y - 36 && this.y < this.player.y + 36) {
            canHit = true;
            if(this.player.x > this.x) {
                this.facingDirection = "right";
            } else {
                this.facingDirection = "left";
            }
        } else if (this.x >= this.player.x - 16 && this.x <= this.player.x + 20) {
            canHit = true;
            if(this.player.y > this.y) {
                this.facingDirection = "down";
            } else {
                this.facingDirection = "up";
            }
        } else {
            this.attacking = false;
            this.standingStill = false;
            if(this.y > this.player.y + 64 || this.y < this.player.y - 64) {
                if (this.player.x > this.x) {
                    this.x += this.speed;
                    this.facingDirection = "right";
                } else {
                    this.x -= this.speed;
                    this.facingDirection = "left";
                }
            } else {
                if (this.player.y > this.y) {
                    this.y += this.speed;
                    this.facingDirection = "down";
                } else {
                    this.y -= this.speed;
                    this.facingDirection = "up";
                }
            }
        }

        if(canHit) {
            this.standingStill = true;
            this.attacking = true;
            //If there is no spell fired by this enemy in existence it can shoot.
            if (this.currentProjectile === null || this.currentProjectile.removeFromWorld) {
                this.createSpell();
            }
        }    }

    createSpell() {
        let currentSpellAnimation = null;
        let facingNum = 0;
        let spellX = this.x;
        let spellY = this.y;
        switch(this.facingDirection) {

            case "down":
                currentSpellAnimation = this.spellAnimationDown;
                facingNum = 2;
                break;
            case "up":
                spellY = this.y -32;
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
        this.currentProjectile = new Projectile(this.game, currentSpellAnimation,facingNum,spellX,spellY,this.player, this);
        this.game.addEntity(this.currentProjectile);

    };

    /**
     * Draws the character on the canvas.
     * @param ctx
     * @author James Roberts
     */
    draw(ctx) {
      if (this.isDraw) {
          if(this.dead) {
              this.death(ctx);
          }else if(this.attacking) {
              this.attack(ctx);
          } else if(this.standingStill) {
              this.standStill(ctx);
          } else {
              this.walking(ctx);
          }
      }

      super.draw(this.game.ctx);
    };

    death(ctx) {
        switch(this.facingDirection) {
            case "down":
                this.deathAnimationDown.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                break;
            case "up":
                this.deathAnimationUp.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                break;
            case "left":
                this.deathAnimationDown.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                break;
            case "right":
                this.deathAnimationDown.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                break;
        }
    }

    /**
     * Draws the appropriate attack animation.
     *
     * @param ctx
     * @author James Roberts
     */
    attack(ctx) {
        switch(this.facingDirection) {
            case "down":
                this.attackAnimationDown.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                break;
            case "up":
                this.attackAnimationUp.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                break;
            case "left":
                this.attackAnimationLeft.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                break;
            case "right":
                this.attackAnimationRight.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                break;
        }

    };

    /**
     * Draws the appropriate idle animation.
     *
     * @param ctx
     * @author James Roberts
     */
    standStill(ctx) {
        switch(this.facingDirection) {
            case "down":
                this.idleAnimationDown.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                break;
            case "up":
                this.idleAnimationUp.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                break;
            case "left":
                this.idleAnimationLeft.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                break;
            case "right":
                this.idleAnimationRight.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                break;
        }

    };

    /**
     * Draws the appropriate walking animation
     * @param ctx
     * @author James Roberts
     */
    walking(ctx) {
        switch(this.facingDirection) {
            case "down":
                if(this.isPlayerInRange()) {
                    this.walkAnimationDownAgro.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                } else {
                    this.walkAnimationDown.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                }
                break;
            case "up":
                this.walkAnimationUp.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                break;
            case "left":
                if(this.isPlayerInRange()) {
                    this.walkAnimationLeftAgro.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                } else {
                    this.walkAnimationLeft.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                }
                break;
            case "right":
                if(this.isPlayerInRange()) {
                    this.walkAnimationRightAgro.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                } else {
                    this.walkAnimationRight.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
                }
                break;
        }

    };
}
