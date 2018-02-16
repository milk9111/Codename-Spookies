
class WinScreen extends UIElement {

    constructor(game, x, y, width, height, logo) {
        super(game, x, y, false, 100, 100, width, height, "WinScreen");

        this.width = width;
        this.height = height;

        let that = this;
        this.restartButton;
        this.restartButton = new ImageButton(game, 0, 0,
            150, 50, "../img/restart.png", "../img/restart_hover.png");

        this.restartButton.x = UIElement.getCenterX(this.width, this.restartButton.width, this.x);
        this.restartButton.y = UIElement.getQuarterY(this.height, this.restartButton.height, this.y) * 3;

        this.restartButton.setText = "Restart Game";
        this.restartButton.setDefaultColor = "#333333";
        this.restartButton.setTextFont = "15px Metal Mania";
        let xoffset = this.restartButton.width / 2;
        let yoffset = this.restartButton.height / 1.7;
        let offsets = {
            xOffset: xoffset,
            yOffset: yoffset
        };
        this.restartButton.setTextXandYOffset = offsets;
        this.restartButton.setOnClick = function () {
            console.log("I'm clicked");
            that.game.newLevel(1);
            that.restartButton.removal = true;
        };
        game.addEntity(this.restartButton);

        this.game = game;
        this.logo = logo;
    }

    update () {
        super.update();
    }

    draw (ctx) {
        ctx.drawImage(ASSET_MANAGER.getAsset(this.logo), this.x, this.y, this.width, this.height);
        Entity.prototype.draw.call(this);
    }
}
