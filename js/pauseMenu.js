
class PauseMenu extends UIElement {

    constructor (game, x, y, width, height) {
        super (game, x, y, false, width, height, 0, 0, "PauseMenu");

        this.game = game;
        this.buttons = [];
        this.label = new Label(game, this.x + this.xOffset, this.y + this.yOffset, "Paused");
    }

    update () {
        super.update();
    }

    draw (ctx) {
        ctx.save();
        ctx.fillStyle = this.defaultColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = this.borderColor;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.restore();
        Entity.prototype.draw.call(this);
    }

    set setTextXandYOffset (offsets) {
        this.xOffset = offsets['xOffset'];
        this.yOffset = offsets['yOffset'];
        let pos = {
            x: this.x + this.xOffset,
            y: this.y + this.yOffset
        }
        this.label.setXandY = pos;
    }

    addElementsToEntities () {
        for (let i = 0; i < this.buttons.length; i++) {
            this.game.addEntity(this.buttons[i]);
            this.buttons[i].addLabelToEntities();
        }
        this.game.addEntity(this.label);
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
        this.label.removal = true;
    }


}