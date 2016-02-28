var GameLayer = cc.LayerColor.extend({
  init: function() {
    this._super(new cc.Color(240, 220, 175, 255));
    this.setPosition(new cc.Point(0, 0));
    this.state = GameLayer.STATES.FRONT;

    // add player in the child
    this.player = new Player();
    this.player.setPosition(new cc.Point(screenWidth / 2, screenHeight / 2));
    this.addChild(this.player, 1);

    // add player in the child
    this.pillarPair1 = new PillarPair();
    this.pillarPair2 = new PillarPair();
    this.pillarPair1.setPosition(new cc.Point(1000, 1000));
    this.pillarPair2.setPosition(new cc.Point(1000, 1000));
    this.addChild(this.pillarPair1);
    this.addChild(this.pillarPair2);

    this.addKeyboardHandlers();
    this.scheduleUpdate();
    this.player.scheduleUpdate();

    return true;
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
      this.updatePillarPairs();
    }
    if (this.state == GameLayer.STATES.STARTED) {
      this.player.jump();
    }
  },

  restart: function(keyCode, event) {
    if (keyCode == cc.KEY.q && this.state == GameLayer.STATES.DEAD) {

      this.state = GameLayer.STATES.FRONT;

      this.player.start();
      this.player.setPosition(new cc.Point(screenWidth / 2, screenHeight / 2));

      this.pillarPair1.setPosition(new cc.Point(900, 300));
      this.pillarPair2.setPosition(new cc.Point(screenWidth + 500, 100));
    }
  },

  updatePillarPairs: function() {
    this.pillarPair1.setPosition(new cc.Point(900, 300));
    this.pillarPair2.setPosition(new cc.Point(screenWidth + 500, 100));

    this.pillarPair1.scheduleUpdate();
    this.pillarPair2.scheduleUpdate();
  },

  endGame: function() {
    this.player.stop();
    this.pillarPair1.unscheduleUpdate();
    this.pillarPair2.unscheduleUpdate();
  },

  update: function() {
    if (this.state == GameLayer.STATES.STARTED) {
      if (this.pillarPair1 && this.pillarPair1.hit(this.player)) {
        this.endGame();
        this.state = GameLayer.STATES.DEAD;
      }

      if (this.pillarPair2 && this.pillarPair2.hit(this.player)) {
        this.endGame();
        this.state = GameLayer.STATES.DEAD;
      }
    }
  },
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
