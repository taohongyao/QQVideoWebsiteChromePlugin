// chrome.runtime.onMessage.addListener(function (request, sender, callback) {
//     if (request.action == 'getting') {
//         console.log("1");
//         chrome.storage.local.get(['startTime', 'endTime'], function (items) {
//             t1 = items.startTime;
//             t2 = items.endTime;
//             console.log(t1);
//             console.log(t2);
//             chrome.runtime.sendMessage({action:'update','startTime':t1,'endTime':t2}, function(response) {
//
//             });
//             // callback({'startTime':t1,'endTime':t2});
//         });
//     }
// });
// chrome.runtime.onMessage.addListener(function (request, sender, callback) {
//     if(request.action == 'setting'){
//         console.log("2");
//         chrome.storage.local.set({
//             'startTime': request.startTime,
//             'endTime': request.endTime
//         }, function() {
//             chrome.storage.sync.get(['startTime', 'endTime'], function (items) {
//                 t1 = items.startTime;
//                 t2 = items.endTime;
//                 callback({'startTime':t1,'endTime':t2});
//             });
//         });
//
//     }
//
// });

function loadIcon(sender){
    console.log("log")
    chrome.storage.local.get({
        'plugin_on':true
    }, function(items) {
        console.log("log2")
        if(items.plugin_on){
            console.log("1");
            chrome.browserAction.setIcon({path:'img/32_icon.png',tabId: sender.tab.id});
        }else {
            console.log("2");
            chrome.browserAction.setIcon({path:'img/32_off.png',tabId: sender.tab.id});
        }

    });
}

chrome.runtime.onMessage.addListener(function (request, sender, callback) {
    console.log("hehe")
    if(request.action == 'reloadIcon'){
        loadIcon(sender);

    }

});



