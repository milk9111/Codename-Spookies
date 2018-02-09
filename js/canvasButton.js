
class CanvasButton extends UIElement {

    constructor (game, x, y, width, height) {
        super(game, x, y, false, width, height, 0, 0, "CanvasButton");

        this.game = game;
        this.label = new Label(game, 0, 0, "Button");
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
        ctx.restore();

        Entity.prototype.draw.call(this);
    }

    addLabelToEntities () {
        this.game.addEntity(this.label);
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

    set setLabel (label) {
        this.label = label;
    }

    set removal (remove) {
        this.removeFromWorld = true;
        this.label.removal = true;
    }
}