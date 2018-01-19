

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

    constructor(game, animation, direction, startX, startY) {

        console.log("making new projectile");

        super(game, startX, startY); //(0, 400) signify where the sprite will be drawn.

        this.game = game;

        this.shootAnimation = animation

        this.facingDirection = direction;

        this.isKilling = true;
        this.numOfAnimationLoops = 0;
        this.maxAnimationLoopsBeforeRemoval = 2;
    }


    /**
     * Here the Projectile will move forward in the direction it was shot from
     *
     * @author Connor Lundberg
     */
    update() {
        if (this.shootAnimation.timesFinished >= this.maxAnimationLoopsBeforeRemoval) {
            console.log("started Killing process");
            super.removal = true;
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

        Entity.prototype.update.call(this);

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


