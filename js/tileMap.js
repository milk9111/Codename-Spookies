class TileMap {

  //Constructor
  constructor () {
    this.width;
    this.height;
  }

  //load and create the map
  loadMap (fileName) {
    $.get(fileName, function(data) {
      let txt = data.split("\n");

      //set height and width
      this.height = txt.length;
      this.width = txt[0].length;
    });

  }

  update() {

  }

  draw() {

  }
}
