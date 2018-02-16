/**
 * @author James Roberts
 */
class AttackBox extends Entity{
    constructor(gameEngine, player, width, height, x, y, damage, attackDirection) {
        super(gameEngine, x, y, true, width, height, 0, 0, "Attack Box");
        this.player = player;
        this.damage = damage;
        this.smackDistance = 15;
        this.smackSpeed = 3;
        this.count = 0;
        this.attackDirection = attackDirection;
        this.buildDirections();
    };

    /**
     * Builds an array of opposite directions.
     */
    buildDirections() {
        let blocked = {};
        blocked['right'] = 'left';
        blocked['left'] = 'right';
        blocked['up'] = 'down';
        blocked['down'] = 'up';
        this.blocked = blocked;
    }

    /**
     *Damages the player if it doesn't hit the player's shield,
     */
    update() {
        if(this.count >= 1) {
            this.removal = true;
        } else {
            if(Math.intersects(this, this.player)) {
                if(this.blocked[this.attackDirection] !== facingDirection || !this.player.raising) {
                    this.player.smack(this.damage, this.smackDistance, this.attackDirection, this.smackSpeed);
                }
            }
        }
        this.count++;
    };

}