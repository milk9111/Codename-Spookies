
class TitleScreen extends UIElement {

    constructor(game, x, y) {
        super(game, x, y, false, 100, 100, 0, 0, "TitleScreen");

        let that = this;
        let startButton = new CanvasButton(game, 200, 400, 100, 50);
        startButton.setText = "Start Game";
        startButton.setDefaultColor = "#333333";
        startButton.setTextFont = "15px Metal Mania";
        let xoffset = startButton.width / 2;
        let yoffset = startButton.height / 1.7;
        let offsets = {
            xOffset: xoffset,
            yOffset: yoffset
        };
        startButton.setTextXandYOffset = offsets;
        console.log(startButton.xOffset + ", " + startButton.yOffset);
        startButton.setOnClick = function () {
            console.log("I'm clicked");
            that.game.newLevel(1);
            startButton.removal = true;
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