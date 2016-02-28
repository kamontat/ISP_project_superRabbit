var PillarPair = cc.Node.extend({
  ctor: function() {
    this._super();
    this.topPillar = cc.Sprite.create('res/Images/pillar-top.png');
    this.topPillar.setAnchorPoint(new cc.Point(0.5, 0));
    this.topPillar.setPosition(new cc.Point(0, 100));
    this.addChild(this.topPillar);

    this.bottomPillar = cc.Sprite.create('res/Images/pillar-bottom.png');
    this.bottomPillar.setAnchorPoint(new cc.Point(0.5, 1));
    this.bottomPillar.setPosition(new cc.Point(0, -100));
    this.addChild(this.bottomPillar);
  },

  update: function() {
    this.setPositionX(this.getPositionX() - 5);
    if (this.getPositionX() < 0) {
      this.setPositionX(screenWidth);
      this.setPositionY(this.randomPositionY());
    }
  },

  hit: function(player) {
    var playerPos = player.getPosition();
    var myPos = this.getPosition();

    return checkPlayerPillarCollision(playerPos.x, playerPos.y, myPos.x, myPos.y);
  },

  randomPositionY: function() {
    var y = Math.random() * screenHeight;
    if (y <= screenHeight - 200) {
      y = Math.random() * screenHeight;
    }
    if (y <= 200) {
      y = Math.random() * screenHeight;
    }
    return y;
  }
});

var checkPlayerPillarCollision = function(playerX, playerY, pillarX, pillarY) {
  var radiusPlayer = 18;
  var radiusPillar = {
    width: 40,
    height: 100
  };

  if (playerX - radiusPlayer > pillarX + radiusPillar.width) {
    return false;
  }
  if (playerX + radiusPlayer > pillarX - radiusPillar.width && playerY + radiusPlayer > pillarY + radiusPillar.height) {
    return true;
  }
  if (playerX + radiusPlayer > pillarX - radiusPillar.width && playerY - radiusPlayer < pillarY - radiusPillar.height) {
    return true;
  }
  return false;
};
