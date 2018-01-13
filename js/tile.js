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
    setImage(this.type);
    this.image.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
  }

}

function setImage(theType) {

    if (theType == 0) {
      this.image = new Animation(ASSET_MANAGER.getAsset("../img/sprites.png"),0 , 96, 32, 32, 1, 1, true, false);
    } else if(theType == 1) {
      this.image = new Animation(ASSET_MANAGER.getAsset("../img/sprites.png"),0 , 192, 32, 32, 1, 1, true, false);
    }
  }
