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
    let wallCurrent = Date.now();
    let wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    let gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}

let moving = false;
let swing = false;
let raise = false;
let shoot = false;

/**
 * The constructor for the GameEngine object. It holds the context, list of
 * entities that are in the game, and various other bits like the mouse, click,
 * and surface width and height.
 *
 * @constructor
 * @author Seth Ladd
 */
class GameEngine {

    constructor() {
        this.entities = [];
        this.showOutlines = false;
        this.level = 0;
        this.ctx = null;
        this.click = null;
        this.mouse = null;
        this.wheel = null;
        this.surfaceWidth = null;
        this.surfaceHeight = null;
        this.keys = [];
        this.walls = [];
        this.enemies = [];
        this.uiElements = [];
        this.projectiles = [];
        this.codes = ["KeyQ", "KeyE", "KeyW", "KeyA", "KeyS", "KeyD", "Space", "Escape"];
        this.player = null;
        this.initKeys();
        this.w = null;
        this.s = null;
        this.a = null;
        this.d = null;
        this.q = null;
        this.e = null;
        this.space = null;
        this.click = null;
        this.combo = null;
        this.paused = false;
        this.tempClockTick = 0;
        this.pauseMenu = null;
        this.darkness = null;
    }


    set drawing (showOutlines) {
        this.showOutlines = showOutlines;
    }


