/** Represents a single tile on the map
 * @author Brandon Blaschke
 */
class Tile {

  /** Constructor for a Tile object
   *@param {int} x X coordinate
   *@param {int} y Y coordinate
   *@param {int} type Type of tile image
   *@param {Player} player Player Refrence
   *@param {canvas} ctx Refrence to canvas
   */
  constructor(x, y, type, game, player, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.type = type;
    this.game = game;
    this.player = player;
    this.isDraw = false;
    this.image;
    this.speedX;
    this.speedY;
    Entity.call(this, game, this.x, this.y);
  }

  /** Updates a tile */
  update() {

    //Get distance from tile to player
    let distance = Math.getDistance(this.player.x, this.player.y, this.x, this.y);

    //If close to player then draw, else don't draw
    if (distance < 305) {
      this.isDraw = true;
    } else {
      this.isDraw = false;
    }
  }

  /** Draws the Tile on the canvas
   * @param {canvas} ctx Canvas Refrence
   */
  draw(ctx) {
    //(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

    if (this.isDraw) {
      //Select type of sprite to show
      switch (this.type) {
        case 0:
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 19, 32 * 9, 32, 32, this.x, this.y, 32, 32);
          break;
        case 1:
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 20, 32 * 9, 32, 32, this.x, this.y, 32, 32);
          break;
        case 2:
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 21, 32 * 9, 32, 32, this.x, this.y, 32, 32);
          break;
        case 3:
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 25, 32 * 9, 32, 32, this.x, this.y, 32, 32);
          break;
      }

      Entity.prototype.draw.call(this);
    }
  }

}

/**
 * return the distance between two points.
 *
 * @param {number} x1		x position of first point
 * @param {number} y1		y position of first point
 * @param {number} x2		x position of second point
 * @param {number} y2		y position of second point
 * @return {number} 		distance between given points
 */
Math.getDistance = function(x1, y1, x2, y2) {

  var xs = x2 - x1,
    ys = y2 - y1;

  xs *= xs;
  ys *= ys;

  return Math.sqrt(xs + ys);
};
