class AssetManager {

    constructor() {
        this.successCount = 0;
        this.errorCount = 0;
        this.cache = [];
        this.downloadQueue = [];
        this.soundIds = [];
        this.soundDisabled = false;
    }

    queueDownload(path, options={sound: false}) {
        console.log("Queueing " + path);
        options.path = path;
        this.downloadQueue.push(options);
    }

    isDone() {
        return this.downloadQueue.length === this.successCount + this.errorCount;
    }

    downloadAll(callback) {
        let that = this;
        for (let i = 0; i < this.downloadQueue.length; i++) {
            let content = this.downloadQueue[i];

            if(content.sound) {

                let sound = object(content);
                sound.src = [content.path];
                sound.onload = () => {
                    console.log("Loaded " + sound.src);
                    that.successCount++;
                    if(this.isDone()) callback();
                };

                sound.onerror = () => {
                    console.log("Error loading " + sound.src);
                    that.errorCount++;
                    if(this.isDone()) callback();
                };

                this.cache[content.path] = new Howl(sound);

            } else {
                let img = new Image();

                let path = content.path;
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
    }

    getAsset(path) {
        return this.cache[path];
    }

    playSound(path) {
        let shouldPlay = false;
        if(this.soundIds[path]) {
            //We'll only play the sound if it hasn't already played.
            if(!this.cache[path].playing(this.soundIds[path])) {
                //console.log("Playing: " + path);
                shouldPlay = true;

            } else {
                //Already playing sound, just avoid it entirely
            }
        } else {
            //console.log("Playing: " + path);
            shouldPlay = true;
        }
        if(this.cache[path] && this.cache[path]) {
            this.soundIds[path] = this.cache[path].play();
        }
        if(this.soundDisabled) {
            Howler.mute(true, this.soundIds[path]);
        }
        return this.soundIds[path];
    }

    toggleSound() {
        this.soundDisabled = !this.soundDisabled;
        for(let asset in this.soundIds) {
            Howler.mute(this.soundDisabled, this.soundIds[asset]);
        }
    }

}



function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}