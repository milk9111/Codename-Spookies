
class ImageMenu extends Menu {

    constructor (game, x, y, width, height, imagePath) {
        super (game, x, y, width, height);

        this.game = game;
        this.image = ASSET_MANAGER.getAsset(imagePath);
    }

    update () {
        super.update();
    }

    draw (ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        Entity.prototype.draw.call(this);
    }

    addElementsToEntities () {
        console.log("in here");
        for (let i = 0; i < this.elements.length; i++) {
            console.log("adding element");
            this.game.addEntity(this.elements[i]);
        }
    }
}