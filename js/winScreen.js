
class WinScreen extends UIElement {

    constructor(game, x, y, width, height, logo) {
        super(game, x, y, false, 100, 100, width, height, "TitleScreen");

        this.width = width;
        this.height = height;

        let that = this;
        this.startButton;
        this.startButton = new ImageButton(game, 0, 0,
            150, 50, "img/restart.png", "img/restart_hover.png");

        this.startButton.x = UIElement.getCenterX(this.width, this.startButton.width, this.x) - 10;
        this.startButton.y = UIElement.getQuarterY(this.height, this.startButton.height, this.y) * 3 + 160;

        this.startButton.setText = "Start Game";
        this.startButton.setDefaultColor = "#333333";
        this.startButton.setTextFont = "15px Metal Mania";
        let xoffset = this.startButton.width / 2;
        let yoffset = this.startButton.height / 1.7;
        let offsets = {
            xOffset: xoffset,
            yOffset: yoffset
        };
        this.startButton.setTextXandYOffset = offsets;
        this.startButton.setOnClick = function () {
            that.game.newLevel(1);
            that.startButton.removal = true;
        };
        game.addEntity(this.startButton);

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
