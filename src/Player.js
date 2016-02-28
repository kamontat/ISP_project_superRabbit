var Player = cc.Sprite.extend({
  ctor: function() {
    this._super();
    this.initWithFile("res/Images/dot.png");

    this.vy = Player.STARTING_VELOCITY;
    this.started = false;
  },

  start: function() {
    this.started = true;
  },

  stop: function() {
    this.started = false;
  },

  update: function(dt) {
    if (this.started) {
      var pos = this.getPosition();
      this.setPosition(new cc.Point(pos.x, pos.y + this.vy));
      this.vy -= Player.G;
    }
  },
  jump: function() {
    this.vy = Player.STARTING_VELOCITY;
  }
});

Player.G = 0.85;
Player.STARTING_VELOCITY = 15;
