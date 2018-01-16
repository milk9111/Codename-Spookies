/**
* Constructor for the plague doctor enemy.
* @author James Roberts
*/
class PlagueDoctor extends Enemy {
  constructor(gameEngine, player, x, y, speed, range) {
    super( gameEngine, player, x, y, speed, range);
    //Enemy.call(this,);
    this.idleAnimationForward = new Animation(ASSET_MANAGER.getAsset("../img/EnemyDownward.png"), 0, 0, 64, 64, 0.3, 3, true, false);
    this.facingDirection = 1;
  };

  /**
  *
  *@author James Roberts
  */
  update() {
    super.update();
  };

  draw(ctx) {
    if(this.facingDirection === 1) {
      this.standStill();
    } else {
      super.draw();
    }
  };

  standStill(ctx) {
    this.idleAnimationForward.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);
  }
}
