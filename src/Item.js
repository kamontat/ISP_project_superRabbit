var Item = cc.Sprite.extend({
        ctor: function () {
            this._super();
            this.initWithFile("res/Images/heart.png");
            this.randomPos();
            this.time = 0;
            this.appear = true;
            this.started = false;
        },

        randomPos: function () {
            var x = Math.random() * screenWidth / 2;
            var y = Math.random() * screenHeight / 2;
            this.setPosition(new cc.Point(x, y));
            this.time = 0;

        },

        hide: function () {
            this.setPosition(new cc.Point(-99, -99));
        },

        update: function () {
            this.time++;
            if (this.started) {
                // every 5 second
                if (this.time / 60 % Item.SECOND_TO_APPEAR == 0) {
                    console.log(this.time / 60);
                    if (this.appear) {
                        this.hide();
                        this.appear = false;
                    } else {
                        this.randomPos();
                        this.appear = true;
                    }
                }
            }
        },

        /**
         * if want to start
         */
        start: function () {
            this.started = true;
        },

        /**
         * if want to stop
         */
        stop: function () {
            this.started = false;
            // reset time
            this.time = 0;
        }
    }
);

Item.SECOND_TO_APPEAR = 5;