
class HealSpell extends Entity {

    constructor (game, x, y) {
        super (game, x, y, false, 0, 0, 0, 0, "Freeze Spell");
        this.game = game;


        this.isStart = true;
        this.healAmount = 20;
        ASSET_MANAGER.playSound("../snd/heal.mp3");
        this.animation = new Animation(ASSET_MANAGER.getAsset("../img/Heal_Spell.png"), 0, 0, 64, 64, 0.1, 4, false, false);
    }

    update () {
        if (this.isStart) {
            this.isStart = false;
            if (this.game.player.health < MAX_PLAYER_HEALTH) {
                this.game.player.health += this.healAmount;
                this.game.player.health = (this.game.player.health > MAX_PLAYER_HEALTH) ? MAX_PLAYER_HEALTH : this.game.player.health;
            }
        }

        if (this.animation.isDone()) {
            this.removal = true;
        }
        super.update();
    }

    draw (ctx) {
        this.animation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, 1);
        Entity.prototype.draw.call(this);
    }
}