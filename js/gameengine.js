// This game shell was happily copied from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();


function Timer() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}


/**
 * The constructor for the GameEngine object. It holds the context, list of
 * entities that are in the game, and various other bits like the mouse, click,
 * and surface width and height.
 *
 * @constructor
 * @author Seth Ladd
 */
function GameEngine() {
    this.entities = [];
    this.showOutlines = false;
    this.ctx = null;
    this.click = null;
    this.mouse = null;
    this.wheel = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
}


/**
 * This is the initializer for the GameEngine object. It simply takes the
 * context of the game and sets the surface width and height to that of
 * the canvas (which comes from the context. It also starts the user input
 * as well.
 *
 * @param ctx
 * @author Seth Ladd
 */
GameEngine.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.startInput();
    this.timer = new Timer();
    console.log('game initialized');
}


/**
 * Here is the start of the game. That is, it begins the infinite loop that will
 * be the timer for the game which will cause all of the movements, animations,
 * collisions, etc.
 *
 * @author Seth Ladd
 */
GameEngine.prototype.start = function () {
    console.log("starting game");
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}


var moving = false;
var swing = false;
var raise = false;
var shoot = false;

/**
 * This handles all of the user input. It adds key event listeners to the canvas in order
 * to check for what the user is typing. It's here we will need to do aiming with the mouse
 * and combos after pressing Q.
 *
 * @author Connor Lundberg
 */
GameEngine.prototype.startInput = function () {
    console.log('Starting input');
    var that = this;

    var coreMovement = function (e) {
        if (e.code === 'KeyQ' && !that.cast) { //cast spell
            that.cast = true;
            that.ctx.canvas.removeEventListener("keydown", coreMovement, false);
            that.readCombo(that.ctx)
        } else if (e.code === 'KeyQ' && that.cast) {
            that.cast = false;
        } else if (!that.cast && e.code === 'KeyD' && !moving) { //move right
            that.right = true;
            moving = true;
        } else if (!that.cast && e.code === 'KeyA' && !moving) { //move left
            that.left = true;
            moving = true;
        } else if (!that.cast && e.code === 'KeyW' && !moving) { //move forward
            that.forward = true;
            moving = true;
        } else if (!that.cast && e.code === 'KeyS' && !moving) { //move downward
            that.downward = true;
            moving = true;
        } else if (!that.cast && e.code === 'KeyE' && !raise) { //raise shield
            raise = true;
            moving = false;
        } else if (!that.cast && e.code === 'Space' && !shoot) { //shoot crossbow
            shoot = true;
            moving = false;
        }

        if (e !== null) {
            e.preventDefault();
        }
    };

    //movements
    this.ctx.canvas.addEventListener("keydown", coreMovement, false);


    //swing sword
    this.ctx.canvas.addEventListener("click", function(e) {
       if (!that.cast) {
           swing = true;
           moving = false;
       }
    });


    console.log('Input started');
}


GameEngine.prototype.readCombo = function(ctx) {
    let currPos = 0;
    let that = this;
    let currentSpell = "WWAD";
    let firstOpen = true;
    console.log("inside readCombo");

    let getComboInput = function (e) {
        if (!firstOpen) {


            console.log("Read char: " + String.fromCharCode(e.keyCode));

            let failed = true;
            if (currentSpell.charAt(currPos) === String.fromCharCode(e.keyCode)) {
                currPos++;
                failed = false;
            }

            if (failed) {
                console.log("Cast failed! Did not read the combo " + currentSpell);
                //that.castSuccessful = false;
                that.cast = false;
                ctx.canvas.removeEventListener("keyup", getComboInput, true);
                that.startInput();
                return;
            }

            if (currPos >= currentSpell.length) {
                castSuccessful = true;
                that.cast = false;
                console.log("Cast successful! Read the combo " + currentSpell);
                ctx.canvas.removeEventListener("keyup", getComboInput, true);
                that.startInput();
                return;
            }
            e.preventDefault();
        } else {
            console.log("firstOpen");
            firstOpen = false;
        }
    };

    ctx.canvas.addEventListener("keyup", getComboInput, true);
    //ctx.canvas.removeEventListener("keydown", getComboInput, false);
}


/**
 * This is called whenever a new entity is created in the game world.
 * @param entity
 * @author Seth Ladd
 */
GameEngine.prototype.addEntity = function (entity) {
    console.log('added entity');
    this.entities.push(entity);
}


/**
 * Here the GameEngine is going to call draw on every entity in the game in order to paint
 * them on the screen at their current position.
 *
 * @author Seth Ladd
 */
GameEngine.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.save();
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(this.ctx);
    }
    this.ctx.restore();
}


/**
 * Here the GameEngine is going to call update on every entity in the game in order to
 * move them around the screen.
 *
 * @author Seth Ladd
 */
GameEngine.prototype.update = function () {
    var entitiesCount = this.entities.length;

    //This moves the entities (via their own update method)
    for (var i = 0; i < entitiesCount; i++) {
        var entity = this.entities[i];

        if (!entity.removeFromWorld) {
            entity.update();
        }
    }

    //This removes entities from the game world
    for (var i = this.entities.length - 1; i >= 0; --i) {
        if (this.entities[i].removeFromWorld) {
            this.entities.splice(i, 1);
        }
    }
}


/**
 * This is called at the top of every loop for the GameEngine's infinite loop. It handles
 * the clock tick, GameEngine update and draw calls, and reseting all of the player movement
 * variables.
 *
 * @author Seth Ladd
 */
GameEngine.prototype.loop = function () {
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();
    this.space = null;
    this.right = null;
    this.left = null;
    this.forward = null;
    this.downward = null;
    this.swing = null;
    this.raise = null;
   // this.cast = null;
    this.stop = null;
}


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
function Entity(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.removeFromWorld = false;
}

/**
 * The Entity's update function. It is empty because every child Entity will
 * override it with their own update method which is called in the GameEngine's
 * update.
 *
 * @author Seth Ladd
 */
Entity.prototype.update = function () {
}


Entity.prototype.draw = function (ctx) {
    if (this.game.showOutlines && this.radius) {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = "red";
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
}

Entity.prototype.rotateAndCache = function (image, angle) {
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
