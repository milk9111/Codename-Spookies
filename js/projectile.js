

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
    }


    /**
     * Here the Projectile will move forward in the direction it was shot from
     *
     * @author Connor Lundberg
     */
    update() {
        if (this.isKilling) {
            console.log("started Killing process");
            window.setTimeout(this.kill, 1000);
            this.isKilling = false;
        }

        let totalDistance = 2;
        let travelDistance = 0;
        let distance = 0;

        switch (this.facingDirection) {
            case 1: //forward
                travelDistance = this.shootAnimation.elapsedTime / this.shootAnimation.totalTime;

                if (travelDistance > 0.5)
                    travelDistance = 1 - travelDistance;

                distance = totalDistance * (-4 * (travelDistance * travelDistance - travelDistance));
                this.y = this.y - distance;
                break;
            case 2: //downward
                travelDistance = this.shootAnimation.elapsedTime / this.shootAnimation.totalTime;

                if (travelDistance > 0.5)
                    travelDistance = 1 - travelDistance;

                distance = totalDistance * (-4 * (travelDistance * travelDistance - travelDistance));
                this.y = this.y + distance;
                break;
            case 3: //left
                travelDistance = this.shootAnimation.elapsedTime / this.shootAnimation.totalTime;

                if (travelDistance > 0.5)
                    travelDistance = 1 - travelDistance;

                distance = totalDistance * (-4 * (travelDistance * travelDistance - travelDistance));
                this.x = this.x - distance;
                break;
            case 4: //right
                travelDistance = this.shootAnimation.elapsedTime / this.shootAnimation.totalTime;

                if (travelDistance > 0.5)
                    travelDistance = 1 - travelDistance;

                distance = totalDistance * (-4 * (travelDistance * travelDistance - travelDistance));
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


    kill () {
        console.log("called kill");
        super.removal = true;
        console.log(super.removalStatus);
        //this.isKilling = true;
    }

}


