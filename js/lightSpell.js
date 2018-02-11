
class LightSpell extends Entity {

    constructor (game, x, y) {
        super(game, x, y, false, 0, 0, 0, 0, "Light Spell");

        this.game = game;

        this.cooldown = 7;
        this.step = 10;
        this.updateLoops = 1;

        this.game.player.darkness.drawing = false;

        this.lastDrawDistance = drawDistance;
        drawDistance = 1000;

        ASSET_MANAGER.playSound("../snd/lightspell.wav");
        this.animation = new Animation(ASSET_MANAGER.getAsset("../img/Light_Spell.png"), 0, 0, 64, 64, 0.1,  5, true, false);
    }

    update () {
        if (this.updateLoops % this.step === 0) {
            this.cooldown--;
        }

        if (this.cooldown <= 0) {
            this.game.player.darkness.drawing = true;
            this.removal = true;
            drawDistance = this.lastDrawDistance;
        }
        this.updateLoops++;
        super.update();
    }

    draw (ctx) {
        this.animation.drawFrame(this.game, this.game.clockTick, ctx, this.x, this.y, 1);
        Entity.prototype.draw.call(this);
    }
}