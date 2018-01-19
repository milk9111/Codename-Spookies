class AssetManager {

    constructor() {
        this.successCount = 0;
        this.errorCount = 0;
        this.cache = [];
        this.downloadQueue = [];
    }

    queueDownload(path) {
        console.log("Queueing " + path);
        this.downloadQueue.push(path);
    }

    isDone() {
        return this.downloadQueue.length === this.successCount + this.errorCount;
    }

    downloadAll(callback) {
        for (let i = 0; i < this.downloadQueue.length; i++) {
            let img = new Image();
            let that = this;

            let path = this.downloadQueue[i];
            console.log(path);

            img.addEventListener("load", function () {
                console.log("Loaded " + this.src);
                that.successCount++;
                if(that.isDone()) callback();
            });

            img.addEventListener("error", function () {
                console.log("Error loading " + this.src);
                that.errorCount++;
                if (that.isDone()) callback();
            });

            img.src = path;
            this.cache[path] = img;
        }
    }

    getAsset = function (path) {
        return this.cache[path];
    }

}