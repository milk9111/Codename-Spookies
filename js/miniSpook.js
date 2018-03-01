
class MiniSpook extends SpookieBoi {
    constructor (game, player, x, y) {
        super (game, player, x, y, 3);

        this.game = game;

        this.scale = 0.25;
        this.width = 64;
        this.height = 64;
        this.boundsXOffset = 0;
        this.boundsYOffset = 0;
        let boundsX = this.x + this.boundsXOffset;
        let boundsY = this.y + this.boundsYOffset;
        this.collisionBounds = {width: this.width, height: this.height, x: boundsX, y: boundsY};
    }


    update () {
        if (this.dead && (this.deathAnimationDown.isDone() || this.deathAnimationUp.isDone())) {
            this.removeFromWorld = true;
            return;
        }

        //If not dead the enemy can move or change state as needed
        if(!this.dead && !this.frozen) {
            let lastX = this.x + this.boundsXOffset;
            let lastY = this.y + this.boundsYOffset;
            let xDir = 0;

            let yDir = 0;

            //Check if aggroed on the player.
            if (this.isPlayerInMeleeRange() && !this.isSmacked) {

                // not close enough to attack.
                if (!this.reloading && !Math.intersects({collisionBounds: {width: this.collisionBounds.width, height: this.collisionBounds.height, x: this.x + this.boundsXOffset, y: this.y + this.boundsYOffset}}, this.player)
                    && Math.getDistance(this.player.x + 32, this.player.y + 32, (this.x + this.boundsXOffset) + (this.width / 2), (this.y + this.boundsYOffset) + (this.height / 2)) > this.stoppingDistance) {
                    //prevent melee enemies from moving too early after attacking
                    if(this.cooldownCounter >= this.attackCooldown) {
                        this.moveToPlayer(lastX, lastY);
                    } else {
                        this.cooldownCounter++;
                    }
                } else {
                    this.targetAndMelee(lastX, lastY);
                }
            } else {
                this.standingStill = true;
                this.attacking = false;
                this.setFacingDirection(xDir, yDir);
            }
        }

        //Get distance from Enemy to player
        let distance = Math.getDistance(this.player.x, this.player.y, (this.x + this.boundsXOffset) + (this.width / 2), (this.y + this.boundsYOffset) + (this.height / 2));
        //If close to player then draw, else don't draw
        this.isDraw = distance < drawDistance;

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

        Entity.prototype.update.call(this);
    }

    draw (ctx) {
        if (this.isDraw) {
            if (this.dead) {
                this.death(ctx);
            } else if (this.attacking) {
                this.attack(ctx);
            } else if (this.standingStill) {
                this.standStill(ctx);
            } else {
                this.walking(ctx);
            }

            if (this.frozen) {
                Entity.bluealizeImage(ctx, this.x + (this.width / 2), this.y, this.width, this.height);
            }
        }
    }
}