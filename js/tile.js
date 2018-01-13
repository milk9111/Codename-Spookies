class Tile {

  constructor (x, y, type, game, player, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.type = type;
    this.game = game;
    this.player = player;
    this.image;
    this.speedX;
    this.speedY;
    Entity.call(this, game, this.x, this.y);
  }

  update() {

  }

  draw(ctx) {
    //(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
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
