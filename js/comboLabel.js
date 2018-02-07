

class ComboLabel extends UIElement {

    constructor (game, x, y) {
        super(game, x + 30, y - 20, false, 0, 0, 0, 0, "ComboLabel");
        this.combo = "";
        this.game = game;
        this.comboState = 1; //1 = in progress, 2 = success, 3 = failure
        this.successTimer = 0;
        this.failTimer = 0;
        this.alpha = 1;
    }

    buildCombo (nextComboInput) {
        this.combo += nextComboInput;
    }

    set stateOfCombo (comboState) {
        this.comboState = comboState;
    }

    update () {
        switch(this.comboState) {
            case 1:
                break;
            case 2:
            case 3:
                if (this.alpha > 0) {
                    this.alpha = Number(this.alpha).toFixed(2) - Number(.02).toFixed(2);
                } else {
                    this.removal = true;
                }
                break;
        }
        super.update();
    }

    draw (ctx) {
        ctx.save();
        if (this.comboState === 1) {
            ctx.fillStyle = "#808080";
        } else if (this.comboState === 2) {
            ctx.fillStyle = "#228B22";
        } else if (this.comboState === 3) {
            ctx.fillStyle = "#B22222";
        }

        ctx.strokeStyle = "#000000";
        ctx.globalAlpha = this.alpha;
        ctx.font = "25px Georgia";
        ctx.textAlign = "center";
        ctx.fillText(this.combo, this.x, this.y);
        ctx.strokeText(this.combo, this.x, this.y);
        ctx.restore();

        Entity.prototype.draw.call(this);
    }
}