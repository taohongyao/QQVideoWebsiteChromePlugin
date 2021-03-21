// function save_options() {
//     var startTime = document.getElementById('startTime').value;
//
//     var endTime = document.getElementById('endTime').value;
//
//
//     chrome.runtime.sendMessage({'action':'setting','startTime':startTime,'endTime':endTime}, function(response) {
//         var status = document.getElementById('status');
//         status.textContent = 'Options saved.';
//         setTimeout(function() {
//             status.textContent = '';
//         }, 750);
//     });
// }

// function save_options() {
//     var startTime = document.getElementById('startTime').value;
//
//     var endTime = document.getElementById('endTime').value;
//     chrome.storage.local.set({
//         'startTime': startTime,
//         'endTime': endTime
//     }, function() {
//         // Update status to let user know options were saved.
//         var status = document.getElementById('status');
//         status.textContent = 'Options saved.';
//         setTimeout(function() {
//             status.textContent = '';
//         }, 750);
//     });
// }

function save_options2() {
    var startTime = document.getElementById('startTime').value;
    var endTime = document.getElementById('endTime').value;
    var startSwitch = document.getElementById('timeSwitch').checked;
    var endSwitch = document.getElementById('timeSwitch2').checked;

    chrome.tabs.getSelected(null, function(tab) {
        var code = 'window.location.reload();';
        chrome.tabs.executeScript(tab.id, {code: code});
    });

    if(startSwitch){
        chrome.storage.local.set({
            'startTime': startTime,
            'startTime_switch': 1,
        }, function() {
            // Update status to let user know options were saved.
            var status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(function() {
                status.textContent = '';
            }, 750);
        });
    }else {
        chrome.storage.local.set({
            'startTime_p': startTime,
            'startTime_switch': 2,
        }, function() {
            // Update status to let user know options were saved.
            var status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(function() {
                status.textContent = '';
            }, 750);
        });
    }

    if(endSwitch){
        chrome.storage.local.set({
            'endTime': endTime,
            'endTime_switch': 1,
        }, function() {
            // Update status to let user know options were saved.
            var status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(function() {
                status.textContent = '';
            }, 750);
        });
    }else {
        chrome.storage.local.set({
            'endTime_p': endTime,
            'endTime_switch': 2,
        }, function() {
            // Update status to let user know options were saved.
            var status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(function() {
                status.textContent = '';
            }, 750);
        });
    }


}

// function restore_options() {
//     // Use default value color = 'red' and likesColor = true.
//     chrome.storage.local.get({
//         'startTime': 150,
//         'endTime': 90
//     }, function(items) {
//         document.getElementById('startTime').value = items.startTime;
//         document.getElementById('endTime').value = items.endTime;
//     });
// }
function restore_all_data(){
    restore_input_data(0);
}
function restore_input_data(mode) {
    // Use default value color = 'red' and likesColor = true.
    var timeSwitch=document.getElementById('timeSwitch').checked;
    var timeSwitch2=document.getElementById('timeSwitch2').checked;
    chrome.storage.local.get({
        'startTime': 150,
        'endTime': 150,
        'startTime_p': 10,
        'endTime_p': 90,
    }, function(items) {
        if(mode==1){
            if(timeSwitch){
                document.getElementById('startTime').value = items.startTime;
            }else {
                document.getElementById('startTime').value = items.startTime_p;
            }
        }else if(mode==2){
            if(timeSwitch2){
                document.getElementById('endTime').value = items.endTime;
            }else {
                document.getElementById('endTime').value = items.endTime_p;
            }
        }else {
            if(timeSwitch){
                document.getElementById('startTime').value = items.startTime;
            }else {
                document.getElementById('startTime').value = items.startTime_p;
            }
            if(timeSwitch2){
                document.getElementById('endTime').value = items.endTime;
            }else {
                document.getElementById('endTime').value = items.endTime_p;
            }
        }


    });
}

function restore_options2() {
    // Use default value color = 'red' and likesColor = true.


    chrome.storage.local.get({
        'startTime': 150,
        'endTime': 150,
        'startTime_p': 10,
        'endTime_p': 90,
        'startTime_switch': 1,
        'endTime_switch': 2,
        'plugin_on':true
    }, function(items) {
        if(items.startTime_switch==1){
            document.getElementById('timeSwitch').checked = true;
            document.getElementById('startTime').value = items.startTime;
            var component= document.getElementById('startTimeLabel');
            component.innerHTML='<strong>Seek Time(default 150):</strong>';
        }else {
            document.getElementById('percentageSwitch').checked = true;
            document.getElementById('startTime').value = items.startTime_p;
            var component= document.getElementById('startTimeLabel');
            component.innerHTML='<strong>Seek Percentage(default 10%):</strong>';
        }
        if(items.endTime_switch==1){
            document.getElementById('timeSwitch2').checked = true;
            document.getElementById('endTime').value = items.endTime;
            var component= document.getElementById('endTimeLabel');
            component.innerHTML='<strong>Endpoint for skipping to next episode(default 150):</strong>';

        }else {
            document.getElementById('percentageSwitch2').checked = true;
            document.getElementById('endTime').value = items.endTime_p;
            var component= document.getElementById('endTimeLabel');
            component.innerHTML='<strong>Endpoint percentage for skipping to next episode(default 90%):</strong>';
        }
        if(items.plugin_on){
            document.getElementById('switchOn').checked = true;
        }else {
            document.getElementById('switchOff').checked = true;
        }

    });
}

