
class FreezeSpell extends Entity {

    constructor (game, x, y) {
        super (game, x, y, false, 0, 0, 0, 0, "Freeze Spell");
        this.game = game;

        this.cooldown = 10;
        this.step = 10;
        this.updateLoops = 1;

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

        Entity.prototype.draw.call(this);
    }

    setFreezeForEnemies (value) {
        let enemies = this.game.enemies;

        for (let i = 0; i < enemies.length; i++) {
            enemies[i].frozen = value;
        }
    }
}