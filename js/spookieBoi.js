
/**
 * The final boss class.
 */
class SpookieBoi extends Enemy {

    constructor (game, player, x, y, speed=1.5, range=300, coolDown = 35) {
        super(game, player, x, y, speed, range, coolDown, 96, 74, 80, 80, 200);

        this.game = game;

        this.idleAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 256 * 6, 0, 256, 256, 0.2, 2, true, false);
        this.idleAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 256 * 8, 0, 256, 256, 0.2, 2, true, false);
        this.idleAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 256 * 3, 0, 256, 256, 0.2, 3, true, false);
        this.idleAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 0, 0, 256, 256, 0.2, 3, true, false);

        this.walkAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 256 * 9, 256, 256, 256, 0.2, 3, true, false);
        this.walkAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 256 * 6, 256, 256, 256, 0.2, 3, true, false);
        this.walkAnimationDownAgro = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 256 * 6, 256, 256, 256, 0.2, 3, true, false);
        this.walkAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 0, 256, 256, 256, 0.2, 3, true, false);
        this.walkAnimationLeftAgro = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 0, 256, 256, 256, 0.2, 3, true, false);
        this.walkAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 256 * 3, 256, 256, 256, 0.2, 3, true, false);
        this.walkAnimationRightAgro = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 256 * 3, 256, 256, 256, 0.2, 3, true, false);

        this.attackAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 256 * 6, 256 * 3, 256, 256, 0.3, 7, false, false);
        this.attackAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 256 * 3, 256 * 4, 256, 256, 0.3, 7, false, false);
        this.attackAnimationLeft = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 256 * 2, 256 * 2, 256, 256, 0.3, 7, false, false);
        this.attackAnimationRight = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 256 * 9, 256 * 2, 256, 256, 0.3, 7, false, false);

        this.deathAnimationDown = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 256, 256 * 9, 256, 256, 0.2, 5, false, false);
        this.deathAnimationUp = new Animation(ASSET_MANAGER.getAsset("../img/Spookie_Boi_SpriteSheet.png"), 256 * 6, 256 * 9, 256, 256, 0.2, 5, false, false);
    }

    update () {
        //this.adjustHitBox(this.facingDirection);
        super.update();
    }

    adjustHitBox(facingDirection) {
        switch(facingDirection) {
            case "down":
            case "up":
                this.height = 90;
                this.width = 65;
                this.boundsXOffset = 96;
                this.boundsYOffset = 75;
                break;
            case "left":
            case "right":
                this.height = 50;
                this.width = 128;
                this.boundsXOffset = 60;
                this.boundsYOffset = 104;
                break;
        }

        let boundsX = this.x + this.boundsXOffset;
        let boundsY = this.y + this.boundsYOffset;
        this.collisionBounds = {width: this.width, height: this.height, x: boundsX, y: boundsY};

        let hitAWall = this.getCollisions(this.collisionBounds, this.game.walls);
    }


    /*draw (ctx) {
        super.draw(ctx);
    }*/


    targetAndAttack() {
        this.standingStill = true;
        this.attacking = true;
        if(this.cooldownCounter >= this.attackCooldown) {
            this.cooldownCounter = 0;
            this.createAttackBox();
        }
        this.cooldownCounter++;
    }

    createAttackBox() {
        let attackBoxX;
        let attackBoxY;
        let attackBoxWidth;
        let attackBoxHeight;
        switch(this.facingDirection) {
            case "up":
                attackBoxX = this.x + 7;
                attackBoxY = this.y - 20;
                attackBoxWidth = 50;
                attackBoxHeight = 20;
                break;
            case "down":
                attackBoxX = this.x + 7;
                attackBoxY = this.y + 52;
                attackBoxWidth = 50;
                attackBoxHeight = 20;
                break;
            case "right":
                attackBoxX = this.x + 58;
                attackBoxY = this.y + 7;
                attackBoxWidth = 20;
                attackBoxHeight = 50;
                break;
            case "left":
                attackBoxX = this.x - 16;
                attackBoxY = this.y + 7;
                attackBoxWidth = 20;
                attackBoxHeight = 50;
                break;
        }
        gameEngine.addEntity(new AttackBox(this.game,this.player,attackBoxWidth,attackBoxHeight,attackBoxX, attackBoxY, this.damage, this.facingDirection));
    }
}