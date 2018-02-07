
class CanvasButton extends UIElement {

    constructor (game, x, y, width, height) {
        super(game, x, y, false, width, height, 0, 0, "CanvasButton");

        this.game = game;

        this.width = width;
        this.height = height;
        this.xOffset = width/2;
        this.yOffset = height/1.5;

        this.text = "Text";
        this.textFont = "15px Times";
        this.textAlign = "center";
        this.textColor = "#FFFFFF";

        this.defaultColor = "#000000";
        this.hoverColor = "#222222";
        this.isHovering = false;
        
        this.clickAction = function () {
            console.log("CanvasButton clicked on");
        }
    }

    update() {
        this.isHovering = this.mouseIsHovering();
        if (this.mouseClicked()) {
            this.clickAction();
        }
        super.update();
    }

    draw(ctx) {
        ctx.save();
        if (!this.isHovering) {
            ctx.fillStyle = this.defaultColor;
        } else {
            ctx.fillStyle = this.hoverColor;
        }
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = this.textColor;
        ctx.font = this.textFont;
        ctx.textAlign = this.textAlign;
        ctx.fillText(this.text, this.x + this.xOffset, this.y + this.yOffset);
        ctx.restore();

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
}