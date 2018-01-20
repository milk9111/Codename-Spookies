
const fireSpell = "WWAD";
let castSuccessful = false;

/**
 * This is the 'constructor' for the Player object. It holds all of the instance fields
 * for the Player like animations and what the current motion/direction they are doing is.
 *
 * @param game The instance of the GameEngine
 * @constructor
 * @author Connor Lundberg
 */
class Player extends Entity {

    constructor(game) {

        super(game, game.surfaceWidth/2, game.surfaceHeight/2); //(0, 400) signify where the sprite will be drawn.

        this.game = game;

        //spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse
        this.idleAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 128, 0, 64, 64, 0.3, 2, true, false);
        this.idleAnimationDownward = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 0, 0, 64, 64, 0.3, 2, true, false);
        this.idleAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 256, 0, 64, 64, 0.3, 2, true, false);
        this.idleAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 0, 64, 64, 64, 0.3, 2, true, false);

        this.walkRightAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 256, 128, 64, 64, 0.15,  4, true, false);
        this.walkLeftAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 0, 128, 64, 64, 0.15,  4, true, false);
        this.walkForwardAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 256, 64, 64, 64, 0.3,  2, true, false);
        this.walkDownwardAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 128, 64, 64, 64, 0.3,  2, true, false);

        this.swingDownwardAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 128, 192, 64, 64, 0.1,  3, false, false);
        this.swingForwardAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 320, 192, 64, 64, 0.1,  3, false, false);
        this.swingLeftAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 320, 256, 64, 64, 0.1,  3, false, false);
        this.swingRightAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 128, 256, 64, 64, 0.1,  3, false, false);

        this.castSpellDownwardAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 0, 384, 64, 64, 0.1,  5, true, false);
        this.castSpellForwardAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 0, 448, 64, 64, 0.1,  5, true, false);
        this.castSpellLeftAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 0, 512, 64, 64, 0.1,  5, true, false);
        this.castSpellRightAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 0, 576, 64, 64, 0.1,  5, true, false);

        this.raiseShieldDownwardAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 0, 640, 64, 64, 0.3,  2, true, false);
        this.raiseShieldForwardAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 128, 640, 64, 64, 0.3,  2, true, false);
        this.raiseShieldLeftAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 256, 640, 64, 64, 0.3,  2, true, false);
        this.raiseShieldRightAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 0, 704, 64, 64, 0.3,  2, true, false);

        this.shootBoltDownwardAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 192, 704, 64, 64, 0.1,  3, false, false);
        this.shootBoltForwardAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 0, 768, 64, 64, 0.1,  3, false, false);
        this.shootBoltLeftAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 192, 768, 64, 64, 0.1,  3, false, false);
        this.shootBoltRightAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Hooded_Figure_SpriteSheet.png"), 0, 832, 64, 64, 0.1,  3, false, false);

        this.fireBallSpellAnimation = new Animation(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 32, 32 * 15, 32, 32, 0.9,  1, true, false);

        this.walkingSound = ASSET_MANAGER.getAsset("../snd/footstep1.wav");
        this.walkingSoundId = this.walkingSound.id;

        this.ctx = game.ctx;

        this.jumping = false;
        this.walkingRight = false;
        this.walkingLeft = false;
        this.walkingForward = false;
        this.walkingDownward = false;
        this.turnedAround = false;
        this.firstOpen = true;
        this.swinging = false;
        this.casting = false;
        //this.castSuccessful = false;
        this.raising = false;
        this.shooting = false;
        this.radius = 100;
        this.ground = 418;
        this.currentSpell = fireSpell;

        this.spellCombo = "";

        //If moving off screen
        this.offRight = false;
        this.offLeft = false;
        this.offTop = false;
        this.offBottom = false;
    }

    /**
     * Here the Player will decide what direction they're moving towards next.
     * It handles the actual x & y movement value for the Player object. This
     * is NOT the animation handler.
     *
     * To change the speed of the Player, simply raise or lower the totalDistance variable.
     *
     * @author Connor Lundberg
     */
    update() {
        let totalDistance = 3;

        /*if (this.game.keys["KeyQ"].pressed && !this.casting) {
            console.log("Q pressed");
            this.casting = true;
        }*/

        if (this.game.cast && !this.casting) {
            this.casting = true;
        }

        if (!this.casting) {
            if (this.game.keys["KeyD"].pressed) {
                facingDirection = 4;
                this.walkingRight = true;
            } else {
                this.walkRightAnimation.elapsedTime = 0;
                this.walkingRight = false;
            }

            if (this.game.keys["KeyA"].pressed) {
                facingDirection = 3;
                this.walkingLeft = true;
            } else {
                this.walkLeftAnimation.elapsedTime = 0;
                this.walkingLeft = false;
            }

            if (this.game.keys["KeyW"].pressed) {
                facingDirection = 1;
                this.walkingForward = true;
            } else {
                this.walkForwardAnimation.elapsedTime = 0;
                this.walkingForward = false;
            }

            if (this.game.keys["KeyS"].pressed) {
                facingDirection = 2;
                this.walkingDownward = true;
            } else {
                this.walkDownwardAnimation.elapsedTime = 0;
                this.walkingDownward = false;
            }

            if (this.game.click && !this.swinging) {
                this.swinging = true;
                this.game.click = false;
            }

            if (this.game.keys["KeyE"].pressed) {
                this.raising = true;
            } else {
                this.raising = false;
            }

            if (this.game.keys["Space"].pressed && !this.shooting) {
                this.shooting = true;
            }
        } else {
            //this.readCombo();
        }



        if (this.casting && !this.game.cast) {
            this.castSpellDownwardAnimation.elapsedTime = 0;
            this.castSpellForwardAnimation.elapsedTime = 0;
            this.castSpellLeftAnimation.elapsedTime = 0;
            this.castSpellRightAnimation.elapsedTime = 0;
            this.casting = false;
        }

        if (castSuccessful) {
            castSuccessful = false;
            this.fireBallSpellAnimation.elapsedTime = 0;
            let animation = this.fireBallSpellAnimation;

            let newX = this.x;
            let newY = this.y;
            switch (facingDirection) {
                case 1:
                    newX += 16;
                    newY -= 20;
                    break;
                case 2:
                    newX += 16;
                    newY += 32;
                    break;
                case 3:
                    newY += 16;
                    break;
                case 4:
                    newX += 32;
                    newY += 16;
                    break;
                default:
                    break;
            }

            let spell = new Projectile(this.game, animation, facingDirection, newX, newY);
            this.game.addEntity(spell);
            ASSET_MANAGER.getAsset("../snd/woman_scream.wav").play();
        }

        if (this.walkingRight) {
            //Stop player from moving off screen right
            if (!this.offRight) {
                let distance = totalDistance;
                this.x = this.x + distance;
                playerStartX = this.x - distance;
            }
        }

        if (this.walkingLeft) {
            //Stop player from going off left side of the screen
            if (!this.offLeft) {
                let distance = totalDistance;
                this.x = this.x - distance;
                playerStartX = this.x + distance;
            }
        }

        if (this.walkingForward) {
            //Stop player from moving off screen from the top
            if(!this.offTop) {
                let distance = totalDistance;
                this.y = this.y - distance;
                playerStartY = this.y + distance;
            }
        }

        if (this.walkingDownward) {
            //Stop player from going off screen from the bottom
            if (!this.offBottom) {
                let distance = totalDistance;
                this.y = this.y + distance;
                playerStartY = this.y - distance;
            }
        }


        if ((this.walkingForward || this.walkingDownward
            || this.walkingLeft || this.walkingRight)
            && !this.walkingSound.playing(this.walkingSoundId)) {
            this.walkingSound.play()
        } else {
            if (this.walkingSound.playing(this.walkingSoundId))
            this.walkingSound.pause()
        }


        //raising shield
        if (this.raising) {
            if (this.raiseShieldDownwardAnimation.isDone()) {
                this.raiseShieldDownwardAnimation.elapsedTime = 0;
                this.raising = false;
            }
            if (this.raiseShieldForwardAnimation.isDone()) {
                this.raiseShieldForwardAnimation.elapsedTime = 0;
                this.raising = false;
            }
            if (this.raiseShieldLeftAnimation.isDone()) {
                this.raiseShieldLeftAnimation.elapsedTime = 0;
                this.raising = false;
            }
            if (this.raiseShieldRightAnimation.isDone()) {
                this.raiseShieldRightAnimation.elapsedTime = 0;
                this.raising = false;
            }
        }


        //shooting bolt
        if (this.shooting) {
            ASSET_MANAGER.getAsset("../snd/crossbow.wav").play();
            if (this.shootBoltDownwardAnimation.isDone()) {
                this.shootBoltDownwardAnimation.elapsedTime = 0;
                this.shooting = false;
                shoot = false;
            }
            if (this.shootBoltForwardAnimation.isDone()) {
                this.shootBoltForwardAnimation.elapsedTime = 0;
                this.shooting = false;
                shoot = false;
            }
            if (this.shootBoltLeftAnimation.isDone()) {
                this.shootBoltLeftAnimation.elapsedTime = 0;
                this.shooting = false;
                shoot = false;
            }
            if (this.shootBoltRightAnimation.isDone()) {
                this.shootBoltRightAnimation.elapsedTime = 0;
                this.shooting = false;
                shoot = false;
            }
        }


        //swinging sword
        if (this.swinging) {
            ASSET_MANAGER.getAsset("../snd/sword_woosh.wav").play();

            if (this.swingDownwardAnimation.isDone()) {
                this.swingDownwardAnimation.elapsedTime = 0;
                this.swinging = false;
                swing = false;
            }
            if (this.swingForwardAnimation.isDone()) {
                this.swingForwardAnimation.elapsedTime = 0;
                this.swinging = false;
                swing = false;

            }
            if (this.swingLeftAnimation.isDone()) {
                this.swingLeftAnimation.elapsedTime = 0;
                this.swinging = false;
                swing = false;

            }
            if (this.swingRightAnimation.isDone()) {
                this.swingRightAnimation.elapsedTime = 0;
                this.swinging = false;
                swing = false;

            }
        }


        //Control Bounds
        if (this.x > $("#gameWorld").width() - 150 && this.walkingRight) {
            this.offRight = true;
        } else {
            this.offRight = false;
        }

        if (this.x <  150 && this.walkingLeft) {
            this.offLeft = true;
        } else {
            this.offLeft = false;
        }

        if (this.y <  150 && this.walkingForward) {
            this.offTop = true;
        } else {
            this.offTop = false;
        }

        if (this.y > $("#gameWorld").height() - 150 && this.walkingDownward) {
            this.offBottom = true;
        } else {
            this.offBottom = false;
        }

        Entity.prototype.update.call(this);

    }
    /**
     * Here the corresponding movement direction (as chosen in Player.prototype.update) will
     * start the animation for that action. If no movement is going, it will go to the idle
     * animation.
     *
     * @param ctx The context to draw the image onto.
     * @author Connor Lundberg
     */
    draw(ctx) {
        if (this.walkingRight) {
            this.walkRightAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        }
        else if (this.walkingLeft) {
            this.walkLeftAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        }
        else if (this.walkingForward) {
            this.walkForwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        }
        else if (this.walkingDownward) {
            this.walkDownwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        }
        else if (this.shooting) {
            this.shootBolt(ctx);
        }
        else if (this.raising) {
            this.raiseShield(ctx);
        }
        else if (this.swinging) {
            this.swingSword(ctx);
        }
        else if (this.casting) {
            this.castSpell(ctx);
        }
        else if (castSuccessful) {
            /*console.log("animating fireball");

            this.fireBallSpellAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
            if (this.fireBallSpellAnimation.isDone()) {
                castSuccessful = false;
            }*/
        }
        else {
            this.standStill(ctx);
        }
        Entity.prototype.draw.call(this);
    }

    shootBolt(ctx) {
        if (facingDirection === 1) {
            this.shootBoltForwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        }
        else if (facingDirection === 2) {
            this.shootBoltDownwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        }
        else if (facingDirection === 3) {
            this.shootBoltLeftAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        }
        else {
            this.shootBoltRightAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        }
    }

    raiseShield(ctx) {
        if (facingDirection === 1) {
            this.raiseShieldForwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        }
        else if (facingDirection === 2) {
            this.raiseShieldDownwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        }
        else if (facingDirection === 3) {
            this.raiseShieldLeftAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        }
        else {
            this.raiseShieldRightAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        }
    }

    castSpell(ctx) {
        if (facingDirection === 1) {
            this.castSpellForwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        }
        else if (facingDirection === 2) {
            this.castSpellDownwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        }
        else if (facingDirection === 3) {
            this.castSpellLeftAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        }
        else {
            this.castSpellRightAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        }
    }
    standStill(ctx) {
        if (facingDirection === 1) {
            this.idleAnimationDown.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        } else if (facingDirection === 2) {
            this.idleAnimationDownward.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        } else if (facingDirection === 3) {
            this.idleAnimationLeft.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        } else {
            this.idleAnimationRight.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        }
    }

    swingSword(ctx) {
        if (facingDirection === 1) {
            this.swingForwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        }
        else if (facingDirection === 2) {
            this.swingDownwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        }
        else if (facingDirection === 3) {
            this.swingLeftAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        }
        else {
            this.swingRightAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        }
    }


    readCombo() {
        if (!this.firstOpen) {
            for (let i = 0; i < this.game.codes.length; i++) {
                let currCode = this.game.codes[i];
                if (this.game.keys[currCode].pressed) {
                    console.log(currCode);
                    this.spellCombo += String.fromCharCode(this.game.keys[currCode].code);
                    let currPos = this.spellCombo.length;
                    if (this.spellCombo !== this.currentSpell.substring(0, currPos)) {
                        console.log("Spell failed");
                        this.spellCombo = "";
                        this.casting = false;
                        castSuccessful = false;
                        break;
                    } else if (this.spellCombo === this.currentSpell) {
                        console.log("Spell passed");
                        this.spellCombo = "";
                        this.casting = false;
                        castSuccessful = true;
                        break;
                    }
                }
            }
        } else {
            this.firstOpen = false;
        }
    }

}


