/**
 * Contains logic to sit in one spot, then aggro on a player if they are in range.
 * @author Myles Haynes
 */
class Enemy extends Entity {

    constructor(gameEngine, player, x, y, speed, range) {
        super(gameEngine, x, y);
        this.game = gameEngine;
        this.player = player;
        this.x = x || 200;
        this.y = y || 200;
        this.unroundedX = this.x;
        this.unroundedY = this.y;
        this.isDraw = false;
        this.speed = speed || 0.5;
        this.range = range || 100;
        this.facingDirection = "down";
        this.standingStill = true;
        this.attacking = false;
        //Speed at which character moves with map
        this.mapSpeedX = 2;
        this.mapSpeedY = 2;
    };

    /**
     * Sets the facing direction of the enemy based on the change in it's x and y positions
     * @param xDir lastX-newX
     * @param yDir lastY - newY
     */
    setFacingDirection(xDir, yDir) {
        if (yDir !== 0) {
            if (yDir < 0) {
                this.facingDirection = "down";
            } else {
                this.facingDirection = "up";
            }
        } else if ( xDir != 0) {

            if (xDir > 0) { //Moved to the left
                this.facingDirection = "left";
            } else { //Moved to the right
                this.facingDirection = "right";
            }
        }
    };

    /**
     * Is the player in range?
     * @returns {boolean}
     */
    isPlayerInRange() {
        return areEntitiesInRange({x: this.x, y: this.y}, this.player, this.range);
    };

    /**
     * Determines if the enemy needs to be drawn to the canvas and moves it with the map.
     */
  update() {

    //Get distance from Enemey to player
    let distance = Math.getDistance(this.player.x, this.player.y, this.x, this.y);

    //If close to player then draw, else don't draw
    if (distance < 305) {
      this.isDraw = true;
    } else {
      this.isDraw = false;
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

  };

    draw(ctx) {

      if (this.isDraw) {
        ctx.fillStyle = (this.isPlayerInRange()) ? 'red' : 'green';
        ctx.fillRect(this.x, this.y, 50, 50);
      }
    };
}
