var GameLayer = cc.LayerColor.extend({
  init: function() {
    this._super(new cc.Color(39, 48, 72, 255));
    this.setPosition(new cc.Point(0, 0));

    return true;
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
