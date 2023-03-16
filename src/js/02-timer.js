import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const inputEl = document.querySelector('#datetime-picker');
const btnEl = document.querySelector('button[data-start]');
const secondsEl = document.querySelector('span[data-seconds]');
const minutesEl = document.querySelector('span[data-seconds]');
const hoursEl = document.querySelector('span[data-seconds]');
const daysEl = document.querySelector('span[data-seconds]');


btnEl.setAttribute(`disabled`, true);
btnEl.addEventListener('click', onStartTimer);
let choosingDate = null;
let timerId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      onChoiceValidDate(selectedDates[0]);
    },
  };

 function onChoiceValidDate(selectedDates){

  choosingDate = selectedDates.getTime()
  if (selectedDates < Date.now()) {
    window.alert("Please choose a date in the future");
  };

  if (selectedDates>=Date.now()) {
    btnEl.removeAttribute('disabled');
  };
  };

function onStartTimer(){
timerId = setInterval(startTimer, 1000);
btnEl.setAttribute(`disabled`, true);
inputEl.setAttribute(`disabled`, true);
}

function startTimer(){
  const differentDate = choosingDate - Date.now();
  const formatDate = convertMs(differentDate);
  renderDate(formatDate)
  if (differentDate === 0) {
    window.alert('Time end');
    clearInterval(timerId);
}
}

function renderDate({ days, hours, minutes, seconds }){
secondsEl.textContent = addLeadingZero(seconds);
minutesEl.textContent = addLeadingZero(minutes);
hoursEl.textContent = addLeadingZero(hours);
daysEl.textContent = addLeadingZero(days);
}


flatpickr(inputEl, options);



function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value){
  return String(value).padStart(2, '0');
}