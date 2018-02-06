
class TitleScreen extends Entity {

    constructor(game, x, y) {
        super(game, x, y, false, 100, 100, 0, 0, "TitleScreen");

        let startButton = new CanvasButton(game, 200, 400, 100, 50);
        startButton.setText = "Start Game";
        startButton.setDefaultColor = "#333333";
        startButton.setOnClick = function () {
            console.log("I'm clicked");
        };
        game.addEntity(startButton);

        this.game = game;
    }

    update () {
        super.update();
    }

    draw (ctx) {
        ctx.drawImage(ASSET_MANAGER.getAsset("../img/codename-spookies_title_white.png"), this.x, this.y, this.game.surfaceWidth, this.game.surfaceHeight);
        Entity.prototype.draw.call(this);
    }
}