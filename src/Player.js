var Player = cc.Sprite.extend({
  ctor: function() {
    this._super();
    this.initWithFile("res/Images/dot.png");

    this.vy = Player.STARTING_VELOCITY;
  },
  update: function(dt) {
    var pos = this.getPosition();
    this.setPosition(new cc.Point(pos.x, pos.y + this.vy));
    this.vy -= Player.G;
  },
  jump: function() {
    this.vy = Player.STARTING_VELOCITY;
  }
});

Player.G = 1;
Player.STARTING_VELOCITY = 15;
