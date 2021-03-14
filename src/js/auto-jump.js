function injectCustomJs(t1, t2,t1switch,t2switch) {
    var jsPath = 'js/inject.js';
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    temp.src = chrome.extension.getURL(jsPath);

    temp.onload = function () {
        this.parentNode.removeChild(this);
    };
    var ss = document.createElement("script");
    ss.innerHTML = "var startTime=" + t1 + ";var endTime=" + t2+";var t1switch="+t1switch+";var t2switch="+t2switch+";";
    document.documentElement.appendChild(ss);
    document.body.appendChild(temp)
}

chrome.runtime.sendMessage({action: "reloadIcon"}, function(response) {

});
chrome.storage.local.get(['startTime','startTime_p', 'endTime','endTime_p', 'plugin_on','startTime_switch','endTime_switch'], function (items) {
    var startTime = 150;
    var startTime_p = 10;
    var endTime = 150;
    var endTime_p = 90;
    var startTime_switch = 1;
    var endTime_switch = 2;
    startTime = items.startTime ? items.startTime : 150;
    startTime_p = items.startTime_p ? items.startTime_p : 10;
    endTime = items.endTime ? items.endTime : 150;
    endTime_p = items.endTime_p ? items.endTime_p : 90;
    startTime_switch = items.startTime_switch ? items.startTime_switch : 1;
    endTime_switch = items.endTime_switch ? items.endTime_switch : 2;
    if (items.plugin_on) {
        console.log(items.plugin_on);
        var t1;
        var t2;
        if(startTime_switch==1){
            t1=startTime;
        }else {
            t1=startTime_p;
        }

        if(endTime_switch==1){
            t2=endTime;
        }else {
            t2=endTime_p;
        }
        injectCustomJs(t1, t2,startTime_switch,endTime_switch);
    }
});


