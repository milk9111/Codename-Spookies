
class PauseMenu extends UIElement {

    constructor (game, x, y, width, height, xOffset, yOffset) {
        super (game, x, y, true, width, height, 0, 0, "PauseMenu");

        this.game = game;
        this.buttons = [];
        this.text = "Paused";

        this.xOffset = xOffset;
        this.yOffset = yOffset;
    }

    update () {
        super.update();
    }

    draw (ctx) {
        ctx.save();
        ctx.fillStyle = this.defaultColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = this.textColor;
        ctx.font = this.textFont;
        ctx.textAlign = this.textAlign;
        ctx.fillText(this.text, this.x + this.xOffset, this.y + this.yOffset);

        ctx.restore();
        Entity.prototype.draw.call(this);
    }


    addButton (button) {
        if (button !== null || button !== undefined) {
            this.buttons.add(button);
        } else {
            console.log("addButton failed! Your button is " + button);
        }

    }


}