/**
* Constructor for the plague doctor enemy.
* @author James Roberts
*/
function PlagueDoctor(gameEngine, player, x, y, speed, range) {
  //Enemy.call(this, gameEngine, player, x, y, speed, range);

  this.idleAnimationForward = new Animation(ASSET_MANAGER.getAsset("../img/EnemyDownward.png"), 0, 0, 64, 64, 0.3, 3, true, false);
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
  Entity.call(this, gameEngine, this.x, this.y);
}
PlagueDoctor.prototype = new Entity;
PlagueDoctor.prototype.constructor = PlagueDoctor;

/**
*
*@author James Roberts
*/
PlagueDoctor.prototype.update = function() {

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

  //Entity.prototype.update.call(this);
};

PlagueDoctor.prototype.draw = function(ctx) {
  //ctx.fillStyle = (this.isPlayerInRange()) ? 'red' : 'green';
  //ctx.fillRect(this.x, this.y, 50, 50);
  this.standStill(ctx);
  Entity.prototype.draw.call(this);
};

PlagueDoctor.prototype.standStill = function(ctx) {
  this.idleAnimationForward.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y);

}
