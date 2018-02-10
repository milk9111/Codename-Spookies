
class LightSpell extends Entity {

    constructor (game, x, y) {
        super(game, x, y, false, 0, 0, 0, 0, "Light Spell");

        this.game = game;

        this.cooldown = 5;
        this.step = 10;
        this.updateLoops = 1;

        this.lastDarknessWidth = this.game.player.darkness.width;
        this.lastDarknessHeight = this.game.player.darkness.height;
        this.lastDarknessX = this.game.player.darkness.x;
        this.lastDarknessY = this.game.player.darkness.y;

        this.game.player.darkness.drawing = false;

        this.game.player.darkness.isExpanding = false;
        this.game.player.darkness.width = this.game.player.darkness.width * 2;
        this.game.player.darkness.height = this.game.player.darkness.height * 2;
        this.game.player.darkness.x = UIElement.getCenterX(this.game.surfaceWidth, this.game.player.darkness.width, 0);
        this.game.player.darkness.y = UIElement.getCenterY(this.game.surfaceHeight, this.game.player.darkness.height, 0);
        console.log(this.game.player.darkness.x + ", " + this.game.player.darkness.y);

        this.lastDrawDistance = drawDistance;
        drawDistance = 1000;

        this.animation = new Animation(ASSET_MANAGER.getAsset("../img/Light_Spell.png"), 0, 0, 64, 64, 0.1,  5, true, false);
    }

    update () {
        if (this.updateLoops % this.step === 0) {
            this.cooldown--;
        }

        if (this.cooldown <= 0) {
            /*this.game.player.darkness.x = this.lastDarknessX;
            this.game.player.darkness.y = this.lastDarknessY;
            this.game.player.darkness.width = this.lastDarknessWidth;
            this.game.player.darkness.height = this.lastDarknessHeight;*/
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