var GameLayer = cc.LayerColor.extend({
  init: function() {
    this._super(new cc.Color(240, 220, 175, 255));
    this.setPosition(new cc.Point(0, 0));
    this.state = GameLayer.STATES.FRONT;

    // add player in the child
    this.player = new Player();
    this.player.setPosition(new cc.Point(screenWidth / 2, screenHeight / 2));
    this.addChild(this.player);

    // add player in the child
    this.pillarPair = null;

    // report position
    this.positionLabel = cc.LabelTTF.create("", 'Arial', 40);
    this.positionLabel.setPosition(new cc.Point(screenWidth - 100, screenHeight - 50));
    this.addChild(this.positionLabel);

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
      }
    }, this);
  },

  onKeyDown: function(keyCode, event) {
    if (this.state == GameLayer.STATES.FRONT) {
      this.state = GameLayer.STATES.STARTED;
      this.player.start();
      this.createPillarPair();
    }
    if (this.state == GameLayer.STATES.STARTED) {
      this.player.jump();
    }
  },

  createPillarPair: function() {
    this.pillarPair = new PillarPair();
    this.pillarPair.setPosition(new cc.Point(900, 300));
    this.addChild(this.pillarPair);
    this.pillarPair.scheduleUpdate();
  },

  update: function() {
    var pos = this.player.getPosition()
    if (pos.y < 0 || pos.y > screenHeight) {
      this.player.unscheduleUpdate();
      this.pillarPair.unscheduleUpdate();
      this.unscheduleUpdate();
    }
    if (pos.x < 0 || pos.x > screenWidth) {
      this.player.unscheduleUpdate();
      this.pillarPair.unscheduleUpdate();
      this.unscheduleUpdate();
    }
    console.log(pos);
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
  STARTED: 2
}
