function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();

    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);

    var date =  {
        "month":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        "day":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    };
    var mon=date.month[today.getMonth()]
    var d=date.day[today.getDay()]


    document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
    document.getElementById('date').innerHTML = mon+' '+today.getDate()+' '+d+','+today.getFullYear();
    var t = setTimeout(startTime);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

var json = {"hour":[],
            "minute":[],
            "snooze":[],
            "label":[]
};
var alarmcount = -1;
function alarmlist(form) {
    document.getElementById('noalarm').style.display = 'none';
    alarmcount++;
    var hr= document.getElementById('alarmhour').value;
    var min= document.getElementById('alarmminute').value;
    var sn= document.getElementById('snooze').value;
    var lb= document.getElementById('label').value;
    json.hour.push(hr);
    json.minute.push(min);
    json.snooze.push(sn);
    json.label.push(lb);
    var hour = json.hour[alarmcount];
    var minute = json.minute[alarmcount];
    var snooze = json.snooze[alarmcount];
    var label = json.label[alarmcount];
    document.getElementById('alarms').style.display = 'block';
    document.getElementById('alarmtime').innerHTML = hour + ":" + minute;
    document.getElementById('alarmsnooze').innerHTML = 'Snooze time: '+sn+' minutes';
    document.getElementById('alarmlabel').innerHTML = 'Label: '+label;
    alarmset();
    return false;
}

function alarmset() { 
    var today = new Date();
    var hr = json.hour[alarmcount];
    var min = json.minute[alarmcount];
    var sn = json.snooze[alarmcount];
    var lb = json.label[alarmcount];
    if(today.getHours()==hr && today.getMinutes()==min) {
         playalarm(hr,min,sn,lb)
    }
    else {
        var t = setTimeout(alarmset);
    }
}
var snd = new Audio("alarm.mp3");

function playalarm(hr,min,sn,lb) {
    if(sn==0) {
        document.getElementById('snoozebtn').disabled = true;
    }
    document.getElementById('playalarm').style.display = 'inline';
    if(lb=='Untitled')
    document.getElementById('play').innerHTML = + hr + ":" + min;
    else
    document.getElementById('play').innerHTML = + hr + ":" + min+"<br>"+lb;
    snd.play();
}

function snoozealarm() {
    snd.pause();
    document.getElementById('playalarm').style.display = 'none';        
    var hr = json.hour[alarmcount];
    var min = json.minute[alarmcount];
    var sn = json.snooze[alarmcount];
    var lb = json.label[alarmcount];
    if((min+sn)<60) {
        min =min+sn;
    }
    else {
        hr = hr+1;
        min = min+sn-60;
    }
    if(today.getHours()==hr && today.getMinutes()==min) {
         playalarm(hr,min,sn,lb)
    }
    else {
        var t = setTimeout(alarmset);
    }    
}


function stopalarm() {
    document.getElementById('playalarm').style.display = 'none';
    snd.pause();
}


// <!--Import jQuery before materialize.js-->
 //tabs
 $(document).ready(function(){
    $('.tabs').tabs();
    });   

    //modal
    $(document).ready(function(){
    $('.modal').modal();
    }); 
