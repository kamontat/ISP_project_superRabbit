var res = {
    dot_png: 'res/image/Dot.png',
    heart_png: 'res/image/Heart.png',
    carrot_png: 'res/image/Carrot.png',
    startPage_jpg: 'res/image/StartPage.png',
    endPage_jpg: 'res/image/EndPage.jpg',

    monster1_png: 'res/image/monsterfile/Monster1.png',
    monster2_png: 'res/image/monsterfile/Monster2.png',
    monster3_png: 'res/image/monsterfile/Monster3.png',
    monster4_png: 'res/image/monsterfile/Monster4.png',
    monster5_png: 'res/image/monsterfile/Monster5.png',
    monster6_png: 'res/image/monsterfile/Monster6.png',

    playSound_fall: 'res/sound/WhenPlaySound.mp3',
    hitHeartSound_fall: 'res/sound/WhenCollectHeart.mp3',
    hitSound_fall: 'res/sound/WhenHitSong.mp3'

};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
