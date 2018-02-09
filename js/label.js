
class Label extends UIElement {

    constructor (game, x, y, text) {
        super(game, x, y, false, 0, 0, 0, 0, "Label");

        this.game = game;
        this.text = text;
        this.defaultColor = "#FFFFFF";
    }

    update () {
        super.update();
    }

    draw (ctx) {

        ctx.save();
        ctx.fillStyle = this.defaultColor;
        ctx.font = this.textFont;
        ctx.textAlign = this.textAlign;
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();

        Entity.prototype.draw.call(this);
    }
}