/**
 * Contains logic to sit in one spot, then aggro on a player if they are in range.
 * @author Myles Haynes
 */
class Enemy {

    constructor(gameEngine, player, x, y, speed, range) {
        this.game = gameEngine;
        this.player = player;
        this.x = x || 200;
        this.y = y || 200;
        this.unroundedX = this.x;
        this.unroundedY = this.y;
        this.speed = speed || 0.75;
        this.range = range || 100;

        //Speed at which character moves with map
        this.mapSpeedX = 1;
        this.mapSpeedY = 1;
    }

    /**
     * Is the player in range?
     * @returns {boolean}
     */
    isPlayerInRange() {
        return areEntitiesInRange({x: this.x, y: this.y}, this.player, this.range);
    };

    // noinspection JSUnusedGlobalSymbols
    update() {

        if(this.isPlayerInRange()) {
            let xDir = this.player.x - this.x;
            this.unroundedX += (xDir < 0) ? -this.speed : this.speed;
            this.x = this.unroundedX;

            let yDir = this.player.y - this.y;
            this.unroundedY += (yDir < 0) ? -this.speed : this.speed;
            this.y = this.unroundedY;
        }

        //Controls the map movement on/off screen
        if(this.player.offRight) {
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

    };

    draw(ctx) {
        ctx.fillStyle = (this.isPlayerInRange()) ? 'red' : 'green';
        ctx.fillRect(this.x, this.y, 50, 50);
    };
}
