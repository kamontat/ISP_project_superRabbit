/**
 * @author "Soraya Saenna"
 * @version 1.7.0
 */
var GameLayer = cc.LayerColor.extend({
    init: function () {
        this._super(new cc.Color(240, 220, 175, 255));
        this.setPosition(new cc.Point(0, 0));
        this.state = GameLayer.STATES.PAUSE;

        // declare sound variable
        this.sound = true;

        //declare variable for timer
        this.time = 0;

        //add background
        this.background = new Background();
        this.background.setPosition(new cc.Point(screenWidth / 2, screenHeight / 2));
        this.addChild(this.background);

        // add player in the child
        this.player = new Player();
        this.player.setPosition(new cc.Point(screenWidth / 2, screenHeight / 2));
        this.addChild(this.player, 1);

        //addItem
        this.heart = new Heart();
        this.addChild(this.heart);
        this.heart.scheduleUpdate();

        //add carrot
        this.carrot = new Carrot();
        this.addChild(this.carrot);
        this.carrot.scheduleUpdate();

        //add obstacles
        this.obstacles = [];
        for (var i = 0; i < GameLayer.NUMOBJECT; i++) {
            this.obstacles.push(new Obstacle());
            this.addChild(this.obstacles[i]);
        }

        this.levelLabel = cc.LabelTTF.create("LV: " + this.player.lv, 'Arial', 25);
        this.levelLabel.setPosition(new cc.Point(60, screenHeight - 50));
        this.addChild(this.levelLabel);

        this.expLabel = cc.LabelTTF.create(this.player.exp + "/" + this.player.getMaxExp(), 'Arial', 15);
        this.expLabel.setPosition(new cc.Point(60, screenHeight - 70));
        this.addChild(this.expLabel);

        this.highScoreLabel = cc.LabelTTF.create(this.player.getScoreFromLocal() == null ? "high-score: 0" : "high-score: " + this.player.getScoreFromLocal(), 'Arial', 25);
        this.highScoreLabel.setPosition(new cc.Point(screenWidth / 3, screenHeight - 50));
        this.addChild(this.highScoreLabel);

        this.playTimeLabel = cc.LabelTTF.create(cc.sys.localStorage.getItem("play") == null ? "play: 0" : "play: " + cc.sys.localStorage.getItem("play"), 'Arial', 40);
        this.playTimeLabel.setPosition(new cc.Point(100, screenHeight - 100));
        this.addChild(this.playTimeLabel);

        this.avgScoreLabel = cc.LabelTTF.create(cc.sys.localStorage.getItem("avgScoreLabel") == null ? "avg-score: 0" : "avg-score: " + cc.sys.localStorage.getItem("avgScoreLabel"), 'Arial', 25);
        this.avgScoreLabel.setPosition(new cc.Point(2 * screenWidth / 3, screenHeight - 50));
        this.addChild(this.avgScoreLabel);

        this.scoreLabel = cc.LabelTTF.create("score: 0", 'Arial', 40);
        this.scoreLabel.setPosition(new cc.Point(screenWidth / 2, screenHeight - 100));
        this.addChild(this.scoreLabel);

        this.label = cc.LabelTTF.create("Life: ", 'Arial', 40);
        this.label.setPosition(new cc.Point(screenWidth - 100, screenHeight - 100));
        this.addChild(this.label);

        this.lifeLabel = cc.LabelTTF.create(this.player.life, 'Arial', 40);
        this.lifeLabel.setPosition(new cc.Point(screenWidth - 40, screenHeight - 100));
        this.lifeLabel.setColor(cc.color(0, 0, 255));
        this.addChild(this.lifeLabel);

        this.statusLabel = cc.LabelTTF.create("Pause", 'Arial', 20);
        this.statusLabel.setPosition(new cc.Point(screenWidth - 80, screenHeight - 50));
        this.addChild(this.statusLabel);

        this.addKeyboardHandlers();

        // sound start
        cc.audioEngine.playMusic('res/sound/WhenPlaySound.mp3', true);

        this.scheduleUpdate();
        this.player.scheduleUpdate();
        for (var i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].scheduleUpdate();
        }

        return true;
    },

    update: function () {
        // out length
        if (this.player.checkOut()) {
            this.endGame();
        }

        // iff pause button been press
        if (this.state == GameLayer.STATES.PAUSE) {
            this.pauseGame();
        }

        // Play iT!
        if (this.state == GameLayer.STATES.STARTED) {
            this.time++;

            this.updateStatus();
            this.updateScore();
            this.updateObstacle();

            // check hit obstacles
            for (var i = 0; i < this.obstacles.length; i++) {
                if (this.player.hit(this.obstacles[i], 24, 24)) {
                    // random obstacle again
                    this.obstacles[i].randomPosition();

                    // playing soundEffect
                    cc.audioEngine.playEffect('res/sound/WhenHitSong.mp3');

                    // loss life.. another way of if.
                    if (this.player.lossLive()) {
                        // set life label
                        this.lifeLabel.setString(this.player.life);
                        // end this game
                        this.endGame();
                    }
                    // set life label
                    this.lifeLabel.setString(this.player.life);
                }
            }

            // check hit heart
            if (this.player.hit(this.heart, 24, 24)) {
                cc.audioEngine.playEffect('res/sound/WhenCollectHeart.mp3');
                this.heart.hide();
                this.player.life += GameLayer.ITEMS.HEART.POINT;
                this.player.updateLV(GameLayer.ITEMS.HEART.EXP);
            }

            // check hit carrot
            if (this.player.hit(this.carrot, 24, 35)) {
                cc.audioEngine.playEffect('res/sound/WhenHitCarrot.mp3');
                this.removeObstacle();
                this.carrot.hide();
                this.player.updateLV(GameLayer.ITEMS.CARROT);
            }

            // update label and color
            this.updateLabel();
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

    /**
     * arrow or a-s-w-d -> control direction
     * d -> delete all history
     * q -> auto play [ON]
     * e -> auto play [OFF]
     * m -> mute sound
     * p -> pause to game
     * i -> log all information
     */
    onKeyDown: function (keyCode) {
        if (keyCode == cc.KEY.up || keyCode == cc.KEY.right || keyCode == cc.KEY.down || keyCode == cc.KEY.left || keyCode == cc.KEY.a || keyCode == cc.KEY.s || keyCode == cc.KEY.d || keyCode == cc.KEY.w) {
            if (this.state == GameLayer.STATES.PAUSE) {
                this.startGame();
            }
            if (this.state == GameLayer.STATES.STARTED) {
                this.player.jump(keyCode);
            }
        }

        //press "d" to delete data in local storage
        if (keyCode == cc.KEY.d) {
            this.resetHistory();
        }

        // auto play
        if (keyCode == cc.KEY.q) {
            this.player.schedule(this.player.autoJump, 0.15);
            console.warn("auto play: Turn ON");
        }
        // manual play
        if (keyCode == cc.KEY.e) {
            this.player.unschedule(this.player.autoJump);
            console.warn("auto play: Turn OFF");
        }

        //press "m" to mute the sound
        if (keyCode == cc.KEY.m) {
            if (this.sound) {
                cc.audioEngine.setMusicVolume(0);
                cc.audioEngine.setEffectsVolume(0);
                this.sound = false;
            } else {
                cc.audioEngine.setMusicVolume(1);
                cc.audioEngine.setEffectsVolume(1);
                this.sound = true;
            }
            this.updateStatus();
        }

        // press 'p' to pause the game
        if (keyCode == cc.KEY.p) {
            if (this.state == GameLayer.STATES.STARTED) {
                this.state = GameLayer.STATES.PAUSE;
            } else {
                this.startGame();
            }
            this.updateStatus();
        }

        //press "s" to check all information
        if (keyCode == cc.KEY.i) {
            this.logStatus();
        }
    },

    addObstacle: function (update) {
        this.obstacles.push(new Obstacle);
        this.addChild(this.obstacles[this.obstacles.length - 1]);
        this.obstacles[this.obstacles.length - 1].scheduleUpdate();
        console.info("Add finish, Have: " + this.obstacles.length);
        if (update) {
            this.player.updateLV(GameLayer.ITEMS.OBSTACLE);

        }
    },

    removeObstacle: function () {
        this.obstacles[this.obstacles.length - 1].unschedule();
        this.removeChild(this.obstacles[this.obstacles.length - 1], true);
        this.obstacles.pop();
        console.info("Remove finish, Have: " + this.obstacles.length);
    },

    resetHistory: function () {
        cc.sys.localStorage.removeItem("play");
        cc.sys.localStorage.removeItem("highScoreLabel");
        cc.sys.localStorage.removeItem("avgScoreLabel");
        cc.sys.localStorage.removeItem("name");

        cc.sys.localStorage.setItem("play", 0);
        cc.sys.localStorage.setItem("highScoreLabel", 0);
        cc.sys.localStorage.setItem("avgScoreLabel", 0);
        cc.sys.localStorage.setItem("name", "");

        this.updateLabel();
    },

    logStatus: function () {
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
        // game info
      console.info(this.sound ? "Music: ON" : "Music: OFF");
        // check player started
        console.info("Start Player: " + this.player.started);
        console.info("Score: " + this.player.score);
        console.info("Life: " + this.player.life);
        console.info("Lv: " + this.player.lv);
        console.info("Exp: " + this.player.exp + "/" + this.player.getMaxExp());
        // check obstacle started
        this.obstacles.forEach(function (obstacle) {
            console.info("Start Obstacle: " + obstacle.started);
        }, this);
        // check num obstacle
        console.info("Number of obstacle: " + this.obstacles.length);
    },

    /**
     * update 6 time in every second
     */
    updateScore: function () {
        // run 6 time in 1 second
        if (this.check(6, 1))
            this.player.addScore(this.player.lv);
    },

    /**
     * to update status iff have change change
     */
    updateStatus: function () {
        var txt = "";
        if (this.state == GameLayer.STATES.PAUSE) {
            txt = "Pause";
            if (!this.sound) {
                txt += "/Mute";
            }
        } else {
            if (!this.sound) {
                txt += "Mute";
            }
        }
        this.statusLabel.setString(txt);
    },

    /**
     * update every 3 second
     */
    updateObstacle: function () {
        // Obstacle.SECOND_TO_APPEAR second will run this if 1 time
        if (this.check(1, Obstacle.SECOND_TO_APPEAR))
            this.addObstacle(true);
    },

    updateLabel: function () {
        // set lv label
        this.levelLabel.setString("LV: " + this.player.lv);
        this.expLabel.setString(this.player.exp + "/" + this.player.getMaxExp());

        // set score label
        this.scoreLabel.setString("score: " + this.player.score);
        // set life label
        this.lifeLabel.setString(this.player.life);
        this.changeLifeColor();
        //set high score label
        this.highScoreLabel.setString("high-score: " + this.player.getScoreFromLocal());
        //set played time label
        this.playTimeLabel.setString("play: " + cc.sys.localStorage.getItem("play"));
        //set average score
        this.avgScoreLabel.setString("avg-score: " + cc.sys.localStorage.getItem("avgScoreLabel"));
    },

    changeLifeColor: function () {
        if (this.player.life == 2) {
            this.lifeLabel.setColor(cc.color(255, 255, 0));
        } else if (this.player.life <= 1) {
            this.lifeLabel.setColor(cc.color(255, 0, 0));
        } else {
            this.lifeLabel.setColor(cc.color(0, 0, 255));
        }
    },

    /**
     * use only have time update in every frame
     * @param time how many times you want
     * @param second how many second you want
     * @returns {boolean} true, false
     */
    check: function (time, second) {
        return this.time / (60 / time) % second == 0;
    },

    startGame: function () {
        // change state
        this.state = GameLayer.STATES.STARTED;
        // start player
        this.player.start();
        // start heart
        this.heart.start();
        // start carrot
        this.carrot.start();
        // start obstacle
        for (var i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].start();
        }
    },

    pauseGame: function () {
        // stop player
        this.player.stop();
        // stop heart
        this.heart.stop();
        // stop carrot
        this.carrot.stop();
        // stop obstacle
        for (var i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].stop();
        }
    },

    restart: function () {
        if (this.state == GameLayer.STATES.DEAD) {
            this.state = GameLayer.STATES.PAUSE;

            // player
            this.player.setPosition(new cc.Point(screenWidth / 2, screenHeight / 2));
            this.player.reset();
            this.player.start();

            // set label
            this.updateLabel();

            // heart
            this.heart.randomPos();
            //carrot
            this.carrot.randomPos();

            // timer
            this.time = 0;

            // remove obstacle
            for (var i = 0; i < this.obstacles.length; i++) {
                this.removeChild(this.obstacles[i], true);
            }
            // clear array
            this.obstacles.splice(0, this.obstacles.length);

            // add new object
            for (var i = 0; i < GameLayer.NUMOBJECT; i++) {
                this.addObstacle(false);
            }
        }
    },

    endGame: function () {
        // change state
        this.state = GameLayer.STATES.DEAD;

        this.pauseGame();
        //add score in to local Storage
        this.player.setScoreToLocal();

        //get info from local storage
        var play = Number(cc.sys.localStorage.getItem("play"));
        var avg = cc.sys.localStorage.getItem("avgScoreLabel");
        var score = this.player.score;

        //update player played time
        cc.sys.localStorage.setItem("play", play + 1);
        //update average score
        cc.sys.localStorage.setItem("avgScoreLabel", (((avg * play) + score) / (play + 1)).toFixed(2));

        // update all label
        this.updateLabel();

        //mute background music
        cc.audioEngine.setMusicVolume(0);
        cc.audioEngine.setEffectsVolume(0);

        if (confirm("Do you want to play again at lv 1 (current lv. " + this.player.lv + ") !?")) {
            // un mute the music sound
            if (this.sound) {
                cc.audioEngine.setMusicVolume(1);
                cc.audioEngine.setEffectsVolume(1);
            }
            // restart
            this.restart();
        } else {
            this.unscheduleUpdate();
            this.removeAllChildren(true);
            // end sound
            cc.audioEngine.end();
            // open end page
            var endPage = new EndPage();
            endPage.setPosition(new cc.Point(screenWidth / 2, screenHeight / 2));
            this.addChild(endPage);
            //playing end music
            cc.audioEngine.setMusicVolume(1);
            cc.audioEngine.playMusic('res/sound/EndingSound.mp3', true);
        }
    }
});

var StartScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        //test local storage
        if (typeof (Storage) === "undefined") {
            console.error("your browser don't support local storage");
        } else {
            var startPage = new StartPage();
            this.addChild(startPage);
        }
    }
});

var GameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild(layer);
        console.log("GameLayer created");
    }
});

GameLayer.NUMOBJECT = 3;

GameLayer.STATES = {
    PAUSE: 1,
    STARTED: 2,
    DEAD: 3
};

GameLayer.ITEMS = {
    OBSTACLE: 900,
    HEART: {
        POINT: 1,
        EXP: 1300
    },
    CARROT: 500
};
