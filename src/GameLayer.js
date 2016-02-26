var GameLayer = cc.LayerColor.extend({
  init: function() {
    this._super(new cc.Color(39, 48, 72, 255));
    this.setPosition(new cc.Point(0, 0));

    // create Ship1 object
    this.ship1 = new Ship1();
    this.ship1.setPosition(new cc.Point(150, 150));
    this.addChild(this.ship1);

    return true;
  }
});

var StartScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var layer = new GameLayer();
    layer.init();
    this.addChild(layer);
    console.log("GameLayer created with " + screenHeight + " and " + screenWidth);
  }
});
