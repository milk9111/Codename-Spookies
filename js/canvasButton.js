
class CanvasButton extends UIElement {

    constructor (game, x, y, width, height) {
        super(game, x, y, false, width, height, 0, 0, "CanvasButton");

        this.game = game;
    }

    update() {
        this.isHovering = this.mouseIsHovering();
        if (this.mouseClicked()) {
            this.clickAction();
        }
        super.update();
    }

    draw(ctx) {
        ctx.save();
        if (!this.isHovering) {
            ctx.fillStyle = this.defaultColor;
        } else {
            ctx.fillStyle = this.hoverColor;
        }
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = this.textColor;
        ctx.font = this.textFont;
        ctx.textAlign = this.textAlign;
        ctx.fillText(this.text, this.x + this.xOffset, this.y + this.yOffset);
        ctx.restore();

        Entity.prototype.draw.call(this);
    }
}