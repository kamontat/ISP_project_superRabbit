/**
 * @class
 * player class in this game
 */
var Player = cc.Sprite.extend({
    /**
     * @constructor
     * init player in first time.
     */
    ctor: function () {
        this._super();
        this.initWithFile("res/Images/dot.png");

        this.score = 0;
        this.life = Player.lIFE;
        this.vx = 0;
        this.vy = Player.STARTING_VELOCITY;
        this.started = false;
    },

    /**
     * update player to move by gravity.
     */
    update: function () {
        if (this.started) {
            var pos = this.getPosition();
            this.setPosition(new cc.Point(pos.x + this.vx, pos.y + this.vy));
            this.vy -= Player.G;
        }
    },

    /**
     * when loss life<br>
     *     @function will check if life is zero it will return true
     * @returns {boolean} true when it dead; otherwise, return false
     */
    lossLive: function () {
        this.life--;
        if (this.life <= 0) {
            return true;
        }
        return false;
    },

    /**
     *  To check player position this is out from screen or not?
     * @returns {boolean}
     */
    checkOut: function () {
        if (this.getPositionX() < 0 || this.getPositionX() > screenWidth) {
            return true;
        } else if (this.getPositionY() < 0 || this.getPositionY() > screenHeight) {
            return true;
        }
        return false;
    },

    /**
     * get keycode and check which button be press
     * And make player jump to that direction
     * @param keyCode the code of keyboard
     */
    jump: function (keyCode) {
        this.vy = Player.STARTING_VELOCITY;
        if (keyCode == cc.KEY.left) {
            this.vx = -5;
        } else if (keyCode == cc.KEY.right) {
            this.vx = 5;
        } else if (keyCode == cc.KEY.down) {
            this.vy = -this.vy;
        } else {
            this.vx = 0;
        }
    },

    /**
     * check player hit with some obstacle
     * @param obstacle some object to check hit or not
     * @returns {boolean}
     */
    hit: function (obstacle) {
        var posPlayer = this.getPosition();
        var posObstacle = obstacle.getPosition();

        return ((Math.abs(posPlayer.x - posObstacle.x) <= Player.HALFX) &&
        (Math.abs(posPlayer.y - posObstacle.y) <= Player.HALFX));
    },

    hitItem: function (item) {
        var posPlayer = this.getPosition();
        var posItem = item.getPosition();
        return ((Math.abs(posPlayer.x - posObstacle.x) <= Player.HALFX) &&
        (Math.abs(posPlayer.y - posObstacle.y) <= Player.HALFX));
    },

    /**
     * add score to localStorage.
     * @param score is score of plyer.
     */
    addScore: function (score) {
        this.score = score;
    },

    /**
     * set score into localStorage.
     */
    setScoreToLocal: function () {
        cc.sys.localStorage.setItem("highScore", this.score);
    },

    /**
     * get score from localStorage.
     */
    getScoreFromLocal: function () {
        return cc.sys.localStorage.getItem("highScore");
    },

    /**
     * if want player to start
     */
    start: function () {
        this.started = true;
    },

    /**
     * if want player to stop
     */
    stop: function () {
        this.started = false;
    }
});

// radius picture
Player.HALFX = 32;
Player.HALFY = 32;

Player.lIFE = 5;

Player.G = 0.85;
Player.STARTING_VELOCITY = 10;
