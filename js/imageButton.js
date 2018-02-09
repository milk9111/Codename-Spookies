
class ImageButton extends UIElement {

    constructor (game, x, y, width, height, image, imageHover) {
        super(game, x, y, false, width, height, 0, 0, "ImageButton");

        this.image = image;
        this.imageHover = imageHover;
        this.game = game;
    }

    update () {
        this.isHovering = this.mouseIsHovering();
        if (this.mouseClicked()) {
            this.clickAction();
        }
        super.update();
    }

    draw (ctx) {
        if (!this.isHovering) {
            ctx.drawImage(ASSET_MANAGER.getAsset(this.image), this.x, this.y, this.width, this.height);
        } else {
            ctx.drawImage(ASSET_MANAGER.getAsset(this.imageHover), this.x, this.y, this.width, this.height);
        }
        Entity.prototype.draw.call(this);
    }
}