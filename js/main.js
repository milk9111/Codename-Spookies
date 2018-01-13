
function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}

Animation.prototype.drawFrame = function (game, tick, ctx, x, y, scaleBy) {
    if (!game.stop) {
        //console.log("drawing frame");
        var scaleBy = scaleBy || 1;
        this.elapsedTime += tick;
        if (this.loop) {
            if (this.isDone()) {
                this.elapsedTime = 0;
            }
        } else if (this.isDone()) {
            return;
        }
        //var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();

        var originalFrame = this.currentFrame();
        var index = originalFrame;
        var vindex = 0;
        if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
            index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
            vindex++;
        }
        while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
            index -= Math.floor(this.spriteSheet.width / this.frameWidth);
            vindex++;
        }

        var locX = x;
        var locY = y;
        var offset = vindex === 0 ? this.startX : 0;

        if (!this.reverse) {
            //console.log(index === this.frames - 1);
            if (index === (this.frames - 1) && game.moving) {
                index = originalFrame;
                this.elapsedTime = 0;
                vindex = 0;
            }
            ctx.drawImage(this.spriteSheet,
                          index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
                          this.frameWidth, this.frameHeight,
                          locX, locY,
                          this.frameWidth * scaleBy,
                          this.frameHeight * scaleBy);
        } else {
            if (index === (this.frames - 1) && game.moving) {
                index = originalFrame;
                this.elapsedTime = 0;
                vindex = 0;
            }
            ctx.drawImage(this.spriteSheet,
                index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
                this.frameWidth, this.frameHeight,
                locX, locY,
                this.frameWidth * scaleBy,
                this.frameHeight * scaleBy);

            //For now we can keep this top part here. Once we have actual sprites and animations we should switch to
            //this function below.
            //flipSpriteHorizontally(ctx, this.spriteSheet, locX, locY, index * this.frameWidth + offset,
            //    vindex * this.frameHeight + this.startY, this.frameWidth, this.frameHeight);
        }
    } else {
        //game.stop = false;
    }
}


/*
    Not my function, I took this from StackOverflow.
 */
function flipSpriteHorizontally(ctx, img, x, y, spriteX, spriteY, spriteW, spriteH){
    // move to x + img's width
    // adding img.width is necessary because we're flipping from
    //     the right side of the img so after flipping it's still
    //     at [x,y]
    ctx.translate(x+spriteW,y);

    // scaleX by -1; this "trick" flips horizontally
    ctx.scale(-1,1);

    // draw the img
    // no need for x,y since we've already translated
    ctx.drawImage(img,
                spriteX,spriteY,spriteW,spriteH,0,0,spriteW,spriteH
               );

    // always clean up -- reset transformations to default
    ctx.setTransform(1,0,0,1,0,0);
}


Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

function Background(game) {
    Entity.call(this, game, 0, 400);
    this.radius = 200;
}

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
}

Background.prototype.draw = function (ctx) {
    var tile_background = new Image();
    tile_background.src = "../img/Tileable3f.png";
    tile_background.onload = function(){
        var pattern = ctx.createPattern(tile_background, "repeat");
        ctx.fillStyle = pattern;
        ctx.fill();
        //Entity.prototype.draw.call(this);
    };
}



function Darkness(game) {
    Entity.call(this, game, game.surfaceWidth, game.surfaceHeight);
    //this.game = game;
}

Darkness.prototype = new Entity();
Darkness.prototype.constructor = Darkness;
Darkness.prototype.update = function () {
    this.x = -(this.game.surfaceWidth) + playerStartX + 36;
    this.y = -(this.game.surfaceHeight) + playerStartY + 36;
}
Darkness.prototype.draw = function (ctx) {
    /*ctx.fillStyle = "SaddleBlack";
    ctx.fillRect(0,0,this.game.surfaceWidth,this.game.surfaceHeight);*/
    //console.log(playerStartY + ", " + (-(playerStartY + 32)));
    ctx.drawImage(ASSET_MANAGER.getAsset("../img/light2.png"), this.x, this.y, this.game.surfaceWidth*2, this.game.surfaceHeight*2);
    Entity.prototype.draw.call(this);
}



function LightSource(game) {
    this.game = game;
    this.radius = 0;
}

LightSource.prototype = Entity;
LightSource.prototype.constructor = LightSource;
LightSource.prototype.update = function () {


}