    initKeys() {
        this.keys["KeyQ"] = {code: "KeyQ", pressed: false};
        this.keys["KeyE"] = {code: "KeyE", pressed: false};
        this.keys["KeyW"] = {code: "KeyW", pressed: false};
        this.keys["KeyA"] = {code: "KeyA", pressed: false};
        this.keys["KeyS"] = {code: "KeyS", pressed: false};
        this.keys["KeyD"] = {code: "KeyD", pressed: false};
        this.keys["Space"] = {code: "Space", pressed: false};
        this.keys["Escape"] = {code: "Escape", pressed: false};
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
    init (ctx) {
        this.ctx = ctx;
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
        this.keys["Space"].pressed = false;
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
    start () {
        console.log("starting game");
        let that = this;
        (function gameLoop() {
            that.loop();
            requestAnimFrame(gameLoop, that.ctx.canvas);
        })();
    }

    /** This changes the game to the next level.
    @param {int} levelNum Number of the level to load. **/
    newLevel(levelNum) {
      //Remove all the tiles from the previous level
      this.unloadMap();

      this.walls = [];
      this.enemies = [];

      //Load new level
        switch(levelNum) {
            case 1:
                this.level = 1;
                this.loadMap1(this.ctx);
                break;
            case 2:
                this.level = 2;
                this.loadMap2(this.ctx);
                break;
        }

    }


    /**
     * This handles all of the user input. It adds key event listeners to the canvas in order
     * to check for what the user is typing. It's here we will need to do aiming with the mouse
     * and combos after pressing Q.
     *
     * @author Connor Lundberg
     */
    startInput () {
        console.log('Starting input');
        let that = this;

        let getXandY = function (e) {
            let x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
            let y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

            x = Math.floor(x);
            y = Math.floor(y);

            return { x: x, y: y };
        };

        let coreMovementButtonDown = function (e) {
            that.keys[e.code].pressed = true;

            if (e.code === 'KeyQ' && !that.cast && !that.paused) {
                that.cast = true;
                that.ctx.canvas.removeEventListener("keydown", coreMovementButtonDown, false);
                that.ctx.canvas.removeEventListener("keyup", coreMovementButtonUp, false);
                that.readCombo(that.ctx);
            } else if (e.code === 'KeyQ' && that.cast && !that.paused) {
                that.cast = false;
            } else if (e.code === 'Escape') {
                if (that.paused === false && that.level > 0) {
                    that.pauseMenu = that.makePauseMenu();
                    that.addEntity(that.pauseMenu);
                    //that.pauseMenu.addElementsToEntities();
                    that.paused = true;
                    that.tempClockTick = that.clockTick;
                    that.clockTick = 0;
                } else if (that.paused === true && that.level > 0) {
                    if (that.pauseMenu !== null) {
                        that.pauseMenu.removal = true;
                        that.pauseMenu = null;
                        that.paused = false;
                        that.clockTick = that.tempClockTick;
                    }
                }
            }
            e.preventDefault();
        };

        //movements
        this.ctx.canvas.addEventListener("keydown", coreMovementButtonDown, false);

        let coreMovementButtonUp = function (e) {
            that.keys[e.code].pressed = false;
            e.preventDefault();
        };

        this.ctx.canvas.addEventListener("keyup", coreMovementButtonUp, false);


        //swing sword
        this.ctx.canvas.addEventListener("click", function (e) {
            that.click = true;
            e.preventDefault();
        });


        this.ctx.canvas.addEventListener("contextmenu", function (e) {
            e.preventDefault();
        });


        this.ctx.canvas.addEventListener("mousemove", function (e) {
            that.mouse = getXandY(e);
        }, false);


        this.ctx.canvas.addEventListener("click", function (e) {
            that.click = getXandY(e);
        }, false);

        console.log('Input started');
    }


    readCombo (ctx) {
        this.combo = new ComboLabel(this, this.player.x, this.player.y);
        this.addEntity(this.combo);
        let currPos = 0;
        let that = this;
        //let currentSpell = "WWAD";
        let firstOpen = true;

        console.log("inside readCombo");

        let getComboInput = function (e) {
            let failed = true;
            that.player.spellCombo += String.fromCharCode(e.keyCode);
            let closestSpell = that.getClosestSpell(that.player.spellCombo);

            if (closestSpell !== "") {
                that.combo.buildCombo(closestSpell.charAt(currPos));
                console.log("combo: " + that.combo.combo);
                currPos++;
                failed = false;
            }

            if (failed) {
                that.player.spellCombo = "";
                that.combo.buildCombo(String.fromCharCode(e.keyCode));
                console.log("Cast failed! Did not read the combo " + closestSpell);
                that.cast = false;
                that.combo.stateOfCombo = 3;
                ctx.canvas.removeEventListener("keydown", getComboInput, true);
                that.startInput();
                return;
            }

            if (currPos >= closestSpell.length) {
                castSuccessful = true;
                that.cast = false;
                that.combo.stateOfCombo = 2;
                console.log("Cast successful! Read the combo " + closestSpell);
                ctx.canvas.removeEventListener("keydown", getComboInput, true);
                that.startInput();
                return;
            }
            e.preventDefault();
        };

        ctx.canvas.addEventListener("keydown", getComboInput, true);
    }


    getClosestSpell (currCombo) {
        let allSpells = this.player.spellCombos;
        let closestCombo = "";

        for (let i = 0; i < allSpells.length; i++) {
            if (currCombo.length > 0 && allSpells[i].substring(0, currCombo.length) === currCombo) {
                closestCombo = allSpells[i];
                break;
            } else if (currCombo.length <= 0) {
                closestCombo = allSpells[i];
                break;
            }
        }

        return closestCombo;
    }


    makePauseMenu () {
        let pauseMenu = new Menu(this, UIElement.getCenterX(this.surfaceWidth, 250, 0),
            UIElement.getCenterY(this.surfaceHeight, 200, 0), 250, 200);
        let offsets = {
            xOffset: pauseMenu.width / 2,
            yOffset: pauseMenu.height / 6
        };
        pauseMenu.setTextXandYOffset = offsets;
        pauseMenu.label.setTextFont = "30px Metal Mania";
        pauseMenu.setDefaultColor = "#2E2E2E";
        pauseMenu.label.setText = "Paused";

        let x = UIElement.getCenterX(pauseMenu.width, 100, pauseMenu.x);
        let y = UIElement.getCenterY(pauseMenu.height, 50, pauseMenu.y);
        let exitButton = new CanvasButton(this, x, y, 100, 50);
        exitButton.label.setText = "Exit";
        offsets = {
            xOffset: exitButton.width / 2,
            yOffset: exitButton.height / 1.7
        };
        exitButton.setTextXandYOffset = offsets;
        let that = this;
        exitButton.setOnClick = function () {
            that.loadTitleScreen(that.ctx);
            that.pauseMenu.removal = true;
            that.pauseMenu = null;
            that.paused = false;
            that.clockTick = that.tempClockTick;
        };

        pauseMenu.addElement(exitButton);

        x = UIElement.getCenterX(pauseMenu.width, 100, pauseMenu.x);
        y = UIElement.getCenterY(pauseMenu.height, 50, pauseMenu.y) + exitButton.height + 10;
        let helpButton = new CanvasButton(this, x, y, 100, 50);
        helpButton.label.setText = "Help";
        offsets = {
            xOffset: helpButton.width / 2,
            yOffset: helpButton.height / 1.7
        };
        helpButton.setTextXandYOffset = offsets;
        helpButton.setOnClick = function () {
            that.addEntity(that.makeHelpMenu());
        };

        pauseMenu.addElement(helpButton);

        return pauseMenu;
    }

    makeHelpMenu () {
        let helpMenu = new Menu(this, UIElement.getCenterX(this.surfaceWidth, 250, 0),
            UIElement.getCenterY(this.surfaceHeight, 400, 0), 250, 400);

        let offsets = {
            xOffset: helpMenu.width / 2,
            yOffset: helpMenu.height / 6
        };
        helpMenu.setTextXandYOffset = offsets;
        helpMenu.label.setTextFont = "30px Metal Mania";
        helpMenu.setDefaultColor = "#2E2E2E";
        helpMenu.label.setText = "Help";

        offsets = {
            xOffset: helpMenu.width / 2,
            yOffset: helpMenu.height / 5 + 15
        };

        let label1 = new Label(this, helpMenu.x + offsets.xOffset, helpMenu.y + offsets.yOffset + 20, "Space - Sword swing\r\n");
        let label2 = new Label(this, helpMenu.x + offsets.xOffset, helpMenu.y + offsets.yOffset + 40, "W - Forward\r\n");
        let label3 = new Label(this, helpMenu.x + offsets.xOffset, helpMenu.y + offsets.yOffset + 60, "A - Left\r\n");
        let label4 = new Label(this, helpMenu.x + offsets.xOffset, helpMenu.y + offsets.yOffset + 80, "S - Downward\r\n");
        let label5 = new Label(this, helpMenu.x + offsets.xOffset, helpMenu.y + offsets.yOffset + 100, "D - Right\r\n");
        let label6 = new Label(this, helpMenu.x + offsets.xOffset, helpMenu.y + offsets.yOffset + 120, "E - Shield Raise\r\n");
        let label7 = new Label(this, helpMenu.x + offsets.xOffset, helpMenu.y + offsets.yOffset + 140, "Escape - Pause\r\n");
        let label8 = new Label(this, helpMenu.x + offsets.xOffset, helpMenu.y + offsets.yOffset + 160, "Q - Cast spell");

        helpMenu.addElement(label1);
        helpMenu.addElement(label2);
        helpMenu.addElement(label3);
        helpMenu.addElement(label4);
        helpMenu.addElement(label5);
        helpMenu.addElement(label6);
        helpMenu.addElement(label7);
        helpMenu.addElement(label8);

        let x = UIElement.getCenterX(helpMenu.width, 100, helpMenu.x);
        let y = UIElement.getCenterY(helpMenu.height, 50, helpMenu.y) + 100;
        let closeButton = new CanvasButton(this, x, y, 100, 50);
        closeButton.label.setText = "Close";
        offsets = {
            xOffset: closeButton.width / 2,
            yOffset: closeButton.height / 1.7
        };
        closeButton.setTextXandYOffset = offsets;
        closeButton.setOnClick = function () {
            helpMenu.removal = true;
        };

        helpMenu.addElement(closeButton);

        return helpMenu;
    }

    makeDeathMenu () {
        this.paused = true;
        let deathMenu = new Menu(this, UIElement.getCenterX(this.surfaceWidth, 300, 0),
            UIElement.getCenterY(this.surfaceHeight, 400, 0), 300, 400);

        let offsets = {
            xOffset: deathMenu.width / 2,
            yOffset: deathMenu.height / 6
        };
        deathMenu.setTextXandYOffset = offsets;
        deathMenu.label.setTextFont = "30px Metal Mania";
        deathMenu.setDefaultColor = "#2E2E2E";
        deathMenu.label.setText = "You are Dead";

        let x = UIElement.getCenterX(deathMenu.width, 100, deathMenu.x);
        let y = UIElement.getCenterY(deathMenu.height, 50, deathMenu.y);
        let restartButton = new CanvasButton(this, x, y, 100, 50);
        restartButton.label.setText = "Restart";
        offsets = {
            xOffset: restartButton.width / 2,
            yOffset: restartButton.height / 1.7
        };
        let that = this;
        restartButton.setTextXandYOffset = offsets;
        restartButton.setOnClick = function () {
            that.paused = false;
            deathMenu.removal = true;
            that.newLevel(that.level);
        };

        deathMenu.addElement(restartButton);
        return deathMenu;
    }

    /**
     * Swaps the positions of the given entities in the entities list. This
     * is so things will overlap better in game and look prettier.
     *
     * @param entity1
     * @param entity2
     */
    swap (entity1, entity2) {
        let temp = entity1;
        let ent1Pos = entity1.pos;
        let ent2Pos = entity2.pos;

        this.entities[ent1Pos] = entity2;
        this.entities[ent2Pos] = temp;

        this.entities[ent1Pos].pos = ent1Pos;
        this.entities[ent2Pos].pos = ent2Pos;
    }


    /**
     * This is called whenever a new entity is created in the game world.
     * @param entity
     * @author Seth Ladd
     */
    addEntity (entity) {
        this.entities.push(entity);
        entity.pos = this.entities.indexOf(entity);
        if (this.entities[this.entities.length - 3] instanceof Darkness
            && (!(entity instanceof UIElement) || entity.name === "ComboLabel")) { //swap so that darkness and background are always on top
            let temp = this.entities[this.entities.length - 1];
            this.entities[this.entities.length - 1] = this.entities[this.entities.length - 2];
            this.entities[this.entities.length - 2] = this.entities[this.entities.length - 3];
            this.entities[this.entities.length - 3] = temp;

            this.entities[this.entities.length - 1].pos = this.entities.indexOf(this.entities[this.entities.length - 1]);
            this.entities[this.entities.length - 2].pos = this.entities.indexOf(this.entities[this.entities.length - 2]);
            this.entities[this.entities.length - 3].pos = this.entities.indexOf(this.entities[this.entities.length - 3]);
        }

        if(entity.name === 'Tile' && entity.collisionBounds) {
            this.walls.push(entity);
        }
        if(entity instanceof Player) {
            this.player = entity;
        }
        if(entity instanceof Enemy) {
            this.enemies.push(entity);
        }
        if(entity instanceof UIElement) {
            this.uiElements.push(entity);
            if (entity instanceof Menu) {
                entity.addElementsToEntities();
            }
        }
        if(entity instanceof Projectile) {
            this.projectiles.push(entity);
        }
    }


    /**
     * Here the GameEngine is going to call draw on every entity in the game in order to paint
     * them on the screen at their current position.
     *
     * @author Seth Ladd
     */
    draw () {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.save();
        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i] !== null && this.entities[i] !== undefined) {
                this.entities[i].draw(this.ctx);
            } else {
                console.log(this.entities[i]);
            }
        }
        this.ctx.restore();

