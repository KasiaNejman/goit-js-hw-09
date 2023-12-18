import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const startButton = document.querySelector("button[data-start]");
const daysSpan = document.querySelector(".value[data-days]");
const hoursSpan = document.querySelector(".value[data-hours]");
const minutesSpan = document.querySelector(".value[data-minutes]");
const secondsSpan = document.querySelector(".value[data-seconds]");

startButton.disabled = true;

function pad(value) {
  return String(value).padStart(2, "0");
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedTime = selectedDates[0].getTime();
    const currentTime = new Date().getTime();
    if (selectedTime <= currentTime) {
      Notiflix.Notify.failure("Please choose a date in the future");
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

const fpInstance = flatpickr("#datetime-picker", options);

startButton.addEventListener("click", () => {
  const selectedTime = fpInstance.selectedDates[0].getTime();
  startCountdown(selectedTime);
});

function startCountdown(endTime) {
  function updateCountdown() {
    const currentTime = new Date().getTime();
    const ms = endTime - currentTime;
    if (ms <= 0) {
      clearInterval(intervalId);

      updateDisplay(0, 0, 0, 0);
      Notiflix.Notify.success("The countdown has finished!");
      return;
    }

    const timeParts = convertMs(ms);
    updateDisplay(
      timeParts.days,
      timeParts.hours,
      timeParts.minutes,
      timeParts.seconds
    );
  }

  updateCountdown();
  const intervalId = setInterval(updateCountdown, 1000);
}

function updateDisplay(days, hours, minutes, seconds) {
  daysSpan.textContent = pad(days);
  hoursSpan.textContent = pad(hours);
  minutesSpan.textContent = pad(minutes);
  secondsSpan.textContent = pad(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
