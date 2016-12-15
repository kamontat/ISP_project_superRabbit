/**
 * Created by bubblebitoey on 9/5/59.
 */


var StartPage = cc.Sprite.extend({
    ctor: function () {
        this._super();
        this.setPosition(new cc.Point(screenWidth / 2, screenHeight / 2));
        this.initWithFile("res/image/StartPage.png");
        this.addKeyboardHandlers();
        this.addMouseHandlers();
    },

    addKeyboardHandlers: function () {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                console.log("key press");
                if (keyCode == cc.KEY.space)
                    self.popup();
            }
        }, this);
    },

    addMouseHandlers: function () {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: function (event) {
                self.popup();
            }
        }, this);
    },

    popup: function (keyCode, event) {
        this.showHowToPlay();
        cc.director.pushScene(new GameScene());
    },

    showHowToPlay: function () {
        alert('- Press up, down, left, right arrows to move the player \n'
            + '- Player must avoid obstacles\n'
            + '- Score increase by increased of time\n'
            + '- collect *heart*, player will get 1 life\n'
            + '- collect *carrot*, game will remove 1 obstacle\n'
            + '- You can press "m" to turn off/on the sound');
    }
});
