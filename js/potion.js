/** Represents a single Potion on the map
 * @author Brandon Blaschke
 */
class Potion extends Entity {

  /** Constructor for a Potion object
   *@param {int} x X coordinate
   *@param {int} y Y coordinate
   *@param {int} type Type of Potion
   *@param {Player} player Player Refrence
   *@param {Game} game Game refrence
   */
  constructor(x, y, type, player, game) {
    super(game, x, y, true, 32, 32, 0, 0, "potion");
    this.x = x;
    this.y = y;
    this.type = type;
    this.player = player;
    this.isDraw = false;
    this.speedX = 2;
    this.speedY = 2;
    this.boost = 25;
  }

  /** Updates a tile */
  update() {

    //Get distance from tile to player
    let distance = Math.getDistance(this.player.x, this.player.y, this.x, this.y);

    //If close to player then draw, else don't draw
    if (distance < 305) {
      this.isDraw = true;

      //Check if player went over potion, and add health 
      let check = Math.intersects(this, this.player);
      if (check.collision) {

        if (this.player.health < 100) {
          this.player.health += this.boost;
          this.removeFromWorld = true;
        }

      }

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

      Entity.prototype.update.call(this);

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

        Entity.prototype.draw.call(this);
    }
  }
}
