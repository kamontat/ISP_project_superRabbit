var GameLayer = cc.LayerColor.extend({
  init: function() {
    this._super(new cc.Color(240, 220, 175, 255));
    this.setPosition(new cc.Point(0, 0));

    // add player in the child
    this.player = new Player();
    this.player.setPosition(new cc.Point(screenWidth / 2, screenHeight / 2));
    this.addChild(this.player);

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
      },
      onKeyReleased: function(keyCode, event) {
        self.onKeyUp(keyCode, event);
      }
    }, this);
  },

  onKeyDown: function(keyCode, event) {
    if (keyCode == cc.KEY.space)
      this.player.jump();
  },

  onKeyUp: function(keyCode, event) {},
  update: function() {
    var pos = this.player.getPosition()
    if (pos.y < 0 || pos.y > screenHeight) {
      this.player.unscheduleUpdate();
      this.unscheduleUpdate();
    }
    if (pos.x < 0 || pos.x > screenWidth) {
      this.player.unscheduleUpdate();
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
