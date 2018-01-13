

class Enemy {

    constructor(gameEngine) {
        this.game = gameEngine;
        this.player = null;
        this.x = 200;
        this.y = 200;
        this.speed = 1;
        this.range = 100;
    }

    assignPlayer() {

        for(let i = 0; i < this.game.entities.length; i++) {
            if(this.game.entities[i] instanceof Player) {
                this.player = this.game.entities[i];
                console.log(this.player);
            }
        }

    };

    isPlayerInRange() {
        let xDist = Math.pow(Math.abs(this.x - this.player.x), 2);
        let yDist = Math.pow(Math.abs(this.y - this.player.y), 2);
        let distance = Math.sqrt(xDist + yDist);
        return distance <= this.range;
    };

    update() {
        if(this.player === null) {
            this.assignPlayer();
        }
        if(this.isPlayerInRange()) {
            let xDir = this.player.x - this.x;
            this.x += (xDir < 0) ? -this.speed : this.speed;
            let yDir = this.player.y - this.y;
            this.y += (yDir < 0) ? -this.speed : this.speed;
        }

    };

    draw(ctx) {
        ctx.fillStyle = (this.isPlayerInRange()) ? 'red' : 'green';
        ctx.fillRect(this.x, this.y, 50, 50);
    };
}