function switchChange(){
    if(this.id=='timeSwitch'){
        console.log(this.id);
        var component= document.getElementById('startTimeLabel');
        component.innerHTML='<strong>Seek Time(default 150):</strong>';
        restore_input_data(1);
    }else if(this.id=='percentageSwitch'){
        console.log(this.id);
        var component= document.getElementById('startTimeLabel');
        component.innerHTML='<strong>Seek Percentage(default 10%):</strong>';
        restore_input_data(1);
    }else if(this.id=='timeSwitch2'){
        var component= document.getElementById('endTimeLabel');
        component.innerHTML="<strong>Endpoint for skipping to next episode(default 150):</strong>";
        restore_input_data(2);
    }else if(this.id=='percentageSwitch2'){
        var component= document.getElementById('endTimeLabel');
        component.innerHTML='<strong>Endpoint percentage for skipping to next episode(default 90%):</strong>';
        restore_input_data(2);
    }
}

// function restore_options() {
//     chrome.runtime.sendMessage({action:'getting'}, function(response) {
//
//     });
// }

// chrome.runtime.onMessage.addListener(function (request, sender, callback) {
//     if (request.action == 'update') {
//         document.getElementById('startTime').value = request.startTime;
//         document.getElementById('endTime').value = request.endTime;
//     }
// });




function pluginSwitch(){
    if(this.id=='switchOn'){
        chrome.storage.local.set({
            'plugin_on': true,
        }, function() {
        });

    }else {
        chrome.storage.local.set({
            'plugin_on': false,
        }, function() {

        });
    }


    chrome.tabs.getSelected(null, function(tab) {
        var code = 'window.location.reload();';
        chrome.tabs.executeScript(tab.id, {code: code});
    });

}
function reset(){

    chrome.storage.local.set({
        'startTime': 150,
        'endTime': 150,
        'startTime_p': 10,
        'endTime_p': 90,
        'startTime_switch': 1,
        'endTime_switch': 2,
        'plugin_on':true
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options reset.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });


    restore_options2();
    chrome.tabs.getSelected(null, function(tab) {
        var code = 'window.location.reload();';
        chrome.tabs.executeScript(tab.id, {code: code});
    });
}


var playerCurrentPoint;
var playerRemainPoint;
var playerCurrentPercentage;
chrome.runtime.onMessageExternal.addListener(function (request, sender, callback) {
    if(request.action == 'playdata'){
        console.log("sent");
        playerCurrentPoint=request.currentPoint.toFixed(2);
        playerRemainPoint=request.remainPoint.toFixed(2);
        playerCurrentPercentage=request.percentage.toFixed(2);
        document.getElementById('playData').innerText='['+playerCurrentPoint+'+'+playerRemainPoint+'/'+request.duration.toFixed(2)+'] ('+playerCurrentPercentage+'%)';
    }

});
function updateStartTimeFromPlayerInfo(){
    var startSwitch = document.getElementById('timeSwitch').checked;

    if(startSwitch){
        document.getElementById('startTime').value=playerCurrentPoint;
    }else {
        document.getElementById('startTime').value=playerCurrentPercentage;
    }
}

function updateEndTimeFromPlayerInfo(){
    var endSwitch = document.getElementById('timeSwitch2').checked;
    if(endSwitch){
        document.getElementById('endTime').value=playerRemainPoint;
    }else {
        document.getElementById('endTime').value=playerCurrentPercentage;
    }
}

document.getElementById('timeSwitch').addEventListener('change',switchChange);
document.getElementById('percentageSwitch').addEventListener('change',switchChange);
document.getElementById('timeSwitch2').addEventListener('change',switchChange);
document.getElementById('percentageSwitch2').addEventListener('change',switchChange);
document.getElementById('switchOn').addEventListener('change',pluginSwitch);
document.getElementById('switchOff').addEventListener('change',pluginSwitch);

document.addEventListener('DOMContentLoaded', restore_options2);

document.getElementById('save').addEventListener('click',
    save_options2);
document.getElementById('reset').addEventListener('click',
    reset);
document.getElementById('updateStartTime').addEventListener('click',
    updateStartTimeFromPlayerInfo);
document.getElementById('updateEndTime').addEventListener('click',
    updateEndTimeFromPlayerInfo);