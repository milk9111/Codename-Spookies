/**
 * @author James Roberts
 */
class PlagueDoctor extends Enemy {
    /**
     * Constructor for the plague doctor enemy.
     * @author James Roberts
     */
    constructor(gameEngine, player, x, y, speed=1.5, range=250) {
        super( gameEngine, player, x, y, speed, range);
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

        this.attackAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/PlagueDoctor_SpriteSheet.png"), 0, 0, 64, 64, 0.2, 4, true, false);
        this.attackAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/PlagueDoctor_SpriteSheet.png"), 128, 192, 64, 64, 0.2, 1, true, false);
        this.attackAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/PlagueDoctor_SpriteSheet.png"), 0, 64, 64, 64, 0.2, 4, true, false);
        this.attackAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/PlagueDoctor_SpriteSheet.png"), 0, 128, 64, 64, 0.2, 4, true, false);

        this.spellAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/PD_Spell_SpriteSheet.png"), 0, 128, 64, 64, 0.2, 3, true, false);
        this.spellAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/PD_Spell_SpriteSheet.png"), 0, 64, 64, 64, 0.2, 3, true, false);
        this.spellAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/PD_Spell_SpriteSheet.png"), 0, 0, 64, 64, 0.2, 3, true, false);
        this.spellAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/PD_Spell_SpriteSheet.png"), 0, 192, 64, 64, 0.2, 3, true, false);


        this.DeathAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/PlagueDoctor_SpriteSheet.png"), 0, 896, 64, 64, 0.2, 4, true, false);
        this.DeathAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/PlagueDoctor_SpriteSheet.png"), 0, 960, 64, 64, 0.2, 4, true, false);
        this.notifySound = ASSET_MANAGER.getAsset("../snd/whispers.wav");
        this.notifySoundId = null;
        this.currentProjectile = null;

    };

    /**
    * This method determines which direction and in which state the plague doctor is in.
    *@author James Roberts
    */
    update() {

      let lastX = this.x;
      let lastY = this.y;

      //Check if aggroed on the player.
      if (this.isPlayerInRange()) {
          if (this.notifySoundId === null) {
              this.notifySoundId = this.notifySound.play();
              this.notifySound.fade(0.0, 0.3, 1000);
          }
          // not close enough to attack.
          if(Math.getDistance(this.player.x, this.player.y, this.x, this.y) > 100) {
              this.standingStill = false;
              this.attacking = false;
              let xDir = this.player.x - this.x;
              let yDir = this.player.y - this.y;
              //Here we need to multiply the speed by the clock like in example
              if (Math.abs(xDir) > 10) {
                  this.unroundedX += (xDir < 0) ? -this.speed : this.speed;
                  this.x = this.unroundedX;
              } else if (Math.abs(yDir) > 10){
                  this.unroundedY += (yDir) ? (yDir < 0) ? -this.speed : this.speed : 0;
                  this.y = this.unroundedY;
              }
          } else { //stand still and attack.
              this.standingStill = true;
              this.attacking = true;
              //console.log(this.currentSpellAnimation.isDone());
              if(this.currentProjectile !== null) {
                  //console.log(this.currentProjectile.numOfAnimationLoops);
              }
             if(this.currentProjectile === null || this.currentProjectile.shootAnimation.timesFinished >= 4) {
                  this.currentProjectile = null;
                  this.createSpell();
             }
          }
      } else {
          this.standingStill = true;
          this.attacking = false;
          if (this.notifySoundId !== null && this.notifySound.playing(this.notifySoundId)) {
            this.notifySound.fade(this.notifySound.volume(), 0.0, 2000);
            this.notifySoundId = null;
          }
      }
      let xDir = lastX - this.x;
      let yDir = lastY - this.y;

      super.setFacingDirection(xDir,yDir);
      //check if it needs to be drawn and change x and y if necessary for map movement.
      super.update();
    };

    createSpell() {
        let currentSpellAnimation = null;
        let facingNum = 0;
        switch(this.facingDirection) {

            case "down":
                currentSpellAnimation = this.spellAnimationDown;
                facingNum = 2;
                break;
            case "up":
                currentSpellAnimation = this.spellAnimationUp;
                facingNum = 1;
                break;
            case "left":
                currentSpellAnimation = this.spellAnimationLeft;
                facingNum = 3;
                break;
            case "right":
                currentSpellAnimation = this.spellAnimationRight;
                facingNum = 4;
                break;
        }
        this.currentProjectile = new Projectile(this.game, currentSpellAnimation,facingNum,this.x,this.y);
        this.game.addEntity(this.currentProjectile);

    };
    /**
     * Draws the character on the canvas.
     * @param ctx
     * @author James Roberts
     */
    draw(ctx) {
      if (this.isDraw) {
        if(this.attacking) {
            this.attack(ctx);
        } else if(this.standingStill) {
            this.standStill(ctx);
        } else {
            this.walking(ctx);
        }
      }

      super.draw(this.game.ctx);
    };

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
