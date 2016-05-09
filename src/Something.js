var Something = cc.Sprite.extend({
    ctor: function () {
        this._super();
        // random obstacle pic
        this.numOfRand = Math.ceil(Math.random() * 6);
        if (this.numOfRand == 1) {
            this.initWithFile('res/Images/Monster1.png');
        } else if (this.numOfRand == 2) {
            this.initWithFile('res/Images/Monster2.png');
        } else if (this.numOfRand == 3) {
            this.initWithFile('res/Images/Monster3.png')
        } else if (this.numOfRand == 4) {
            this.initWithFile('res/Images/Monster4.png')
        } else if (this.numOfRand == 5) {
            this.initWithFile('res/Images/Monster5.png')
        } else {
            this.initWithFile('res/Images/Monster6.png')
        }


        this.x = 0;
        this.y = 0;

        this.randMoveX = Math.random() * Something.SPEEDNOTOVER;
        this.randMoveY = Math.random() * Something.SPEEDNOTOVER;

        this.started = true;

        while (this.randMoveX <= Something.SPEEDATLEAST || this.randMoveY <= Something.SPEEDATLEAST) {
            this.randMoveX = Math.random() * Something.SPEEDNOTOVER;
            this.randMoveY = Math.random() * Something.SPEEDNOTOVER;
        }

        this.randDir = Math.ceil(Math.random() * 2);
        this.rand = 0;
        this.randomPosition();
    },

    update: function () {
        if (this.started) {
            this.warp();
            switch (this.rand) {
                // left
                case Something.DIR.LEFT:
                    if (this.randDir == 1) {
                        this.setPosition(new cc.Point(this.x + this.randMoveX, this.y + this.randMoveY));
                    } else {
                        this.setPosition(new cc.Point(this.x + this.randMoveX, this.y - this.randMoveY));
                    }
                    break;
                // up
                case Something.DIR.UP:
                    if (this.randDir == 1) {
                        this.setPosition(new cc.Point(this.x + this.randMoveX, this.y - this.randMoveY));
                    } else {
                        this.setPosition(new cc.Point(this.x - this.randMoveX, this.y - this.randMoveY));
                    }
                    break;
                // right
                case Something.DIR.RIGHT:
                    if (this.randDir == 1) {
                        this.setPosition(new cc.Point(this.x - this.randMoveX, this.y + this.randMoveY));
                    } else {
                        this.setPosition(new cc.Point(this.x - this.randMoveX, this.y - this.randMoveY));
                    }
                    break;
                // down
                case Something.DIR.DOWN:
                    if (this.randDir == 1) {
                        this.setPosition(new cc.Point(this.x + this.randMoveX, this.y + this.randMoveY));
                    } else {
                        this.setPosition(new cc.Point(this.x - this.randMoveX, this.y + this.randMoveY));
                    }
                    break;
                // other
                default:
                    console.error("Cause Error on Update in Something");
                    break;
            }
            this.x = this.getPositionX();
            this.y = this.getPositionY();
        }
    },

    warp: function () {
        if (this.x < 0 || this.y < 0 || this.x > screenWidth || this.y > screenHeight) {
            this.randomPosition();
        }
    },

    randomPosition: function () {
        this.rand = Math.ceil(Math.random() * 4);
        switch (this.rand) {
            // left
            case Something.DIR.LEFT:
                this.x = 0;
                this.y = Math.ceil(Math.random() * screenHeight);
                break;
            // up
            case Something.DIR.UP:
                this.x = Math.ceil(Math.random() * screenWidth);
                this.y = screenHeight;
                break;
            // right
            case Something.DIR.RIGHT:
                this.x = screenWidth;
                this.y = Math.ceil(Math.random() * screenHeight);
                break;
            // down
            case Something.DIR.DOWN:
                this.x = Math.ceil(Math.random() * screenWidth);
                this.y = 0;
                break;
            // other
            default:
                console.error("Cause Error on randomPosition in Something");
                break;
        }
        this.setPosition(new cc.Point(this.x, this.y));
    },

    start: function () {
        this.started = true;
    },

    stop: function () {
        this.started = false;
    }
});

Something.SPEEDATLEAST = 3;
Something.SPEEDNOTOVER = 10;

Something.SECOND_TO_APPEAR = 4;

Something.DIR = {
    LEFT: 1,
    UP: 2,
    RIGHT: 3,
    DOWN: 4
};