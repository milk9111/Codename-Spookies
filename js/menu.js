
class Menu extends UIElement {

    constructor (game, x, y, width, height) {
        super (game, x, y, false, width, height, 0, 0, "Menu");

        this.game = game;
        this.elements = [];
        this.label = new Label(game, this.x + this.xOffset, this.y + this.yOffset, "Menu");
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
        for (let i = 0; i < this.elements.length; i++) {
            this.game.addEntity(this.elements[i]);
            if (this.elements[i] instanceof CanvasButton) {
                this.elements[i].addLabelToEntities();
            }
        }
        this.game.addEntity(this.label);
    }


    addElement (element) {
        if (element !== null || element !== undefined) {
            this.elements.push(element);
        } else {
            console.log("addButton failed! Your button is " + element);
        }

    }


    set removal (remove) {
        this.removeFromWorld = remove;
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].removal = true;
        }
        this.label.removal = true;
    }


}