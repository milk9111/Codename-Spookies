
class PauseMenu extends UIElement {

    constructor (game, x, y, width, height) {
        super (game, x, y, true, width, height, 0, 0, "PauseMenu");

        this.game = game;
        this.buttons = [];
        this.text = "Paused";

        this.addedElements = false;
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


    addElementsToEntities () {
        for (let i = 0; i < this.buttons.length; i++) {
            this.game.addEntity(this.buttons[i]);
        }
    }


    addButton (button) {
        if (button !== null || button !== undefined) {
            this.buttons.push(button);
        } else {
            console.log("addButton failed! Your button is " + button);
        }

    }


    set removal (remove) {
        this.removeFromWorld = remove;
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].removal = true;
        }
    }


}