LightSource.prototype.draw = function(ctx) {
    //console.log("in here");

    //ctx.fillStyle = "White";
    //ctx.strokeStyle = "Black";

    // get the image data object
    var image = ctx.getImageData(300, 300, 100, 100);
    // get the image data values
    var imageData = image.data,
        length = imageData.length;
    // set every fourth value to 50
    for(var i=3; i < length; i+=4){
        imageData[i] = 50;
    }
    // after the manipulation, reset the data
    image.data = imageData;
    // and put the imagedata back to the canvas
    ctx.putImageData(image, 0, 0);

    /*ctx.save();
    ctx.beginPath();
    ctx.globalAlpha = "0.75";
    ctx.arc(100,75,50,0,2*Math.PI);

    ctx.fill();

    ctx.stroke();
    ctx.restore();*/

    /*ctx.beginPath();
    ctx.arc(300, 300, 25, 300, 4*Math.PI);
    ctx.opacity = "1.0";
    ctx.fill();
    ctx.stroke();*/

    Entity.prototype.draw.call(this);
}

var darkness;
var playerStartX;
var playerStartY;

//1 = forward, 2 = backward, 3 = left, 4 = right
var facingDirection;



// the "main" code begins here
var ASSET_MANAGER = new AssetManager();
//We will want to switch to this for a dynamic background, for now it is being
//repeated onto the canvas through style.css
//ASSET_MANAGER.queueDownload("../img/Tileable3f.png");
ASSET_MANAGER.queueDownload("../img/Player_Box.png");
ASSET_MANAGER.queueDownload("../img/blackness.png");
ASSET_MANAGER.queueDownload("../img/sprites.png");
ASSET_MANAGER.queueDownload("../img/light2.png");
ASSET_MANAGER.queueDownload("../img/Hooded_Figure_SpriteSheet.png");

/*ASSET_MANAGER.queueDownload("../img/Hooded_Figure_Idle_Forward.png");
ASSET_MANAGER.queueDownload("../img/Hooded_Figure_Idle_Downward.png");
ASSET_MANAGER.queueDownload("../img/Hooded_Figure_Idle_Left.png");
ASSET_MANAGER.queueDownload("../img/Hooded_Figure_Idle_Right.png");
ASSET_MANAGER.queueDownload("../img/Hooded_Figure_Walking_Downward.png");
ASSET_MANAGER.queueDownload("../img/Hooded_Figure_Walking_Forward.png");
ASSET_MANAGER.queueDownload("../img/Hooded_Figure_Walking_Right.png");
ASSET_MANAGER.queueDownload("../img/Hooded_Figure_Walking_Left.png");*/

ASSET_MANAGER.downloadAll(function () {


    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    //LOAD ENTIIES
    //start facing backwards.
    facingDirection = 2;
    var gameEngine = new GameEngine();
    var player = new Player(gameEngine, player);

    //Load tile map

    let tileMap = new TileMap(gameEngine);
    tileMap.loadMap(Map.getTestMap(), 32, 32, gameEngine, player, ctx);

    var bg = new Background(gameEngine);
    darkness = new Darkness(gameEngine);
    //var light = new LightSource(gameEngine);
    var enemy = new Enemy(gameEngine);

    //ADD ENTITES
    gameEngine.addEntity(bg);

    //Add tiles
    for (let i = 0; i < tileMap.map2D.length; i++) {
      for (let j = 0; j < tileMap.map2D[i].length; j++) {

        let temp = new Tile(tileMap.map2D[i][j].x, tileMap.map2D[i][j].y, tileMap.map2D[i][j].type, gameEngine, player, ctx);
        gameEngine.addEntity(temp);
      }
    }

    gameEngine.addEntity(player);
    gameEngine.addEntity(enemy);
    //gameEngine.addEntity(light);
    //gameEngine.addEntity(darkness);

    //START GAME
    gameEngine.init(ctx);
    player.x = (gameEngine.surfaceWidth/2 - 32);
    player.y = (gameEngine.surfaceHeight/2 - 32);
    playerStartX = (gameEngine.surfaceWidth/2 - 32);
    playerStartY = (gameEngine.surfaceHeight/2 - 32);
    console.log(player.x + ", " + player.y);

    let audio = new Audio('../img/hearbeat.mp3');
    audio.loop = true;
    audio.play();

    gameEngine.start();
});
