

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

    constructor(game, animation, direction, startX, startY, player, parent, damage) {

        console.log("making new projectile");

        super(game, startX, startY, true, 24, 24, 20, 20, "Projectile"); //(0, 400) signify where the sprite will be drawn.

        this.game = game;
        this.smackDistance = 15;
        this.smackSpeed = 3;

        if (damage) {
            this.damage = damage;
        } else {
            this.damage = 50;
        }

        this.shootAnimation = animation;

        this.facingDirection = direction;

        this.player = player;

        this.parent = parent;

        this.maxAnimationLoopsBeforeRemoval = 100;

        //Speed at which character moves with map
        this.mapSpeedX = 2;
        this.mapSpeedY = 2;

        this.projectileSpeed = 2;
    }


    /**
     * Here the Projectile will move forward in the direction it was shot from
     *
     * @author Connor Lundberg
     */
    update() {

        let collided = false;
        if(!this.collisionBounds) {
            console.log("Missing bounds");
        }
        //If we've hit a wall or another projectile, delete our self.
        if (this.hasCollided(this, this.game.walls)) {
            collided = true;
        }

        //If we're from the player, try to hit enemies
        if(this.parent instanceof Player) {
            let enCollisions = this.getCollisions(this, this.game.enemies);
            for(let i = 0; i < enCollisions.length; i++) {
                let entity = enCollisions[i];
                entity.smack(this.damage, this.smackDistance, this.facingDirection, this.smackSpeed);
                collided = true;
            }
        }
        //If we're from an enemy (or just not a player) try to hit the player
        else {
            if(this.hasCollided(this, [this.player])) {
                this.player.smack(this.damage, this.smackDistance, this.facingDirection, this.smackSpeed);
                collided = true;
            }
        }

        if(collided) {
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
