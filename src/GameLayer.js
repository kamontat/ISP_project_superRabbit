// collect object and avoid ... thing <- display on randomly
// gun to shoot avoid thing <- should have limit bullet
// time limit <- make game more hard
// some simple map <- make game more hard
// some item <- make game more easy

var GameLayer = cc.LayerColor.extend({
  init: function() {
    this._super(new cc.Color(240, 220, 175, 255));
    this.setPosition(new cc.Point(0, 0));
    this.state = GameLayer.STATES.FRONT;

    // add player in the child
    this.player = new Player();
    this.player.setPosition(new cc.Point(screenWidth / 2, screenHeight / 2));
    this.addChild(this.player, 1);

    this.scoreLabel = cc.LabelTTF.create("score: 0", 'Arial', 40);
    this.scoreLabel.setPosition(new cc.Point(screenWidth / 2, screenHeight - 100));
    this.addChild(this.scoreLabel);

    this.addKeyboardHandlers();
    this.scheduleUpdate();
    this.player.scheduleUpdate();

    return true;
  },

  update: function() {

  },

  addKeyboardHandlers: function() {
    var self = this;
    cc.eventManager.addListener({
      event: cc.EventListener.KEYBOARD,
      onKeyPressed: function(keyCode, event) {
        self.onKeyDown(keyCode, event);
        self.restart(keyCode, event);
      }
    }, this);
  },

  onKeyDown: function(keyCode, event) {
    if (this.state == GameLayer.STATES.FRONT) {
      this.state = GameLayer.STATES.STARTED;
      this.player.start();
    }
    if (this.state == GameLayer.STATES.STARTED) {
      this.player.jump(keyCode);
    }
  },

  restart: function(keyCode, event) {
    if (this.state == GameLayer.STATES.DEAD) {
      this.state = GameLayer.STATES.STARTED;
      this.player.setPosition(new cc.Point(screenWidth / 2, screenHeight / 2));
      this.player.start();
      this.player.jump();
      this.player.score = 0;
    }
  },

  endGame: function() {
    this.player.stop();
  }
});

var StartScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var layer = new GameLayer();
    layer.init();
    this.addChild(layer);
    console.log("GameLayer created");
  }
});

GameLayer.STATES = {
  FRONT: 1,
  STARTED: 2,
  DEAD: 3
}
