/**
 * @author "Soraya Saenna"
 * @version 1.5.0
 */

var GameLayer = cc.LayerColor.extend({

    init: function () {
        this._super(new cc.Color(240, 220, 175, 255));
        this.setPosition(new cc.Point(0, 0));
        this.state = GameLayer.STATES.PAUSE;

        //add background
        this.background = new Background();
        this.background.setPosition(new cc.Point(screenWidth / 2, screenHeight / 2));
        this.addChild(this.background);

        //declare variable for timer
        this.time = 0;
        this.numItem = 0;


        // add player in the child
        this.player = new Player();
        this.player.setPosition(new cc.Point(screenWidth / 2, screenHeight / 2));
        this.addChild(this.player, 1);


        //addItem
        this.item = new Item();
        this.addChild(this.item, 1);
        this.scheduleUpdate();


        this.somethings = [];
        for (var i = 0; i < GameLayer.NUMOBJECT; i++) {
            this.somethings.push(new Something());
            this.addChild(this.somethings[i]);
        }


        this.scoreLabel = cc.LabelTTF.create("score: 0", 'Arial', 40);
        this.scoreLabel.setPosition(new cc.Point(screenWidth / 2, screenHeight - 100));
        this.addChild(this.scoreLabel);


        this.label = cc.LabelTTF.create("Live: ", 'Arial', 40);
        this.label.setPosition(new cc.Point(screenWidth - 100, screenHeight - 100));
        this.addChild(this.label);


        this.liveLabel = cc.LabelTTF.create(this.player.life, 'Arial', 40);
        this.liveLabel.setPosition(new cc.Point(screenWidth - 40, screenHeight - 100));
        this.liveLabel.setColor(cc.color(0, 0, 255));
        this.addChild(this.liveLabel);

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

            // Play iT!
            if (this.state == GameLayer.STATES.STARTED) {
                this.player.start();
                this.timer();
                for (var i = 0; i < this.somethings.length; i++) {
                    this.somethings[i].start();
                }

                // check hit obstacles
                for (var i = 0; i < this.somethings.length; i++) {
                    if (this.player.hit(this.somethings[i])) {
                        // loss life.. another way of if.
                        this.player.lossLive() ? this.endGame() : this.state = GameLayer.STATES.STARTED;
                        // set life label
                        this.liveLabel.setString(this.player.life);
                        // obstacle
                        this.somethings[i].randomPosition();
                    }
                }

                // check hit item
                if(this.player.hit(this.item)) {
                    this.item.setVisible(false);
                }
                
                // update label and color
                this.liveLabel.setString(this.player.life);
                if (this.player.life == 2) {
                    this.liveLabel.setColor(cc.color(255, 255, 0));
                } else if (this.player.life <= 1) {
                    this.liveLabel.setColor(cc.color(255, 0, 0));
                } else {
                    this.liveLabel.setColor(cc.color(0, 0, 255));
                }
            }
        }
    },

    addKeyboardHandlers: function () {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                self.onKeyDown(keyCode);
            }
        }, this);
    },

    addObstacle: function () {
        this.somethings.push(new Something);
        this.addChild(this.somethings[this.somethings.length - 1]);
        this.somethings[this.somethings.length - 1].scheduleUpdate();
        console.info("Add finish, Have: " + this.somethings.length);
    },

    onKeyDown: function (keyCode) {
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
            // check state
            if (this.state == GameLayer.STATES.STARTED) {
                console.info("state: Started");
            } else if (this.state == GameLayer.STATES.PAUSE) {
                console.info("state: Pause");
            } else if (this.state == GameLayer.STATES.DEAD) {
                console.info("state: Dead");
            } else if (this.state == GameLayer.STATES.END) {
                console.info("state: End");
            }
            // check player started
            console.info("Start Player: " + this.player.started);
            // check obstacle started
            this.somethings.forEach(function (something) {
                console.info("Start Obstacle: " + something.started);
            }, this);
            // check num obstacle
            console.info("Number of obstacle: " + this.somethings.length);
            // check obstacle
            console.info(this.somethings);
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
            this.player.life = Player.lIFE;

            // timer
            this.time = 0;
            this.scoreLabel.setString("score: 0");

            // remove obstacle
            for (var i = 0; i < this.somethings.length; i++) {
                this.removeChild(this.somethings[i], true);
            }
            // clear array
            this.somethings.splice(0, this.somethings.length);

            // add new object
            for (var i = 0; i < GameLayer.NUMOBJECT; i++) {
                this.addObstacle();
            }
        } else {
            console.error("You not DEAD!");
        }
    },
    
    timer: function () {
        this.time++;
        this.scoreLabel.setString("score: " + Math.round(this.time / 10));
        if (this.time / 20 % 10 == 0)
            this.addObstacle();
    },

    endGame: function () {
        this.state = GameLayer.STATES.DEAD;
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

GameLayer.NUMOBJECT = 4;

GameLayer.STATES = {
    PAUSE: 1,
    STARTED: 2,
    DEAD: 3,
    END: 0
};