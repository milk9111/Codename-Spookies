

class TileMap {

  //Constructor
  constructor () {
    this.width;
    this.height;
    this.map2D;
  }

  //load and create the map
  loadMap (fileName, spriteW, spriteH, game, player, ctx) {



    let data =
  "0000000000\n" +
+ "0000000000\n"
+ "0000110000\n"
+ "0000110000\n"
+ "0000000000\n"
+ "0000000000\n"
+ "0000000000\n";

let txt = data.split("\n");

this.height = txt.length;
this.width = txt[0].length;
this.map2D = create2DArray(this.width - 1, this.height);

  for (let i = 0; i < this.height; i++) {
    for (let j = 0; j < this.width - 1; j++) {

      let tempTile = new Tile(spriteW * i, spriteH * j, txt[i][j], game, player);
      game.addEntity(tempTile);
      this.map2D[i][j] = tempTile;
    }
  }

  //Display map
  // console.log(this.map2D);
  // for (let i = 0; i < this.map2D.length; i++) {
  //   for (let j = 0; j < this.map2D[i].length; j++) {
  //
  //     console.log(this.map2D[i][j].x + " " + this.map2D[i][j].y);
  //   }
  // }

    // $.get(fileName, function(data) {
    //   let txt = data.split("\n");
    //
    //   //set height and width
    //   this.height = txt.length;
    //   this.width = txt[0].length;
    //
    //   this.map2D = create2DArray(this.width - 1, this.height);
    //
    //   for (let i = 0; i < this.height; i++) {
    //     for (let j = 0; j < this.width - 1; j++) {
    //
    //       let tempTile = new Tile(spriteW * i, spriteH * j, txt[i][j], game, player);
    //       game.addEntity(tempTile);
    //       this.map2D[i][j] = tempTile;
    //     }
    //   }
    //
    //   Display map
    //   console.log(this.map2D);
    //   for (let i = 0; i < this.map2D.length; i++) {
    //     for (let j = 0; j < this.map2D[i].length; j++) {
    //
    //       console.log(this.map2D[i][j].x + " " + this.map2D[i][j].y);
    //     }
    //   }
    // });

  }

  update() {

  }

  draw() {

  }

  getMap() {
    console.log("test");
    return this.map2D;
  }
}

function create2DArray (height, width) {
  let temp = [width];

  for (let i = 0; i < width; i++) {
    temp[i] = new Array(height);
  }

  return temp;
}
