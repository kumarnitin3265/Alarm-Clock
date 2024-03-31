
// Selecting necessary elements from the DOM
let setTime = document.getElementById("current-time");
let setHrs = document.getElementById('alarmHrs');
let setMin = document.getElementById('alarmMin');
let setSec = document.getElementById('alarmSec');
let setPeriod = document.getElementById('alarmPeriod');
let contan =  document.getElementById('alarms');
let submitBtn = document.getElementById('alarm-btn');

// Variables to hold alarm information
let alarmTime;
let almTimesArray = [];     // Array to store alarm times
let timeouts = [];          // Array to store timeout IDs for alarms
let isPresent;

// Function to update the current time displayed
function updateCurrentTime () {
    let curr = new Date();

    let hrs = curr.getHours();
    let min = String(curr.getMinutes()).padStart(2, '0');
    let sec = String(curr.getSeconds()).padStart(2, '0');
    let period = 'AM';

    // Adjusting hours for AM/PM format
    if(hrs >= 12) {
        period = 'PM';
        if(hrs > 12) {
            hrs -= 12;
        }
    }

    hrs = String(hrs).padStart(2, '0');

    // Updating the displayed current time
    setTime.textContent = `${hrs}:${min}:${sec} ${period}`; 

    // Checking if any alarms match the current time and alerting if so
    if(almTimesArray.includes(setTime.textContent)){
        alert("wake up");
    }
}

// Function to handle setting alarms
function alarmSet() {
    let alarmDiv = document.createElement('div');
    alarmDiv.classList.add('added-alarm');

    // Creating a string representation of the alarm time
    alarmTime = `${setHrs.value}:${setMin.value}:${setSec.value} ${setPeriod.value}`;
    setHrs.value = "";
    setMin.value = "";
    setSec.value = "";

    // Creating HTML for the alarm display
    alarmDiv.innerHTML = `
        <h3>${alarmTime}</h3>
        <button class="dlt">Delete</button>
    `;

    // Adding event listener to delete the alarm
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
    });

    // Checking if the alarm time is already present
    isPresent = almTimesArray.includes(alarmTime);

    // If not present, adding the alarm to the list and displaying it
    if(!isPresent){
        contan.appendChild(alarmDiv);
        almTimesArray.push(alarmTime);
    } else {
        alert('This alarm is already present');
    }
    
    console.log('Alm times array:', almTimesArray);
}

// Function to display existing alarms and handle their deletion
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

// Function to remove an alarm from the list
function removeFromAlmTimesArray(alarmTime){
    const index = almTimesArray.indexOf(alarmTime);
    if(index != -1) {
        almTimesArray.splice(index, 1);
        timeouts.splice(index, 1);
        console.log('Alm times array:', almTimesArray);
    }
}

// Initial call to display existing alarms
showAlarm();

// Set interval to update the current time display every second
setInterval(updateCurrentTime, 1000);

// Adding event listener to the alarm setting button
submitBtn.addEventListener('click', alarmSet);

// Initial call to update the current time display
updateCurrentTime();




