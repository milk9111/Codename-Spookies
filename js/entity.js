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

    constructor(game, x, y, hasCollision, frameWidth, frameHeight, boundsXOffset, boundsYOffset, name) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.boundsXOffset = null;
        this.boundsYOffset = null;
        this.removeFromWorld = false;
        this.collisionBounds = null;
        this.name = name;
        this.colliderColor = "red";

        this.collidedObject = null;

        this.bottomHitATop = null;
        this.topHitABottom = null;
        this.rightHitALeft = null;
        this.leftHitARight = null;

        if (hasCollision) {
            this.boundsXOffset = boundsXOffset;
            this.boundsYOffset = boundsYOffset;

            let boundsX = this.x + this.boundsXOffset;
            let boundsY = this.y + this.boundsYOffset;
            this.collisionBounds = {width: frameWidth, height: frameHeight, x: boundsX, y: boundsY};
        }
        this.lastX = this.x;
        this.lastY = this.y;
    }


    update () {
        //update bounds position
        if (this.collisionBounds !== null) {
            this.collisionBounds.x = this.x + this.boundsXOffset;
            this.collisionBounds.y = this.y + this.boundsYOffset;
        }
        if(this instanceof Player) {
            this.hasCollided();
        }
        this.lastX = this.x;
        this.lastY = this.y;

    }

    set colliderBoxColor (color) {
        this.colliderColor = color;
    }

    draw (ctx) {
        if (this.collisionBounds !== null && this.game.showOutlines) {

            this.game.ctx.save();
            this.game.ctx.beginPath();
            this.game.ctx.strokeStyle = this.colliderColor;
            this.game.ctx.moveTo(this.collisionBounds.x, this.collisionBounds.y);

            this.game.ctx.lineTo(this.collisionBounds.x,
                this.collisionBounds.y + this.collisionBounds.height);

            this.game.ctx.lineTo(this.collisionBounds.x + this.collisionBounds.width,
                this.collisionBounds.y + this.collisionBounds.height);

            this.game.ctx.lineTo(this.collisionBounds.x + this.collisionBounds.width,
                this.collisionBounds.y);

            this.game.ctx.lineTo(this.collisionBounds.x, this.collisionBounds.y);

            this.game.ctx.stroke();
            this.game.ctx.closePath();
            this.game.ctx.restore();

            if (this.swingBox != null) {
              this.game.ctx.strokeStyle="#FF0000";
              this.game.ctx.fillRect(this.swingBox.x,this.swingBox.y,this.swingBox.width,this.swingBox.height);
            }
        }
    }


    /**
     * This function checks if the player has collided with any objects, if so, then return
     * true on the first occurrence.
     *
     * @returns {boolean}
     * @author Connor Lundberg
     */
    hasCollided() {
        let collided = false;
        for (let i = 0; i < this.game.entities.length; i++) {
            let currEntity = this.game.entities[i];

            if (currEntity.collisionBounds !== null && this !== currEntity && this.collisionBounds !== null) {
                collided = Math.intersects(this, currEntity);
                if (collided) {
                    this.collidedObject = currEntity;
                    this.onCollide(currEntity);
                    currEntity.colliderBoxColor = "green";
                    break;
                } else if (currEntity.colliderColor === "green") {
                    currEntity.colliderBoxColor = "red";
                }
            }
        }
        return collided;
    }


    set removal  (remove) {
        //console.log("Marking for removal");
        this.removeFromWorld = remove;
    }

    get removalStatus () {
        return this.removeFromWorld;
    }

    /** Checks if two objects with collision are intersecting, works only
    *with rectangle collision boxes
    *@param {Entity} object1 Object 1 to check
    *@param {Entity} object2 Object 2 to check
    */
    static intersects  (object1, object2) {

      //If one of the objects has no collision then it can't intersect
      if (object1.collisionBounds == null || object2.collisionBounds == null) {
        return false;
      }

      let hasCollided = Math.intersectsAtY(object1, object2) || Math.intersectsAtX(object1, object2);

      /*
        This part is a bit complicated. If their wasn't a collision then we want to set the CURRENT
        collision markers that are true (because as soon as they're false we've collided). We do this
        because we need to know which side was failing before the collision occured (that is, which
        expression was returning true until it returned false). Once that's found, we just compare the
        current collision markers to the ones from the last check and find the first occuring mismatch.
        After that we store those sides for both objects (they are opposites of each other), reset
        the markers, and return a true collision.
       */
      if (!hasCollided) {
          // Entity.setCollisionMarkers(object1, object2, bottomHitATop, topHitABottom, rightHitALeft, leftHitARight);
          return {collision: false};
      } else {
          //console.log(object1.name +" collided with " + object2.name);
          // let collidingSide1 = object1.compareCollisionMarkers(bottomHitATop, topHitABottom, rightHitALeft, leftHitARight);
          // let collidingSide2 = object2.compareCollisionMarkers(bottomHitATop, topHitABottom, rightHitALeft, leftHitARight);
          //object1.resetCollisionMarkers();
          //object2.resetCollisionMarkers(); //try removing these resets if collisions don't work.
          return {collision: true};
      }
    }




    compareCollisionMarkers (bottomHitATop, topHitABottom, rightHitALeft, leftHitARight) {
        if (this.topHitABottom !== topHitABottom) {
            return 1;
        }

        if (this.bottomHitATop !== bottomHitATop) {
            return 2;
        }

        if (this.leftHitARight !== leftHitARight) {
            return 3;
        }

        if (this.rightHitALeft !== rightHitALeft) {
            return 4;
        }
    }

    static setCollisionMarkers(object1, object2, bottomHitATop, topHitABottom, rightHitALeft, leftHitARight) {
        if (bottomHitATop) {
            object1.bottomHitATop = true;
            object2.topHitABottom = true;
        } else {
            object1.bottomHitATop = false;
            object2.topHitABottom = false;
        }

        if (topHitABottom) {
            object1.topHitABottom = true;
            object2.bottomHitATop = true;
        } else {
            object1.topHitABottom = false;
            object2.bottomHitATop = false;
        }

        if (rightHitALeft) {
            object1.rightHitALeft = true;
            object2.leftHitARight = true;
        } else {
            object1.rightHitALeft = false;
            object2.leftHitARight = false;
        }

        if (leftHitARight) {
            object1.leftHitARight = true;
            object2.rightHitALeft = true;
        } else {
            object1.leftHitARight = false;
            object2.rightHitALeft = false;
        }
    }


    resetCollisionMarkers () {
        this.topHitABottom = false;
        this.bottomHitATop = false;
        this.leftHitARight = false;
        this.rightHitALeft = false;
    }


    onCollide(other) {
        if(Math.intersectsAtX(this, other)) {
            this.x = this.lastX;
        }
        if(Math.intersectsAtY(this, other)) {
            this.y = this.lastY;
        }
        if(this instanceof Player) {
            console.log("Collided while map was moving");
            if(this.offRight) this.x -= 2;

        }


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
