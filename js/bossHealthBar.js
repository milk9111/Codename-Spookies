

class BossHealthBar extends UIElement {

    constructor (game, boss, x, y) {
        super(game, x, y, false, 0, 0, 0, 0, "BossHealthBar");

        this.game = game;
        this.boss = boss;
        this.bossStartingHealth = this.boss.health;

        this.maxWidth = (this.game.surfaceWidth - (this.game.surfaceWidth / 4)) *  (this.boss.health / this.bossStartingHealth);
        this.currWidth = this.maxWidth;

        this.height = 50;

        this.fillColor = "#FF0000";
        this.borderColor = "#666666";
    }

    update () {
        super.update();
    }

    draw (ctx) {

        ctx.save();
        ctx.fillStyle = this.fillColor;
        if (this.currWidth >= 0) {
            ctx.fillRect(this.x, this.y, this.currWidth, this.height);
        }
        ctx.strokeStyle = this.borderColor;
        ctx.strokeRect(this.x, this.y, this.maxWidth, this.height);
        ctx.restore();

        Entity.prototype.draw.call(this);
    }

    changeHealth() {
        this.currWidth = (this.game.surfaceWidth - (this.game.surfaceWidth / 4)) * (this.boss.health / this.bossStartingHealth);
    }
}