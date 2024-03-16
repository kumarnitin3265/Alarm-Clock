
let setTime = document.getElementById("current-time");
let setHrs = document.getElementById('alarmHrs');
let setMin = document.getElementById('alarmMin');
let setSec = document.getElementById('alarmSec');
let setPeriod = document.getElementById('alarmPeriod');
let contan =  document.getElementById('alarms');
let submitBtn = document.getElementById('alarm-btn');
let alarmTime;
let almTimesArray = [];
let timeouts = [];


function updateCurrentTime () {
    let curr = new Date();

    let hrs = curr.getHours();
    let min = String(curr.getMinutes()).padStart(2, '0');
    let sec = String(curr.getSeconds()).padStart(2, '0');
    let period = 'AM';

    if(hrs >= 12) {
        period = 'PM';
        if(hrs > 12) {
            hrs -= 12;
        }
    }

    hrs = String(hrs).padStart(2, '0');

    setTime.textContent = `${hrs}:${min}:${sec} ${period}`; 

    if(almTimesArray.includes(setTime.textContent)){
        alert("wake up");
    }
}

function alarmSet() {
    let alarmDiv = document.createElement('div');
    alarmDiv.classList.add('added-alarm');
    alarmTime = `${setHrs.value}:${setMin.value}:${setSec.value} ${setPeriod.value}`;
    alarmDiv.innerHTML = `
        <h3>${alarmTime}</h3>
        <button class="dlt">Delete</button>
    `;
    alarmDiv
        .querySelector('.dlt')
        .addEventListener('click', () => {
            alarmDiv.remove();
            clearTimeout(interval);
            removeFromAlmTimesArray(alarmTime);
        });


    alarmDiv.querySelector('.dlt').addEventListener('click', () => {
        alarmDiv.remove();
        removeFromAlmTimesArray(alarmTime);
    })

    contan.appendChild(alarmDiv);
    almTimesArray.push(alarmTime);
    console.log('Alm times array:', almTimesArray);
}

function showAlarm(){
    let alarms = document.querySelectorAll('.added-alarm');
    alarms.forEach((alarm, index) => {
        let deleteAlarm = alarm.querySelector('.dlt');
        deleteAlarm.addEventListener('click', () => {
            alarm.remove();
            removeFromAlmTimesArray(almTimesArray[index]);
            clearTimeout(timeouts[index]);
        });
    });
}

function removeFromAlmTimesArray(alarmTime){
    const index = almTimesArray.indexOf(alarmTime);
    if(index != -1) {
        almTimesArray.splice(index, 1);
        timeouts.splice(index, 1);
        console.log('Alm times array:', almTimesArray);
    }
}

showAlarm();
setInterval(updateCurrentTime, 1000);
submitBtn.addEventListener('click', alarmSet);
updateCurrentTime();




