/**
 * Contains logic to sit in one spot, then aggro on a player if they are in range.
 * @author Myles Haynes
 */
class Enemy {

    constructor(gameEngine) {
        this.game = gameEngine;
        this.player = null;
        this.x = 200;
        this.y = 200;
        this.unroundedX = this.x;
        this.unroundedY = this.y;
        this.speed = 0.75;
        this.range = 100;
    }

    /**
     * Find the player entity from the game engine.
     */
    assignPlayer() {

        for(let i = 0; i < this.game.entities.length; i++) {
            if(this.game.entities[i] instanceof Player) {
                this.player = this.game.entities[i];
                console.log(this.player);
            }
        }

    };

    /**
     * Is the player in range?
     * @returns {boolean}
     */
    isPlayerInRange() {
        return areEntitiesInRange({x: this.x, y: this.y}, this.player, this.range);
    };

    // noinspection JSUnusedGlobalSymbols
    update() {
        if(this.player === null) {
            this.assignPlayer();
        }
        if(this.isPlayerInRange()) {
            let xDir = this.player.x - this.x;
            this.unroundedX += (xDir < 0) ? -this.speed : this.speed;
            this.x = Math.round(this.unroundedX);

            let yDir = this.player.y - this.y;
            this.unroundedY += (yDir < 0) ? -this.speed : this.speed;
            this.y = Math.round(this.unroundedY);
        }

    };

    draw(ctx) {
        ctx.fillStyle = (this.isPlayerInRange()) ? 'red' : 'green';
        ctx.fillRect(this.x, this.y, 50, 50);
    };
}
