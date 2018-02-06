

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

        this.shootAnimation = animation;

        this.facingDirection = direction;

        this.player = player;

        this.parent = parent;

        this.maxAnimationLoopsBeforeRemoval = 5;

        //Speed at which character moves with map
        this.mapSpeedX = 2;
        this.mapSpeedY = 2;
    }


    /**
     * Here the Projectile will move forward in the direction it was shot from
     *
     * @author Connor Lundberg
     */
    update() {
        /*
        if (this.hasCollided() && this.collidedObject.name !== this.parent.name) {
            this.removeFromWorld = true;
            this.shootAnimation.timesFinished = 0;
            return;
        }
        */
        if (this.shootAnimation.timesFinished >= this.maxAnimationLoopsBeforeRemoval) {
            console.log("started Killing process");
            this.removeFromWorld = true;
            this.shootAnimation.timesFinished = 0;
        }


        let totalDistance = 2;
        let distance = 0;

        switch (this.facingDirection) {
            case 1: //forward
                distance = totalDistance;
                this.y = this.y - distance;
                break;
            case 2: //downward
                distance = totalDistance;
                this.y = this.y + distance;
                break;
            case 3: //left
                distance = totalDistance;
                this.x = this.x - distance;
                break;
            case 4: //right
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
            this.unroundedX -= this.mapSpeedX;
        } else if (this.player.offLeft) {
            this.x += this.mapSpeedX;
            this.unroundedX += this.mapSpeedX;
        } else if (this.player.offTop) {
            this.y += this.mapSpeedY;
            this.unroundedY += this.mapSpeedY;
        } else if (this.player.offBottom) {
            this.y -= this.mapSpeedY;
            this.unroundedY -= this.mapSpeedY;
        }

        super.update();


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

}


