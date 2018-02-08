

/**
 * This is the 'constructor' for the Projectile object. It holds all of the instance fields
 * for the Projectile like animations and what the current motion/direction they are doing is.
 *
 * @param game The instance of the GameEngine
 * @param animation The animation for the Projectile to use when it is being drawn
 * @constructor
 * @author Connor Lundberg
 */
class Projectile extends Entity {

    constructor(game, animation, direction, startX, startY, player, parent) {

        console.log("making new projectile");

        super(game, startX, startY, true, 24, 24, 20, 20, "Projectile"); //(0, 400) signify where the sprite will be drawn.

        this.game = game;
        this.smackDistance = 15;
        this.smackSpeed = 3;
        this.damage = 10;

        this.shootAnimation = animation;

        this.facingDirection = direction;

        this.player = player;

        this.parent = parent;

        this.maxAnimationLoopsBeforeRemoval = 100;

        //Speed at which character moves with map
        this.mapSpeedX = 2;
        this.mapSpeedY = 2;

        this.projectileSpeed = 1;
    }


    /**
     * Here the Projectile will move forward in the direction it was shot from
     *
     * @author Connor Lundberg
     */
    update() {

        if(!this.collisionBounds) {
            console.log("Missing bounds");
        }
        if (this.hasCollided(this, this.game.walls)) {
            this.collide();
            return;
        }
        if(this.parent !== this.player) {
            if(this.hasCollided(this, [this.player])) {
                this.player.smack(this.smackDistance, this.facingDirection, this.smackSpeed);
            }
        }
        let enCollisions = this.getCollisions(this, this.game.enemies);

        for(let i = 0; i < enCollisions.length; i++) {
            let entity = enCollisions[i];
            if(this.parent !== entity) {
                entity.hit(this.damage);
                entity.smack(this.smackDistance, this.facingDirection, this.smackSpeed);
                this.collide();
            }
        }
        if(this.hasCollided(this, this.game.projectiles)) {
            this.collide();
        }

        if (this.shootAnimation.timesFinished >= this.maxAnimationLoopsBeforeRemoval) {
            this.collide();
        }


        let totalDistance = 2 * this.projectileSpeed;
        let distance = 0;

        switch (this.facingDirection) {
            case "up": //forward
                distance = totalDistance;
                this.y = this.y - distance;
                break;
            case "down": //downward
                distance = totalDistance;
                this.y = this.y + distance;
                break;
            case "left": //left
                distance = totalDistance;
                this.x = this.x - distance;
                break;
            case "right": //right
                distance = totalDistance;
                this.x = this.x + distance;
                break;
            default: //anything else
                alert("Incorrect direction for projectile to move");
                return;
        }

        //Controls the map movement on/off screen
        if (this.player.offRight) {
            this.x -= this.mapSpeedX;
        } else if (this.player.offLeft) {
            this.x += this.mapSpeedX;
        } else if (this.player.offTop) {
            this.y += this.mapSpeedY;
        } else if (this.player.offBottom) {
            this.y -= this.mapSpeedY;
        }

        super.update();

    }

    collide() {
        this.removeFromWorld = true;
        this.shootAnimation.timesFinished = 0;
    }


    /**
     * Here the animation for the projectile will be called.
     *
     * @param ctx The context to draw the image onto.
     * @author Connor Lundberg
     */
    draw(ctx) {
        this.shootAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
        Entity.prototype.draw.call(this);
    }


    set setProjectileSpeed (speed) {
        this.projectileSpeed = speed;
    }

}


