
class FreezeSpell extends Entity {

    constructor (game, x, y) {
        super (game, x, y, false, 0, 0, 0, 0, "Freeze Spell");
        this.game = game;

        this.cooldown = 10;
        this.step = 10;
        this.updateLoops = 1;

        this.animation = new Animation(ASSET_MANAGER.getAsset("../img/Freeze_Spell.png"), 0, 0, 256, 256, 0.05,  10, false, false);
        this.setFreezeForEnemies(true);
    }

    update () {
        if (this.updateLoops % this.step === 0) {
            this.cooldown--;
        }

        if (this.cooldown <= 0) {
            this.setFreezeForEnemies(false);
            this.removal = true;
        }
        this.updateLoops++;
        super.update();
    }

    draw (ctx) {
        if (!this.animation.isDone()) {
            this.animation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, 1);
        }
        Entity.prototype.draw.call(this);
    }

    setFreezeForEnemies (value) {
        let enemies = this.game.enemies;

        for (let i = 0; i < enemies.length; i++) {
            enemies[i].frozen = value;
        }
    }
}