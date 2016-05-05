var Item = cc.Sprite.extend({
        ctor: function () {
            this._super();
            this.initWithFile("res/Images/heart.png");
            this.randomPos();
            this.time = 0;
            this.count = 0;
            this.started = false;
        },

        randomPos: function () {
            var x = Math.random() * screenWidth / 2;
            var y = Math.random() * screenHeight / 2;
            this.setPosition(new cc.Point(x, y));
            this.time = 0;

        },

        hide: function () {
            this.count = 0;
            this.setPosition(new cc.Point(-99, -99));
        },

        update: function () {
            if (this.started) {
                this.time++;
                // every 5 second
                if (this.time / 40 % 5 == 0) {
                    this.randomPos();
                    this.count++;
                    if (this.count > 1) {
                        this.hide();
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
        }
    }
);

