
class SpawnPoint extends Entity {
    constructor(game, boss, x, y, xOffset = 0, yOffset = 0) {
        super (game, x, y, false, 32, 32, 0, 0, "SpawnPoint");

        this.game = game;

        this.player = this.game.player;
        this.boss = boss;

        this.xOffset = xOffset;
        this.yOffset = yOffset;

        this.maxEnemies = 1;
        this.currSpawnEnemies = this.maxEnemies;

        this.spawnCounter = 0;
        this.loopsBeforeNextSpawn = 100;

        this.isDraw = true;

        this.isClosed = true;
        this.speedX = 2;
        this.speedY = 2;
    }

    update () {
        let distance = Math.getDistance(this.player.x, this.player.y, this.x, this.y);
        this.isDraw = distance < drawDistance;

        if (!this.isClosed) {
            if (this.spawnCounter % this.loopsBeforeNextSpawn === 0) {
                let miniSpook = new MiniSpook(this.game, this.player, this.x + this.xOffset, this.y + this.yOffset);
                this.game.addEntity(miniSpook);
                this.currSpawnEnemies--;
            }
            this.spawnCounter++;

            if (this.currSpawnEnemies < 0) {
                this.isClosed = true;
                if (this.checkIfWaveOver()) {
                    console.log("Wave is over");
                    this.boss.newWaveStarted = false;
                }
            }
        }

        //Controls the map movement on/off screen
        if(this.player.offRight) {
            this.x -= this.speedX;
        } else if (this.player.offLeft) {
            this.x += this.speedX;
        } else if (this.player.offTop) {
            this.y += this.speedY;
        } else if (this.player.offBottom) {
            this.y -= this.speedY;
        }
        super.update();
    }

    draw(ctx) {

        if (this.isDraw) {
            if (this.isClosed) {
                ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 61, 32 * 6, 32, 32, this.x, this.y, 32, 32);
            } else {
                ctx.drawImage(ASSET_MANAGER.getAsset("../img/sprites.png"), 32 * 60, 32 * 6, 32, 32, this.x, this.y, 32, 32);
            }
        }

        super.draw(ctx);
    }

    startSpawning () {
        this.currSpawnEnemies += this.maxEnemies;
        this.spawnCounter = 0;
        this.isClosed = false;
    }

    checkIfWaveOver () {
        let waveOver = false;
        for (let spawn of this.game.spawnPoints) {
            waveOver = waveOver && spawn.isClosed;
        }
        return waveOver;
    }
}