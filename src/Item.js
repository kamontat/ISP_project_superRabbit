var Item = cc.Sprite.extend({
        ctor: function () {
            this._super();
            this.initWithFile("res/Images/heart.png");
            this.randomPos();
        },

        randomPos: function () {
            var x = Math.random() * screenWidth / 2;
            var y = Math.random() * screenHeight / 2;
            this.setPosition(new cc.Point(x, y));
        }
    }
);

