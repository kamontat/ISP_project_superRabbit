/**
 * @author ""
 * @version 1.5.0
 */

var GameLayer = cc.LayerColor.extend({
    init: function () {
        this._super(new cc.Color(240, 220, 175, 255));
        this.setPosition(new cc.Point(0, 0));
        this.state = GameLayer.STATES.PAUSE;

        // add player in the child
        this.player = new Player();
        this.player.setPosition(new cc.Point(screenWidth / 2, screenHeight / 2));
        this.addChild(this.player, 1);

        this.somethings = [];
        for (var i = 0; i < GameLayer.NUMOBJECT; i++) {
            this.somethings.push(new Something());
            this.addChild(this.somethings[i]);
        }

        this.scoreLabel = cc.LabelTTF.create("score: 0", 'Arial', 40);
        this.scoreLabel.setPosition(new cc.Point(screenWidth / 2, screenHeight - 100));
        this.addChild(this.scoreLabel);
        this.addKeyboardHandlers();
        this.scheduleUpdate();
        this.player.scheduleUpdate();
        for (var i = 0; i < this.somethings.length; i++) {
            this.somethings[i].scheduleUpdate();
        }

        return true;
    },

    update: function () {
        // end is mean END
        if (this.state != GameLayer.STATES.END) {
            // out length
            if (this.player.checkOut()) {
                this.endGame();
            }

            // first player of press pause button
            if (this.state == GameLayer.STATES.PAUSE) {
                // stop player
                this.player.stop();
                // stop obstacle
                for (var i = 0; i < this.somethings.length; i++) {
                    this.somethings[i].stop();
                }
            }

            // dead player
            if (this.state == GameLayer.STATES.DEAD) {
                // stop player
                this.player.stop();
                // stop obstacle
                for (var i = 0; i < this.somethings.length; i++) {
                    this.somethings[i].stop();
                }

                if (confirm("Do you want to play again!?")) {
                    this.restart();
                } else {
                    this.endLabel = cc.LabelTTF.create("GAME IS END", 'Arial', 100);
                    this.endLabel.setPosition(new cc.Point(screenWidth / 2, screenHeight / 2));
                    this.endLabel.setColor(cc.color(255, 0, 0));
                    this.addChild(this.endLabel);

                    this.state = GameLayer.STATES.END;
                }
            }

            // Play iT!
            if (this.state == GameLayer.STATES.STARTED) {
                this.player.start();
                for (var i = 0; i < this.somethings.length; i++) {
                    this.somethings[i].start();
                }

                // check hit
                for (var i = 0; i < this.somethings.length; i++) {
                    if (this.player.hit(this.somethings[i])) {
                        this.somethings[i].randomPosition();
                        console.warn("HIT!");
                    }
                }
            }
        }
    },

    addKeyboardHandlers: function () {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                self.onKeyDown(keyCode, event);
            }
        }, this);
    },

    onKeyDown: function (keyCode, event) {
        if (keyCode == cc.KEY.up || keyCode == cc.KEY.right || keyCode == cc.KEY.down || keyCode == cc.KEY.left) {
            if (this.state == GameLayer.STATES.PAUSE) {
                this.state = GameLayer.STATES.STARTED;
                this.player.start();
            }
            if (this.state == GameLayer.STATES.STARTED) {
                this.player.jump(keyCode);
            }
        }
        // check by key
        if (keyCode == cc.KEY.s) {
            console.info("state: " + this.state);
        }
    },

    restart: function () {
        if (this.state == GameLayer.STATES.DEAD) {
            this.state = GameLayer.STATES.PAUSE;

            // player
            this.player.setPosition(new cc.Point(screenWidth / 2, screenHeight / 2));
            this.player.start();
            this.player.jump();
            this.player.score = 0;
            this.player.live = Player.lIVE;

            for (var i = 0; i < this.somethings.length; i++) {
                // obstacle
                this.somethings[i].randomPosition();
            }
        } else {
            console.error("You not DEAD!");
        }
    },

    endGame: function () {
        this.state = GameLayer.STATES.DEAD;
    }
});

var StartScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild(layer);
        console.log("GameLayer created");
    }
});

GameLayer.NUMOBJECT = 7;
GameLayer.STATES = {
    PAUSE: 1,
    STARTED: 2,
    DEAD: 3,
    END: 0
};