        if (this.showOutlines) {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.strokeStyle = "black";
            this.ctx.moveTo(0, 0);

            this.ctx.lineTo(this.surfaceWidth, 0);

            this.ctx.lineTo(this.surfaceWidth, this.surfaceHeight);

            this.ctx.lineTo(0, this.surfaceHeight);

            this.ctx.lineTo(0, 0);

            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.restore();
        }
    }


    /**
     * Here the GameEngine is going to call update on every entity in the game in order to
     * move them around the screen.
     *
     * @author Seth Ladd
     */
    update () {
        let entitiesCount = this.entities.length;
        let removalPositions = [];

        //This moves the entities (via their own update method)
        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];

            if (entity.removalStatus === false) {
                entity.update();
            } else {
                removalPositions.push(i);
            }
        }
        this.projectiles = this.projectiles.filter((el) => el.removalStatus === false);
        this.enemies = this.enemies.filter((el) => el.removalStatus === false);

        //This removes entities from the game world
        for (let i = removalPositions.length - 1; i >= 0; --i) {
            this.entities.splice(removalPositions[i], 1);
        }

        if (removalPositions.length > 0) {
            this.updateAllLists(true);
            this.updateEntityPositions();
        }
    }

    updateEntityPositions () {
        for (let i = 0; i < this.entities.length - 1; i++) {
            this.entities[i].pos = i;
        }
    }

    updateUI () {
        let uiCount = this.uiElements.length;
        let removalPositions = [];

        for (let i = uiCount - 1; i >= 0; i--) {
            let entity = this.uiElements[i];

            if (entity.removalStatus === false) {
                entity.update();
            } else {
                removalPositions.push(i);
            }
        }

        for (let i = removalPositions.length - 1; i >= 0; --i) {
            this.uiElements.splice(removalPositions[i], 1);
        }

        if (removalPositions.length > 0) {
            this.updateAllLists(false);
            this.updateEntityPositions();
        }
    }


    updateAllLists (calledFromNormalUpdate) {
        this.updateList (this.walls);
        this.updateList(this.enemies);
        this.updateList(this.uiElements);
        this.updateList(this.projectiles);
        if (!calledFromNormalUpdate) {
            this.updateList(this.entities);
        }
    }

    updateList (list) {
        for (let i = list.length - 1; i >= 0; i--) {
            if (list[i].removalStatus === true || list[i] === null || list[i] === undefined) {
                list.splice(i, 1);
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
    loop () {
        if (!this.paused) {
            this.clockTick = this.timer.tick();
            this.update();
        } else {
            this.updateUI();
        }
        this.draw();
        this.space = null;
        this.right = null;
        this.left = null;

        this.swing = null;
        this.raise = null;
        // this.cast = null;
        this.stop = null;
    }

    unloadMap () {
        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities.splice(this.entities[i], 1);
        }
    }

    /**
     * Loads title screen
     */
    loadTitleScreen (ctx) {
        this.level = 0;
        if (this.ctx === null || this.ctx === undefined) {
            this.ctx = ctx;
        }
        this.unloadMap();
        let titleScreen = new TitleScreen(this, 0, 0, this.surfaceWidth, this.surfaceHeight, "../img/logo.png");
        this.addEntity(titleScreen);
        this.swap(titleScreen, titleScreen.startButton);
    }

    /**
     * Loads map 1.
     */
    loadMap1(ctx) {
        //let canvas = document.getElementById('gameWorld');
        //let ctx = canvas.getContext('2d');

        let player = new Player(this, ctx.canvas.width, ctx.canvas.height);

        //Load tile map
        let tileMap = new TileMap();
        tileMap.loadMap(Map.getTestMap(), 32, 32, this, player, ctx);

        //Load ObejctMap
        let objectMap = new ObjectMap();
        objectMap.loadMap(Map.getTestMapO(), 32, 32, player, ctx);


        let bg = new Background(this);
        darkness = new Darkness(this, player);

        darkness.drawing = document.getElementById('darknessCheck').checked;

        //ADD ENTITIES

        //Add tiles
        for (let i = 0; i < tileMap.map2D.length; i++) {
            for (let j = 0; j < tileMap.map2D[i].length; j++) {

                let temp = new Tile(tileMap.map2D[i][j].x, tileMap.map2D[i][j].y, tileMap.map2D[i][j].type, this, player, ctx);
                this.addEntity(temp);
            }
        }

        //Add Objects to map
        for (let i = 0; i < objectMap.map2D.length; i++) {
            for (let j = 0; j < objectMap.map2D[i].length; j++) {

                //Add Potions
                if (objectMap.map2D[i][j] instanceof Potion) {
                    //Potion (x, y, type, player)
                    let temp = new Potion(objectMap.map2D[i][j].x, objectMap.map2D[i][j].y, objectMap.map2D[i][j].type, player, this);
                    this.addEntity(temp);

                    //Add Tile
                } else if (objectMap.map2D[i][j] instanceof Tile  && objectMap.map2D[i][j].collisionBounds == null) {
                    let temp = new Tile(objectMap.map2D[i][j].x, objectMap.map2D[i][j].y, objectMap.map2D[i][j].type, this, player, ctx);
                    this.addEntity(temp);
                } else if (objectMap.map2D[i][j] instanceof Exit) {

                    let temp = new Exit(objectMap.map2D[i][j].x, objectMap.map2D[i][j].y, player, this, bg);
                    this.addEntity(temp);
                }
            }
        }


        //Add Enemies to map
        for (let i = 0; i < objectMap.map2D.length; i++) {
            for (let j = 0; j < objectMap.map2D[i].length; j++) {

                //Add Plague Doctor
                if (objectMap.map2D[i][j] instanceof PlagueDoctor) {
                    let temp = new PlagueDoctor(this, player, objectMap.map2D[i][j].x, objectMap.map2D[i][j].y);
                    this.addEntity(temp);
                } else if (objectMap.map2D[i][j] instanceof Screamer) {
                    let temp = new Screamer(this, player, objectMap.map2D[i][j].x, objectMap.map2D[i][j].y);
                    this.addEntity(temp);
                }
            }
        }
        this.addEntity(player);
        ASSET_MANAGER.playSound("../snd/wyrm.mp3");
        ASSET_MANAGER.playSound("../snd/heartbeat.mp3");
        ASSET_MANAGER.toggleSound();

        //START GAME
        this.initPlayerPosition(player, ctx);

        player.darkness = darkness;
        this.addEntity(darkness);
        this.addEntity(bg);
    }


    /**Loads map 2. **/
    loadMap2(ctx) {

      let player = new Player(this, ctx.canvas.width, ctx.canvas.height);

      //Load tile map
      let tileMap = new TileMap();
      tileMap.loadMap(Map.getMap2(), 32, 32, this, player, ctx);

      //Load ObejctMap
      let objectMap = new ObjectMap();
      objectMap.loadMap(Map.getMap2O(), 32, 32, player, ctx);


      let bg = new Background(this);
      darkness = new Darkness(this, player);

      darkness.drawing = document.getElementById('darknessCheck').checked;

      //ADD ENTITIES

      //Add tiles
      for (let i = 0; i < tileMap.map2D.length; i++) {
        for (let j = 0; j < tileMap.map2D[i].length; j++) {

          let temp = new Tile(tileMap.map2D[i][j].x, tileMap.map2D[i][j].y, tileMap.map2D[i][j].type, this, player, ctx);
          this.addEntity(temp);
        }
      }

      //Add Objects to map
      for (let i = 0; i < objectMap.map2D.length; i++) {
        for (let j = 0; j < objectMap.map2D[i].length; j++) {

          //Add Potions
          if (objectMap.map2D[i][j] instanceof Potion) {
            //Potion (x, y, type, player)
            let temp = new Potion(objectMap.map2D[i][j].x, objectMap.map2D[i][j].y, objectMap.map2D[i][j].type, player, this);
            this.addEntity(temp);

            //Add Tile
          } else if (objectMap.map2D[i][j] instanceof Tile  && objectMap.map2D[i][j].collisionBounds == null) {
            let temp = new Tile(objectMap.map2D[i][j].x, objectMap.map2D[i][j].y, objectMap.map2D[i][j].type, this, player, ctx);
            this.addEntity(temp);
          } else if (objectMap.map2D[i][j] instanceof Exit) {

            let temp = new Exit(objectMap.map2D[i][j].x, objectMap.map2D[i][j].y, player, this, bg);
            this.addEntity(temp);
          }
        }
      }


      //Add Enemies to map
      for (let i = 0; i < objectMap.map2D.length; i++) {
        for (let j = 0; j < objectMap.map2D[i].length; j++) {

          //Add Plague Doctor
          if (objectMap.map2D[i][j] instanceof PlagueDoctor) {
            let temp = new PlagueDoctor(this, player, objectMap.map2D[i][j].x, objectMap.map2D[i][j].y);
            this.addEntity(temp);
          } else if (objectMap.map2D[i][j] instanceof Screamer) {
              let temp = new Screamer(this, player, objectMap.map2D[i][j].x, objectMap.map2D[i][j].y);
              this.addEntity(temp);
          }
        }
      }
        this.addEntity(player);
      //START GAME
      this.initPlayerPosition(player, ctx);

      player.darkness = darkness;
      this.addEntity(darkness);
      this.addEntity(bg);
    }

    initPlayerPosition(player, ctx) {
        player.x = (ctx.canvas.width / 2 - 32);
        player.y = (ctx.canvas.height / 2 - 32);
        playerStartX = (ctx.canvas.width / 2 - 32);
        playerStartY = (ctx.canvas.height / 2 - 32);
        console.log(player.x + ", " + player.y);
    }
}
