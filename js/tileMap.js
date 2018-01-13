class TileMap {

  //Constructor
  constructor () {
    this.width;
    this.height;
    this.map2D;
  }

  //load and create the map
  loadMap (fileName) {
    $.get(fileName, function(data) {
      let txt = data.split("\n");

      //set height and width
      this.height = txt.length;
      this.width = txt[0].length;

      this.map2D = create2DArray(this.width, this.height);

      for (let i = 0; i < this.width; i++) {
        for (let j = 0; j < this.height; j++) {
          this.map2D[i][j] = txt[i][j];
        }
      }
      console.log(this.map2D);
    });

  }

  update() {

  }

  draw() {

  }
}

function create2DArray (width, height) {
  let temp = [width];

  for (let i = 0; i < width; i++) {
    temp[i] = new Array(height);
  }

  return temp;
}
