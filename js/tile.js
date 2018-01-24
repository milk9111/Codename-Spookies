/** Represents a single tile on the map
 * @author Brandon Blaschke
 */
class Tile extends Entity{

  /** Constructor for a Tile object
   *@param {int} x X coordinate
   *@param {int} y Y coordinate
   *@param {int} type Type of tile image
   *@param {Player} player Player Refrence
   *@param {canvas} ctx Refrence to canvas
   */
  constructor(x, y, type, game, player, ctx) {
    super(game, x, y, false, 0, 0);
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.type = type;
    this.game = game;
    this.player = player;
    this.isDraw = false;
    this.barrier = false;

    if (type === 'E' ||
        type === 'F' ||
        type === 'G' ||
        type === 'H') {
          this.barrier = true;
        }

    this.speedX = 2;
    this.speedY = 2;

    //Animation for portal
    this.exitAnimation = new Animation(ASSET_MANAGER.getAsset("../img/sprites.png"), 864, 448, 32, 32, .2, 3, true, false);
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

    //Controls the map movement on/off screen
    if(this.player.offRight) {
      this.x -= this.speedX;
    } else if (this.player.offLeft) {
      this.x += this.speedX;
    } else if (this.player.offTop) {
      this.y += this.speedY;
    } else if (this.player.offBottom) {
      this.y -= this.speedY;
    }
  }

/** Draws the Tile on the canvas
 * @param {canvas} ctx Canvas Reference
 */
draw(ctx) {
    //(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

    if (this.isDraw) {
      //Select type of sprite to show
      //Sprites key is in spritesKey.txt
      switch (this.type) {
        case '0':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 19, 32 * 9, 32, 32, this.x, this.y, 32, 32);
          break;
        case '1':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 20, 32 * 9, 32, 32, this.x, this.y, 32, 32);
          break;
        case '2':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 21, 32 * 9, 32, 32, this.x, this.y, 32, 32);
          break;
        case '3':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 22, 32 * 9, 32, 32, this.x, this.y, 32, 32);
          break;
        case '4':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 25, 32 * 10, 32, 32, this.x, this.y, 32, 32);
          break;
        case '5':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 26, 32 * 10, 32, 32, this.x, this.y, 32, 32);
          break;
        case '6':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 27, 32 * 10, 32, 32, this.x, this.y, 32, 32);
          break;
        case '7':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 28, 32 * 10, 32, 32, this.x, this.y, 32, 32);
          break;
        case '8':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 29, 32 * 10, 32, 32, this.x, this.y, 32, 32);
          break;
        case '9':
          //IDK
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 26, 32 * 10, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'A':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 9, 32 * 10, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'B':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 10, 32 * 10, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'C':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 11, 32 * 10, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'D':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 12, 32 * 10, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'E':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 23, 32 * 9, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'F':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 24, 32 * 9, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'G':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 25, 32 * 9, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'H':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 26, 32 * 9, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'I':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 12, 32 * 1, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'J':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 13, 32 * 1, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'K':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 14, 32 * 1, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'L':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 15, 32 * 1, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'M':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 16, 32 * 1, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'N':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 17, 32 * 1, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'O':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 18, 32 * 1, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'P':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 19, 32 * 1, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'Q':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 25, 32 * 4, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'R':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 26, 32 * 4, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'S':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 27, 32 * 4, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'T':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 28, 32 * 4, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'U':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 29, 32 * 4, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'Z':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 20, 32 * 28, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'a':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 21, 32 * 28, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'b':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 22, 32 * 28, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'c':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 23, 32 * 28, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'd':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 24, 32 * 28, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'e':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 40, 32 * 29, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'f':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 3, 32 * 7, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'g':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 4, 32 * 7, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'h':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 5, 32 * 7, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'i':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 6, 32 * 7, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'j':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 7, 32 * 7, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'k':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 27, 32 * 27, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'l':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 28, 32 * 27, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'm':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 29, 32 * 27, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'n':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 49, 32 * 10, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'o':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 50, 32 * 10, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'p':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 51, 32 * 10, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'q':
          ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 52, 32 * 10, 32, 32, this.x, this.y, 32, 32);
          break;
        case 'r':
          this.exitAnimation.drawFrame(this.game, this.game.clockTick, this.ctx, this.x, this.y);
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
