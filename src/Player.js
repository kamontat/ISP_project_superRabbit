var Player = cc.Sprite.extend({
  ctor: function() {
    this._super();
    this.initWithFile("res/Images/dot.png");

    this.score = 0;
    this.live = 5;

    this.vy = Player.STARTING_VELOCITY;
    this.started = false;
  },

  update: function() {
    if (this.started) {
      var pos = this.getPosition();
      this.setPosition(new cc.Point(pos.x, pos.y + this.vy));
      this.vy -= Player.G;
    }
  },

  updateScore: function(pillar) {
    var pillarPos = pillar.getPosition();
    var myPos = this.getPosition();
    if (myPos.x == pillarPos.x) {
      this.score++;
    }
  },

    jump: function() {
    this.vy = Player.STARTING_VELOCITY;
  },

  start: function() {
    this.started = true;
  },

  stop: function() {
    this.started = false;
  }
});

Player.G = 0.85;
Player.STARTING_VELOCITY = 15;
