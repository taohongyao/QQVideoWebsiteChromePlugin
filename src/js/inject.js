// var startTime;
// var endPercentage;
// chrome.runtime.sendMessage({
//     action: 'localStorage'
// }, function(value) {
//     startTime=items.startTime;
//     endPercentage=items.endTime;
// });

setInterval(function () {
    var currentTime = PLAYER.getCurrentTime();
    var duration = PLAYER.getDuration();

    if(t1switch==1){
        if(currentTime<startTime){
            PLAYER.seekTo(startTime);
        }
    }else {
        var seekTime=duration*startTime/100;
        if(currentTime<seekTime){
            PLAYER.seekTo(seekTime);
        }

    }

    if(t2switch==1){
        var endTimepoint = duration - endTime;
        if (currentTime > endTimepoint) {
            document.getElementsByClassName("txp_btn_next")[0].click();
        }
    }else {
        var endTimepoint = endTime * duration/100;
        if (currentTime > endTimepoint) {
            document.getElementsByClassName("txp_btn_next")[0].click();
        }
    }
}, 1000);