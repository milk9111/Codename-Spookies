class Exit extends Entity {

  /** Constructor for a Exit object, will make the player exit the game
   *@param {int} x X coordinate
   *@param {int} y Y coordinate
   *@param {Player} player Player Refrence
   *@param {Game} game Game refrence
   */
  constructor(x, y, player, game, background) {
    super(game, x, y, true, 32, 32, 0, 0, "exit");
    this.player = player;
    this.isDraw = false;
    this.speedX = 2;
    this.speedY = 2;
    this.background = background;

    //Animation for portal
    this.exitAnimation = new Animation(ASSET_MANAGER.getAsset("../img/sprites.png"), 864, 448, 32, 32, .2, 3, true, false);
  }

  /** Updates the Exit position, just checks if player is exiting game. **/
  update() {

    //Get distance from tile to player
    let distance = Math.getDistance(this.player.x, this.player.y, this.x, this.y);

    //If close to player then draw, else don't draw
    if (distance < 305) {
      this.isDraw = true;

      //Check collision with player
      if (Math.intersects(this.player, this)) {
        this.player.stopMoving = true; 
        this.startNewLevel(2);
        //TODO: Make it so the level goes to the next level in the game enegie and check for end game stuff
      }

      super.update();
    }

    //Controls the Exit portal movement on/off screen
    if (this.player.offRight) {
      this.x -= this.speedX;
    } else if (this.player.offLeft) {
      this.x += this.speedX;
    } else if (this.player.offTop) {
      this.y += this.speedY;
    } else if (this.player.offBottom) {
      this.y -= this.speedY;
    }



  }

  startNewLevel(levelNum) {
    this.background.start = false;
    this.background.changing = true;
    if (this.background.alpha >= 1) {
      console.log(this.background.alpha);
      this.game.newLevel(levelNum);
    }
  }

  /** Draws the exit on the map */
  draw(ctx) {

    if (this.isDraw) {
      this.exitAnimation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
    }
  }
}
