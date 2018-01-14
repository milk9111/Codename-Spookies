
/** Represents the TileMap for the game
* @author Brandon Blaschke
*/
class TileMap {

  //Constructor
  constructor() {
    this.width;
    this.height;
    this.map2D;
  }

  /** Loads the map into a 2D array
  * @param {String} mapName Name of the mapName
  * @param {int} spriteW Width of sprites
  * @param {int} spriteH Height of the sprites
  * @param {Game} game Refrence to game engine
  * @param {Player} player Refrence to player Entity
  * @param {canvas} ctx Refrence to the canvas
  */
  loadMap(mapName, spriteW, spriteH, game, player, ctx) {

    let txt = mapName.split("\n");

    //Get height and width for map
    this.height = txt.length;
    this.width = txt[0].length;
    this.map2D = create2DArray(this.width - 1, this.height);

    //Craete a Tile object for each element
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width - 1; j++) {

        //game.addEntity(tempTile);
        this.map2D[i][j] = new Tile(spriteW * j, spriteH * i, txt[i][j], game, player, ctx);
      }
    }

    //Display map to console
    //console.log(this.map2D);
    // for (let i = 0; i < this.map2D.length; i++) {
    //   for (let j = 0; j < this.map2D[i].length; j++) {
    //
    //     console.log(this.map2D[i][j].x + " " + this.map2D[i][j].y);
    //   }
    }

  /**
  * Updates tileMap
  */
  update() {

  }

  /**
  * Draws tileMap
  */
  draw() {

  }
}

/** Creates a 2D Array
* @param {int} height Height of the map
* @param {int} width Width of the map
* @return {array} A 2d array with the sizes given
*/
function create2DArray(height, width) {
  let temp = [width];

  for (let i = 0; i < width; i++) {
    temp[i] = new Array(height);
  }

  return temp;
}
