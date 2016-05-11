var res = {
    dot_png: 'res/Images/dot.png',
    heart_png: 'res/Images/Heart.png',
    endPage_jpg: 'res/Images/EndPage.jpg',
    playSound_fall: 'res/Sound/whenPlaySound.mp3',
    hitHeartSound_fall: 'res/Sound/soundWhenCollectHeart.mp3',
    hitSound_fall: 'res/Sound/whenHitSong.mp3'

};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
