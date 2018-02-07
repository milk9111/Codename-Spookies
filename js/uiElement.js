class UIElement extends Entity {
    constructor (game, x, y, hasCollision, width, height, boundsXOffset, boundsYOffset, name) {
        let myName = name;
        if (name === null || name === undefined || name === "") {
            myName = "UIElement";
        }
        super(game, x, y, hasCollision, width, height, boundsXOffset, boundsYOffset, myName);
    }

    update () {
        super.update();
    }

    draw (ctx) {
        Entity.prototype.draw.call(this);
    }
}