class UIElement extends Entity {
    constructor (game, x, y, hasCollision, width, height, boundsXOffset, boundsYOffset, name) {
        let myName = name;
        if (name === null || name === undefined || name === "") {
            myName = "UIElement";
        }
        super(game, x, y, hasCollision, width, height, boundsXOffset, boundsYOffset, myName);

        this.width = width;
        this.height = height;
        this.xOffset = width/2;
        this.yOffset = height/1.5;

        this.text = "Text";
        this.textFont = "20px Metal Mania";
        this.textAlign = "center";
        this.textColor = "#FFFFFF";

        this.defaultColor = "#000000";
        this.hoverColor = "#222222";
        this.isHovering = false;

        this.xOffset = boundsXOffset;
        this.yOffset = boundsYOffset;

        this.centerX = this.x + this.width / 2;
        this.centerY = this.y + this.height / 2;

        this.clickAction = function () {
            console.log("UIElement was clicked on");
        }
    }


    static getCenterX (parentWidth, childWidth, parentX) {
        return ((parentWidth / 2) - (childWidth / 2)) + parentX;
    }

    static getCenterY (parentHeight, childHeight, parentY) {
        return ((parentHeight / 2) - (childHeight / 2)) + parentY;
    }

    static getQuarterX (parentWidth, childWidth, parentX) {
        return ((parentWidth / 4) - (childWidth / 2)) + parentX;
    }

    static getQuarterY (parentHeight, childHeight, parentY) {
        return ((parentHeight / 4) - (childHeight / 2)) + parentY;
    }

    update () {
        super.update();
    }

    draw (ctx) {
        Entity.prototype.draw.call(this);
    }


    mouseClicked () {
        if (this.game.click === null) {
            return false;
        }

        let mouseX = this.game.click['x'];
        let mouseY = this.game.click['y'];
        let isClicked = false;

        if ((mouseX >= this.x && mouseX <= this.x + this.width)
            && (mouseY >= this.y && mouseY <= this.y + this.height)) {
            isClicked = true;
            this.game.click = null;
        }
        return isClicked;
    }


    mouseIsHovering () {
        if (this.game.mouse === null) {
            return false;
        }
        let mouseX = this.game.mouse['x'];
        let mouseY = this.game.mouse['y'];
        let isHovering = false;

        if ((mouseX >= this.x && mouseX <= this.x + this.width)
            && (mouseY >= this.y && mouseY <= this.y + this.height)) {
            isHovering = true;
        }
        return isHovering;
    }



    set setOnClick (click) {
        this.clickAction = click;
    }

    /**
     * Takes any number.
     * @param offset
     */
    set setTextXOffset (offset) {
        this.xOffset = offset;
    }

    /**
     * Takes any number.
     * @param offset
     */
    set setTextYOffset (offset) {
        this.yOffset = offset;
    }

    /**
     * Takes an object. It must be in this format:
     *
     * {
     *      xOffset: *number*,
     *      yOffset: *number*
     * }
     *
     * @param offsets An object with 'xOffset' and 'yOffset' fields
     */
    set setTextXandYOffset (offsets) {
        this.xOffset = offsets['xOffset'];
        this.yOffset = offsets['yOffset'];
    }

    /**
     * Takes any string value.
     * @param text
     */
    set setText (text) {
        this.text = text;
    }

    /**
     * Takes a string in the form stated in this link:
     * https://www.w3schools.com/tags/canvas_font.asp
     *
     * The default is the string '25px Times'
     * @param font
     */
    set setTextFont (font) {
        this.textFont = font;
    }

    /**
     * Takes a string with a single alignment.
     * The default is 'center'.
     *
     * @param alignment
     */
    set setTextAlign (alignment) {
        this.textAlign = alignment;
    }

    /**
     * Takes a string hexidecimal representation for a color.
     * @param textColor
     */
    set setTextColor (textColor) {
        this.textColor = textColor;
    }

    /**
     * Takes a string hexidecimal representation for a color.
     * @param color
     */
    set setDefaultColor (color) {
        this.defaultColor = color;
    }

    /**
     * Takes a string hexidecimal representation for a color.
     * @param color
     */
    set setHoverColor (color) {
        this.hoverColor = color;
    }

    /**
     * Takes a boolean.
     * @param isHovering
     */
    set setHovering (isHovering) {
        this.isHovering = isHovering;
    }

    /**
     * Takes any number. (Preferably integer)
     * @param x
     */
    set setX (x) {
        this.x = x;
    }

    /**
     * Takes any number. (Preferably integer)
     * @param y
     */
    set setY (y) {
        this.y = y;
    }

    /**
     * Takes an object. It must be in this format:
     *
     * {
     *      x: *number*,
     *      y: *number*
     * }
     *
     * @param pos An object with 'x' and 'y' fields
     */
    set setXandY (pos) {
        this.x = pos['x'];
        this.y = pos['y'];
    }

    /**
     * Takes any number. (Preferably integer)
     * @param width
     */
    set setWidth (width) {
        this.width = width;
    }

    /**
     * Takes any number. (Preferably integer)
     * @param height
     */
    set setHeight (height) {
        this.height = height;
    }

    /**
     * Takes an object. It must be in this format:
     *
     * {
     *      width: *number*,
     *      height: *number*
     * }
     *
     * @param size An object with 'width' and 'height' fields
     */
    set setWidthandHeight (size) {
        this.width = size['width'];
        this.height = size['height'];
    }


    static calculateCenterPosOfParent (parent, child) {
        let centerX = parent.x + parent.width / 2;
        let centerY = parent.y + parent.height / 2;

        let newX = (-1 * child.width) / -2 + centerX;
        let newY = (-1 * child.height) / -2 + centerY;

        let centerPoint = {
            x: newX,
            y: newY
        };
        console.log(centerPoint);
        return centerPoint;
    }
}