
/** Represents the ObjectMap for the game
* @author Brandon Blaschke
*/
class ObjectMap {

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
  * @param {Player} player Refrence to player Entity
  */
  loadMap(mapName, spriteW, spriteH, player, game, ctx) {

      let txt = mapName.split("\n");

      //Get height and width for map
      this.height = txt.length;
      this.width = txt[0].length;
      this.map2D = create2DArray(this.width - 1, this.height);

      //Craete a Tile object for each element
      for (let i = 0; i < this.height; i++) {
        for (let j = 0; j < this.width; j++) {

          //Char code for the object on map, handle null values
          let charCode;

          if (txt[i][j] != null) {
            charCode = txt[i][j].charCodeAt(0);
          } else {
            charCode = 0;
          }

          //Only add Potion if placed on the mapped, else null
          if (txt[i][j] === 'V' ||
              txt[i][j] === 'X' ||
              txt[i][j] === 'Y') {
            //Potion (x, y, type, player)
            this.map2D[i][j] = new Potion(spriteW * j, spriteH * i, txt[i][j], player, game);
          } else if (txt[i][j] === 'p'){
            this.map2D[i][j] = new PlagueDoctor(game, player, spriteW * j, spriteH * i);
          } else if (txt[i][j] === '9'){
              this.map2D[i][j] = new Screamer(game, player, spriteW * j, spriteH * i);
          } else if (txt[i][j] === 'b'){
              this.map2D[i][j] = new BallOfFlesh(game, player, spriteW * j, spriteH * i, 4, 300);
          } else if (txt[i][j] === 'r') {
            this.map2D[i][j] = new Exit(spriteW * j, spriteH * i, player, game);
          } else if (charCode >= 90 && charCode <= 122) {
            this.map2D[i][j] = new Tile(spriteW * j, spriteH * i, txt[i][j], game, player, ctx);
          } else {
            this.map2D[i][j] = null;
          }
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

}
