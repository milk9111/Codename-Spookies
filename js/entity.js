/**
 * The constructor for the Entity object. It is the parent of all
 * objects that will be created in the game. It holds the current instance
 * of the GameEngine, the x & y position of the entity, and if it is going to
 * be removed from the world or not.
 *
 * @param game
 * @param x
 * @param y
 * @constructor
 *
 * @author Seth Ladd
 */
//es6 version of Entity.
class Entity {

    constructor(game, x, y, hasCollision, frameWidth, frameHeight) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.removeFromWorld = false;
        this.collisionBounds = null;
        if (hasCollision) {
            let collisionX = this.x - (frameWidth / 2);
            let collisionY = this.y - (frameHeight / 2);
            let radius = ((frameWidth / 2) - (frameHeight / 2)) - collisionX;
            this.collisionBounds = {radius: radius, x: collisionX, y: collisionY};
        }
    }


    update () {

    }


    draw (ctx) {
        if (this.game.showOutlines && this.radius) {
            this.game.ctx.beginPath();
            this.game.ctx.strokeStyle = "red";
            this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            this.game.ctx.stroke();
            this.game.ctx.closePath();
        }
    }


    set removal  (remove) {
        console.log("Marking for removal");
        this.removeFromWorld = remove;
    }

    get removalStatus () {
        return this.removeFromWorld;
    }


    rotateAndCache  (image, angle) {
        var offscreenCanvas = document.createElement('canvas');
        var size = Math.max(image.width, image.height);
        offscreenCanvas.width = size;
        offscreenCanvas.height = size;
        var offscreenCtx = offscreenCanvas.getContext('2d');
        offscreenCtx.save();
        offscreenCtx.translate(size / 2, size / 2);
        offscreenCtx.rotate(angle);
        offscreenCtx.translate(0, 0);
        offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
        offscreenCtx.restore();
        //offscreenCtx.strokeStyle = "red";
        //offscreenCtx.strokeRect(0,0,size,size);
        return offscreenCanvas;
    }
}