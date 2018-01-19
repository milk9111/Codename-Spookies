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
    this.keys = [];
    this.codes = ["KeyQ", "KeyE", "KeyW", "KeyA", "KeyS", "KeyD", "Space"];
    this.initKeys();
    this.w = null;
    this.s = null;
    this.a = null;
    this.d = null;
    this.q = null;
    this.e = null;
    this.space = null;
    this.click = null;
}


GameEngine.prototype.initKeys = function () {
    this.keys["KeyQ"] = {code: "KeyQ", pressed: false};
    this.keys["KeyE"] = {code: "KeyE", pressed: false};
    this.keys["KeyW"] = {code: "KeyW", pressed: false};
    this.keys["KeyA"] = {code: "KeyA", pressed: false};
    this.keys["KeyS"] = {code: "KeyS", pressed: false};
    this.keys["KeyD"] = {code: "KeyD", pressed: false};
    this.keys["Space"] = {code: "Space", pressed: false};
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

    var coreMovementButtonDown = function (e) {

        that.keys[e.code].pressed = true;

        if (e.code === 'KeyQ' && !that.cast) {
            that.cast = true;
            that.ctx.canvas.removeEventListener("keydown", coreMovementButtonDown, false);
            that.ctx.canvas.removeEventListener("keyup", coreMovementButtonUp, false);
            that.readCombo(that.ctx)
        } else if (e.code === 'KeyQ' && that.cast) {
            that.cast = false;
        }

        /*if (e.code === 'KeyQ' && !that.cast) { //cast spell
            that.cast = true;
            that.ctx.canvas.removeEventListener("keydown", coreMovementButtonDown, false);
            that.readCombo(that.ctx)
        } else if (e.code === 'KeyQ' && that.cast) {
            that.cast = false;
        }
        if (e.code === 'KeyD') { //move right
            that.d = true;
            moving = true;
        }
        if (e.code === 'KeyA') { //move left
            that.a = true;
            moving = true;
        }
        if (e.code === 'KeyW') { //move forward
            that.w = true;
            moving = true;
        }
        if (e.code === 'KeyS') { //move downward
            that.s = true;
            moving = true;
        }
        if (e.code === 'KeyE') { //raise shield
            that.e = true;
            moving = false;
        }
        if (e.code === 'Space') { //shoot crossbow
            that.space = true;
            moving = false;
        }*/

        e.preventDefault();

    };

    //movements
    this.ctx.canvas.addEventListener("keydown", coreMovementButtonDown, false);

    let coreMovementButtonUp = function (e) {

        that.keys[e.code].pressed = false;

        /*if (e.code === 'KeyQ' && !that.cast) { //cast spell
            that.q = true;
            that.ctx.canvas.removeEventListener("keydown", coreMovementButtonDown, false);
            that.readCombo(that.ctx)
        } else if (e.code === 'KeyQ' && that.cast) {
            that.q = false;
        }
        if (e.code === 'KeyD') { //move right
            that.d = false;
            moving = false;
        }
        if (e.code === 'KeyA') { //move left
            that.a = false;
            moving = false;
        }
        if (e.code === 'KeyW') { //move forward
            that.w = false;
            moving = false;
        }
        if (e.code === 'KeyS') { //move downward
            that.s = false;
            moving = false;
        }
        if (e.code === 'KeyE') { //raise shield
            that.e = false;
            moving = false;
        }
        if (e.code === 'Space') { //shoot crossbow
            that.space = true;
            moving = false;
        }*/

        e.preventDefault();

    }

    this.ctx.canvas.addEventListener("keyup", coreMovementButtonUp, false);


    //swing sword
    this.ctx.canvas.addEventListener("click", function(e) {
        that.click = true;
        e.preventDefault();
    });


    this.ctx.canvas.addEventListener("contextmenu", function(e) {
        e.preventDefault();
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
        let failed = true;
        if (currentSpell.charAt(currPos) === String.fromCharCode(e.keyCode)) {
            currPos++;
            failed = false;
        }

        if (failed) {
            console.log("Cast failed! Did not read the combo " + currentSpell);
            that.cast = false;
            ctx.canvas.removeEventListener("keydown", getComboInput, true);
            that.startInput();
            return;
        }

        if (currPos >= currentSpell.length) {
            castSuccessful = true;
            that.cast = false;
            console.log("Cast successful! Read the combo " + currentSpell);
            ctx.canvas.removeEventListener("keydown", getComboInput, true);
            that.startInput();
            return;
        }
        e.preventDefault();
    };

    ctx.canvas.addEventListener("keydown", getComboInput, true);
}


/**
 * This is called whenever a new entity is created in the game world.
 * @param entity
 * @author Seth Ladd
 */
GameEngine.prototype.addEntity = function (entity) {
    console.log('added entity');
    this.entities.push(entity);
    //console.log("entities length after: " + this.entities.length);

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
    let entitiesCount = this.entities.length;
    let removalPositions = [];

    //This moves the entities (via their own update method)
    //console.log(entitiesCount);
    for (let i = 0; i < entitiesCount; i++) {
        let entity = this.entities[i];

        if (entity.removalStatus === true) {
            console.log("found removal status of true");
        }
        if (entity.removalStatus === false) {
            entity.update();
        } else {
            console.log("Going to remove");
            removalPositions.push(i);
        }
    }

    //This removes entities from the game world
    for (let i = removalPositions.length - 1; i >= 0; --i) {
        this.entities.splice(removalPositions[i], 1);
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
/*function Entity(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.removeFromWorld = false;
}


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

Entity.prototype.markForRemoval = function () {
    console.log("Marking for removal");
    this.removeFromWorld = true;
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
}*/

//es6 version of Entity.

class Entity {

    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.removeFromWorld = false;
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

