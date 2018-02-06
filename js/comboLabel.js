

class ComboLabel extends Entity {

    constructor (game, x, y) {
        super(game, x, y, false, 0, 0, 0, 0, "ComboLabel");
        this.combo = "";
        this.game = game;
    }

    buildCombo (nextComboInput) {
        this.combo += nextComboInput;
    }

    update () {
        super.update();
    }

    draw (ctx) {
        //console.log("drawing text");
        //ctx.save();
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText(this.combo, this.x, this.y);
        //ctx.strokeText(this.combo, this.x, this.y);
        //ctx.restore();

        Entity.prototype.draw.call(this);
    }
}