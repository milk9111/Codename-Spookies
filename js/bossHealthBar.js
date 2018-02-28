

class BossHealthBar extends UIElement {

    constructor (game, boss, x, y) {
        super(game, x, y, false, 0, 0, 0, 0, "BossHealthBar");

        this.game = game;
        this.boss = boss;
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