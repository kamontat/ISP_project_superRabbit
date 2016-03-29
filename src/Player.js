var Player = cc.Sprite.extend({
  ctor: function() {
    this._super();
    this.initWithFile("res/Images/dot.png");

    this.score = 0;
    this.live = Player.lIVE;
    this.vx = 0;
    this.vy = Player.STARTING_VELOCITY;
    this.started = false;
  },

  update: function() {
    if (this.started) {
      var pos = this.getPosition();
      this.setPosition(new cc.Point(pos.x + this.vx, pos.y + this.vy));
      this.vy -= Player.G;
    }
  },

  checkOut: function() {
    if (this.getPositionX() < 0 || this.getPositionX() > screenWidth) {
      return true;
    }
    if (this.getPositionY() < 0 || this.getPositionY() > screenHeight) {
      return true;
    }
    return false;
  },

  jump: function(keyCode) {
    this.vy = Player.STARTING_VELOCITY;
    if (keyCode == cc.KEY.left) {
      this.vx = -5;
    } else if (keyCode == cc.KEY.right) {
      this.vx = 5;
    } else if (keyCode == cc.KEY.down) {
      this.vy = -this.vy;
    } else {
      this.vx = 0;
    }
  },

  start: function() {
    this.started = true;
  },

  stop: function() {
    this.started = false;
  }
});

Player.lIVE = 5;
Player.G = 0.85;
Player.STARTING_VELOCITY = 10;
