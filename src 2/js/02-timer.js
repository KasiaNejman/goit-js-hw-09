import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

document.addEventListener("DOMContentLoaded", () => {
  function adjustElements() {
    const fieldElements = document.querySelectorAll(".field");
    const timerContainer = document.querySelector(".timer");
    const datePickerInput = document.getElementById("datetime-picker");
    const startButton = document.getElementById("startButton");

    fieldElements.forEach((field) => {
      const valueElement = field.querySelector(".value");
      const labelElement = field.querySelector(".label");

      field.style.display = "flex";
      field.style.flexDirection = "column";
      field.style.alignItems = "center";

      valueElement.style.fontSize = "50px";
      valueElement.style.marginBottom = "5px";

      labelElement.style.fontSize = "20px";
    });

    timerContainer.style.display = "flex";
    timerContainer.style.gap = "30px";
    timerContainer.style.marginLeft = "50px";
  }

  adjustElements();

  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      const currentDate = new Date();

      if (selectedDate < currentDate) {
        Notiflix.Notify.warning("Please choose a date in the future");
        document.getElementById("startButton").disabled = true;
      } else {
        document.getElementById("startButton").disabled = false;
      }
    },
  };

  flatpickr("#datetime-picker", options);

  let countdownInterval;

  function updateCountdown(endDate) {
    countdownInterval = setInterval(() => {
      const currentDate = new Date();
      const remainingTime = endDate - currentDate;

      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
        Notiflix.Notify.success("Countdown finished!");
        return;
      }

      const { days, hours, minutes, seconds } = convertMs(remainingTime);

      document.getElementById("days").innerText = addLeadingZero(days);
      document.getElementById("hours").innerText = addLeadingZero(hours);
      document.getElementById("minutes").innerText = addLeadingZero(minutes);
      document.getElementById("seconds").innerText = addLeadingZero(seconds);
    }, 1000);
  }

  document.getElementById("startButton").addEventListener("click", () => {
    const selectedDate = new Date(
      document.getElementById("datetime-picker").value
    );

    if (!selectedDate || selectedDate <= new Date()) {
      Notiflix.Notify.failure("Please select a valid future date");
      return;
    }

    clearInterval(countdownInterval);
    updateCountdown(selectedDate);
  });

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

  function addLeadingZero(value) {
    return String(value).padStart(2, "0");
  }
});
function newFunction(datePickerInput, startButton) {
  datePickerInput.style.fontSize = "200%";
  startButton.style.fontSize = "200%";
}
