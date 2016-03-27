var Object = cc.Node.extend({
  ctor: function() {
    this._super();
    this.x = 0;
    this.y = 0;
    this.object = cc.Sprite.create('res/Images/object.png');
    this.object.setAnchorPoint(new cc.Point(0.5, 0));
    this.object.setPosition(new cc.Point(0, 100));
    this.addChild(this.object);
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

  randomPosition: function() {
    var rand = Math.ceil(Math.random() * 4);

    switch (rand) {
      // left
      case 1:
          this.x = 0;
        this.y = Math.ceil(Math.random() * screenHeight);
        break;
      // up
      case 2:
        this.x = Math.ceil(Math.random() * screenWidth);
        this.y = screenHeight;
        break;
      // right
      case 3:
        this.x = screenWidth;
        this.y = Math.ceil(Math.random() * screenHeight);
        break;
      // down
      case 4:
        this.x = Math.ceil(Math.random() * screenWidth);
        this.y = 0;
        break;
      // other
      default:
        console.error("Cause Error on randomPosition in Object");
        break;
    }
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
