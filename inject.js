var myPlayer;
var timeout;

$(window).on('message', function (e) {
    var data = e.originalEvent.data;
    switch (data.type) {
        case "setButtonClick":
            setButtonClick();
            break;
    }
});

function onYouTubePlayerReady(player) {
    console.log("onYouTubePlayerReady");
    myPlayer = player;
    setButtonClick();
}

function setButtonClick() {
    $(".special-btn").click(function () {
        window.clearTimeout(timeout);
        var start = Number($(this).attr("data-start"));
        var duration = Number($(this).attr("data-duration"));
        myPlayer.unMute();
        myPlayer.seekTo(start, true);
        myPlayer.playVideo();
        timeout = window.setTimeout(myPlayer.pauseVideo, duration);
    });
}
