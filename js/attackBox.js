class AttackBox extends Entity{
    //this.swingBox = {width: 35, height: 35, x:  0, y:  0};
    constructor(gameEngine, player, width, height, x, y, damage) {
        super(gameEngine, x, y, true, width, height, 0, 0, "Attack Box");
        this.player = player;
        this.damage = damage;
        this.smackDistance = 15;
        this.smackSpeed = 3;
        this.count = 0;
    };

    update() {
        if(this.count >= 1) {
            this.removal = true;
        } else {
            if(Math.intersects(this, this.player)) {
                this.player.smack(this.damage, this.smackDistance, this.facingDirection, this.smackSpeed);
            }
        }
        this.count++;
    };

    draw(ctx) {
        this.game.ctx.strokeStyle="#000000";
        this.game.ctx.fillRect(this.x,this.y,this.width,this.height);
        //super.draw(ctx);
    };
}