var Something = cc.Sprite.extend({
    ctor: function () {
        this._super();
        this.initWithFile('res/Images/object.png');
        this.x = 0;
        this.y = 0;

        this.randMoveX = Math.random() * 7;
        this.randMoveY = Math.random() * 7;

        this.started = true;

        while (this.randMoveX <= 3 || this.randMoveY <= 3) {
            this.randMoveX = Math.random() * 5;
            this.randMoveY = Math.random() * 5;
        }

        this.randDir = Math.ceil(Math.random() * 2);
        this.rand = 0;
        this.randomPosition();

        console.info("Create and add finish");
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

Something.DIR = {
    LEFT: 1,
    UP: 2,
    RIGHT: 3,
    DOWN: 4
};