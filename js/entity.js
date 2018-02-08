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

        this.pos = 0;
    }


    update () {
        //update bounds position
        if (this.collisionBounds !== null) {
            this.collisionBounds.x = this.x + this.boundsXOffset;
            this.collisionBounds.y = this.y + this.boundsYOffset;
        }
        if(this.isSmacked && this.smackTime <= this.smackLength) {
            this.smackTime++;
            //We do this to pass by value instead of pass by reference, because we modify bounds we don't want to keep
            let bounds = {
                collisionBounds: {
                    x: this.collisionBounds.x,
                    y: this.collisionBounds.y,
                    height: this.collisionBounds.height,
                    width: this.collisionBounds.width
                }
            };
            let xDiff = 0;
            let yDiff = 0;
            switch(this.smackDirection) {
                case "up":
                    bounds.y -= 1;
                    yDiff = -1;
                    break;
                case "down":
                    bounds.y += 1;
                    yDiff = 1;
                    break;
                case "left":
                    bounds.x -= 1;
                    xDiff = -1;
                    break;
                case "right":
                    bounds.x += 1;
                    xDiff = 1;
                    break;
            }
            if(this.hasCollided(bounds, this.game.walls)) {
                this.isSmacked = false;
                this.smackTime = 0;
                this.smackLength = 0;
            } else {
                this.x += xDiff;
                this.y += yDiff;
            }
        } else {
            this.isSmacked = false;
            this.smackTime = 0;
            this.smackLength = 0;
        }

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



    set removal  (remove) {
        //console.log("Marking for removal");
        this.removeFromWorld = remove;
    }

    get removalStatus () {
        return this.removeFromWorld;
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
    hasCollided(bounds, entityArr) {
        // if (!entityArr) return;
        for (let i = 0; i < entityArr.length; i++) {
            let currEntity = entityArr[i];
            if (currEntity.collisionBounds && this !== currEntity) {
                if (Math.intersects(bounds, currEntity)) {
                    currEntity.colliderBoxColor = "green";
                    return true;
                } else if (currEntity.colliderColor === "green") {
                    currEntity.colliderBoxColor = "red";
                }
            }
        }
        return false;
    }



    getCollisions(bounds, entityArr) {
        let collisions = [];
        for (let i = 0; i < entityArr.length; i++) {
            let currEntity = entityArr[i];
            if (currEntity.collisionBounds !== null && this !== currEntity) {
                if (Math.intersects(bounds, currEntity)) {
                    collisions.push(currEntity);
                }
            }
        }
        return collisions;
    }

    smack(distance, direction, speed) {
        this.isSmacked = true;
        this.smackTime = 0;
        this.smackDirection = direction;
        this.smackLength = distance;
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
