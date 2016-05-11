/**
 * Created by bubblebitoey on 9/5/59.
 */


var StartPage = cc.Sprite.extend({
    ctor: function () {
        this._super();
        this.setPosition(new cc.Point(screenWidth / 2, screenHeight / 2));
        this.initWithFile("res/Images/StartPage.png");
        this.addKeyboardHandlers();
    },

    addKeyboardHandlers: function () {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                self.onKeyDown(keyCode);
            }
        }, this);
    },

    onKeyDown: function (keyCode, event) {
            // if pace spacebar
            if (keyCode == SPACEBAR)
                cc.director.pushScene(new GameScene());
            else if (keyCode == StartPage.IKEY);
                this.showHowToPlay();
        },

    showHowToPlay: function () {
        alert('- Press up, down, left, right arrows to move the player \n'
            + '- Player must avoid obstacles\n'
            + '- Score increase by increased of time\n'
            + '- when player collect heart exp will increase 300 and add 1 life\n'
            + 'collect carrot exp will increase 100 and remove 1 obstacle\n'
            + 'and one of obstacle will increase exp 1000\n'
            + '- You can press "m" to turn off/ turn on the sound');
    }
});


var SPACEBAR = 32;
StartPage.IKEY = 73;