// var startTime;
// var endPercentage;
// chrome.runtime.sendMessage({
//     action: 'localStorage'
// }, function(value) {
//     startTime=items.startTime;
//     endPercentage=items.endTime;
// });
function isRealValue(obj)
{
    return obj && obj !== 'null' && obj !== 'undefined';
}

function sendData(){
    if(isRealValue(PLAYER)){
        var currentTime = PLAYER.getCurrentTime();
        var duration = PLAYER.getDuration();
        var percentage = currentTime*100/duration;
        var remain=duration-currentTime;
        // window.postMessage({action:'playdata',percentage : percentage, currentPoint:currentTime, remainPoint:duration}, "*");
        chrome.runtime.sendMessage('lannkhbenkacknkjfjmglmamdbbaendh',{action:'playdata',percentage : percentage, currentPoint:currentTime, remainPoint:remain,duration:duration},(response) => {
        });
        chrome.runtime.sendMessage('lannkhbenkacknkjfjmglmamdbbaendh',{action:'playdata',percentage : percentage, currentPoint:currentTime, remainPoint:remain,duration:duration},(response) => {
        });
    }
}
var clickCount=0;
var vid="";
setInterval(function () {
sendData();
}, 1000);

if(pluginOn){
    setInterval(function () {
        if(isRealValue(PLAYER)){
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
            if(vid!=PLAYER.getVid()){
                clickCount=0;
                vid=PLAYER.getVid();
            }

            if(t2switch==1){
                var endTimepoint = duration - endTime;
                if (currentTime > endTimepoint && clickCount==0) {
                    clickCount=1;
                    document.getElementsByClassName("txp_btn_next")[0].click();

                }
            }else {
                var endTimepoint = endTime * duration/100;
                if (currentTime > endTimepoint && clickCount==0) {
                    clickCount=1;
                    document.getElementsByClassName("txp_btn_next")[0].click();
                }
            }
        }
    }, 1000);
}
