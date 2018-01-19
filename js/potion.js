/** Represents a single Potion on the map
 * @author Brandon Blaschke
 */
class Potion {

  /** Constructor for a Potion object
   *@param {int} x X coordinate
   *@param {int} y Y coordinate
   *@param {int} type Type of Potion
   *@param {Player} player Player Refrence
   */
  constructor(x, y, type, player) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.player = player;
    this.isDraw = false;
    this.speedX = 1;
    this.speedY = 1;
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

    //Controls the potion movement on/off screen
    if (this.player.offRight) {
      this.x -= this.speedX;
    } else if (this.player.offLeft) {
      this.x += this.speedX;
    } else if (this.player.offTop) {
      this.y += this.speedY;
    } else if (this.player.offBottom) {
      this.y -= this.speedY;
    }

    //TODO: Add intersection of player here

  }

  /** Draws the Potion on the canvas
   * @param {canvas} ctx Canvas Reference
   */
  draw(ctx) {

    if (this.isDraw) {
      switch (this.type) {
        case 'V':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 34, 32 * 23, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'X':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 35, 32 * 23, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'Y':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 36, 32 * 23, 32, 32, this.x, this.y, 32, 32);
          break;
      }
    }
  }
}