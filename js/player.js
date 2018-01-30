
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
        super(game, game.surfaceWidth/2 - 200, game.surfaceHeight/2 - 200, true, 26, 58, 19, 4, "player"); //(0, 400) signify where the sprite will be drawn.

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

        this.fireBallSpellDownwardAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Fireball_SpriteSheet.png"), 64 * 0, 64 * 0, 64, 64, 0.1,  3, true, false);
        this.fireBallSpellForwardAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Fireball_SpriteSheet.png"), 64 * 0, 64 * 1, 64, 64, 0.1,  3, true, false);
        this.fireBallSpellLeftAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Fireball_SpriteSheet.png"), 64 * 0, 64 * 2, 64, 64, 0.1,  3, true, false);
        this.fireBallSpellRightAnimation = new Animation(ASSET_MANAGER.getAsset("../img/Fireball_SpriteSheet.png"), 64 * 0, 64 * 3, 64, 64, 0.1,  3, true, false);
        this.currentSpellAnimation = null;


        this.walkingSound = ASSET_MANAGER.getAsset("../snd/footstep1.wav");
        this.walkingSoundId = this.walkingSound.id;

        this.chargingSpellSound = ASSET_MANAGER.getAsset("../snd/charging_spell.flac");
        this.chargingSpellSoundId = this.chargingSpellSound.id;

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
        this.currentSpell = fireSpell;

        this.health = 100;

        //Hit Box for when the player swings at an enemey
        this.swingBox = {width: 35, height: 35, x:  0, y:  0};

        this.blockedDirection = [false, false, false, false, false];

        this.spellCombo = "";

        this.darkness = null;

        //If moving off screen
        this.offRight = false;
        this.offLeft = false;
        this.offTop = false;
        this.offBottom = false;
    }


    static adjacentCollisionsAlready(blockedDirection) {
        let result = false;
        for (let i = 1; i < blockedDirection.length; i++) {
            if (blockedDirection[i]) {
                result = true;
                break;
            }
        }
        return result;
    }


    static clear (blockedDirection) {
        for (let i = 1; i < blockedDirection.length; i++) {
            blockedDirection[i] = false;
        }
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

        let collisionOccurred = this.hasCollided();

        if (collisionOccurred) {
            //if (this.blockedDirection[facingDirection] === false && !Player.adjacentCollisionsAlready(this.blockedDirection)) {
                this.blockedDirection[facingDirection] = true;
                switch (facingDirection) {
                    case 1:
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                    case 4:
                        break;
                }
            //}
        } else {
            Player.clear(this.blockedDirection);
        }


        if (this.game.cast && !this.casting) {
            if (!this.chargingSpellSound.playing(this.chargingSpellSoundId)) {
                this.chargingSpellSound.play();
            }
            this.casting = true;
        }

        if (!this.casting) {
            if (this.game.keys["KeyD"].pressed && this.blockedDirection[4] !== true) {
                facingDirection = 4;
                this.walkingRight = true;
            } else {
                this.walkRightAnimation.elapsedTime = 0;
                this.walkingRight = false;
            }

            if (this.game.keys["KeyA"].pressed && this.blockedDirection[3] !== true) {
                facingDirection = 3;
                this.walkingLeft = true;
            } else {
                this.walkLeftAnimation.elapsedTime = 0;
                this.walkingLeft = false;
            }

            if (this.game.keys["KeyW"].pressed && this.blockedDirection[1] !== true) {
                facingDirection = 1;
                this.walkingForward = true;
            } else {
                this.walkForwardAnimation.elapsedTime = 0;
                this.walkingForward = false;
            }

            if (this.game.keys["KeyS"].pressed && this.blockedDirection[2] !== true) {
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
            if (this.chargingSpellSound.playing(this.chargingSpellSoundId)) {
                this.chargingSpellSound.stop();
            }
            this.castSpellDownwardAnimation.elapsedTime = 0;
            this.castSpellForwardAnimation.elapsedTime = 0;
            this.castSpellLeftAnimation.elapsedTime = 0;
            this.castSpellRightAnimation.elapsedTime = 0;
            this.casting = false;
        }

        if (castSuccessful) {
            castSuccessful = false;
            let newX = this.x;
            let newY = this.y;
            switch(facingDirection) {
                case 1:
                    newX += 14;
                    newY -= 20;
                    this.currentSpellAnimation = this.fireBallSpellForwardAnimation;
                    break;
                case 2:
                    newX -= 10;
                    newY += 32;
                    this.currentSpellAnimation = this.fireBallSpellDownwardAnimation;
                    break;
                case 3:
                    //newY += 16;
                    newX -= 20;
                    this.currentSpellAnimation = this.fireBallSpellLeftAnimation;
                    break;
                case 4:
                    newX += 32;
                    //newY += 16;
                    this.currentSpellAnimation = this.fireBallSpellRightAnimation;
                    break;
                default:
                    break;
            }
            this.currentSpellAnimation.elapsedTime = 0;

            let spell = new Projectile(this.game, this.currentSpellAnimation, facingDirection, newX, newY, this);
            this.game.addEntity(spell);
            ASSET_MANAGER.getAsset("../snd/woman_scream.wav").play();
        }

        if (this.collide) {
          console.log("Hitting Tiles");
        }

        if (this.walkingRight) {
            //Stop player from moving off screen right
            if (!this.offRight) {
                let distance = totalDistance;
                this.x += distance;
                playerStartX = this.x - distance;
            }
        }

        if (this.walkingLeft) {
            //Stop player from going off left side of the screen
            if (!this.offLeft) {
                let distance = totalDistance;
                this.x -= distance;
                playerStartX = this.x + distance;
            }
        }

        if (this.walkingForward) {
            //Stop player from moving off screen from the top
            if(!this.offTop) {
                let distance = totalDistance;
                this.y -= distance;
                playerStartY = this.y + distance;
            }
        }

        if (this.walkingDownward) {
            //Stop player from going off screen from the bottom
            if (!this.offBottom) {
                let distance = totalDistance;
                this.y += distance;
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
        let bounds = 350;

        if (this.x > $("#gameWorld").width() - bounds && this.walkingRight) {
            this.offRight = true;
        } else {
            this.offRight = false;
        }

        if (this.x <  bounds && this.walkingLeft) {
            this.offLeft = true;
        } else {
            this.offLeft = false;
        }

        if (this.y <  bounds && this.walkingForward) {
            this.offTop = true;
        } else {
            this.offTop = false;
        }

        if (this.y > $("#gameWorld").height() - bounds && this.walkingDownward) {
            this.offBottom = true;
        } else {
            this.offBottom = false;
        }

        //Update the swing box if not swinging
        if (!this.swinging) {
          this.swingBox.x = this.x + 30;
          this.swingBox.y = this.y + 30;
          this.swingBox.height = 5;
          this.swingBox.width = 5;
        }


        super.update(this);


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
            this.walkRightAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, 1);
        }
        else if (this.walkingLeft) {
            this.walkLeftAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, 1);
        }
        else if (this.walkingForward) {
            this.walkForwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, 1);
        }
        else if (this.walkingDownward) {
            this.walkDownwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, 1);
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
        else {
            this.standStill(ctx);
        }

        Entity.prototype.draw.call(this);
    }

    shootBolt(ctx) {
        if (facingDirection === 1) {
            this.shootBoltForwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, 1);
        }
        else if (facingDirection === 2) {
            this.shootBoltDownwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, 1);
        }
        else if (facingDirection === 3) {
            this.shootBoltLeftAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, 1);
        }
        else {
            this.shootBoltRightAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, 1);
        }
    }

    raiseShield(ctx) {
        if (facingDirection === 1) {
            this.raiseShieldForwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, 1);
        }
        else if (facingDirection === 2) {
            this.raiseShieldDownwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, 1);
        }
        else if (facingDirection === 3) {
            this.raiseShieldLeftAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, 1);
        }
        else {
            this.raiseShieldRightAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, 1);
        }
    }

    castSpell(ctx) {
        if (facingDirection === 1) {
            this.castSpellForwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, 1);
        }
        else if (facingDirection === 2) {
            this.castSpellDownwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, 1);
        }
        else if (facingDirection === 3) {
            this.castSpellLeftAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, 1);
        }
        else {
            this.castSpellRightAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, 1);
        }
    }


    standStill(ctx) {
        if (facingDirection === 1) {
            this.idleAnimationDown.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, 1);
        } else if (facingDirection === 2) {
            this.idleAnimationDownward.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, 1);
        } else if (facingDirection === 3) {
            this.idleAnimationLeft.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, 1);
        } else {
            this.idleAnimationRight.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, 1);
        }
    }

    swingSword(ctx) {
        if (facingDirection === 1) {
            this.swingBox.y = this.y - 35;
            this.swingBox.x = this.x + 15;
            this.swingBox.width = 35;
            this.swingBox.height = 35;
            this.swingForwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, 1);
        }
        else if (facingDirection === 2) {
            this.swingBox.y = this.y + 50;
            this.swingBox.x = this.x + 15;
            this.swingBox.width = 35;
            this.swingBox.height = 35;
            this.swingDownwardAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, 1);
        }
        else if (facingDirection === 3) {
            this.swingBox.x = this.x - 16;
            this.swingBox.y = this.y + 10;
            this.swingBox.height = 35;
            this.swingBox.width = 35;
            this.swingLeftAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, 1);
        }
        else {
            this.swingBox.x = this.x + 40;
            this.swingBox.height = 35;
            this.swingBox.y = this.y + 10;
            this.swingBox.width = 35;
            this.swingRightAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, 1);
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
                        this.spellCombo = "";
                        this.casting = false;
                        castSuccessful = false;
                        break;
                    } else if (this.spellCombo === this.currentSpell) {
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


    /**
     * This function will look at the player's collision bounds to see if it ever
     * reaches the edge of the map. If so, then the player doesn't move. This will
     * save collision checking with all of the edge tiles.
     *
     * @author Connor Lundberg
     */
    collidedWithMapBounds() {
        let left = this.collisionBounds.x - this.collisionBounds.radius;
    }


    /**
     * This function checks if the player has collided with any objects, if so, then return
     * true on the first occurence.
     *
     * @returns {boolean}
     * @author Connor Lundberg
     */
    hasCollided() {
        let collided = null;
        for (let i = 0; i < this.game.entities.length; i++) {
            let currEntity = this.game.entities[i];

            if (currEntity.collisionBounds !== null && this !== currEntity) {
                let collisionInfo = Entity.intersects(this, currEntity);
                if (collisionInfo.collision) {
                    collided = true;
                    this.offsetPlayerPosition(currEntity);
                    currEntity.colliderBoxColor = "green";
                    break;
                } else if (currEntity.colliderColor === "green") {
                    currEntity.colliderBoxColor = "red";
                }
            }
        }

        return collided;
    }


    /**
     * Changes the player's position so their collision box isn't inside of the collided object.
     * If weird bouncing or incorrect collision box positioning starts to happen, this is probably
     * the cause.
     *
     * @param currEntity
     * @author Connor Lundberg
     */
    offsetPlayerPosition(currEntity) {
        switch (facingDirection) {
            case 1:
                this.collisionBounds.y = currEntity.collisionBounds.y + currEntity.collisionBounds.height;
                this.y = currEntity.collisionBounds.y + currEntity.collisionBounds.height;
                this.darkness.update();
                break;
            case 2:
                this.collisionBounds.y = currEntity.collisionBounds.y - this.collisionBounds.height - 4;
                this.y = currEntity.collisionBounds.y - this.collisionBounds.height - 4;
                this.darkness.update();
                break;
            case 3:
                this.collisionBounds.x = currEntity.collisionBounds.x + currEntity.collisionBounds.width;
                this.x = currEntity.collisionBounds.x + currEntity.collisionBounds.width;
                this.darkness.update();
                break;
            case 4:
                this.collisionBounds.x = currEntity.collisionBounds.x - this.collisionBounds.width - 18;
                this.x = currEntity.collisionBounds.x - this.collisionBounds.width - 18;
                this.darkness.update();
                break;
        }
    }




}
