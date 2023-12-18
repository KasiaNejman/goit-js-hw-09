const body = document.querySelector('body');
const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timer;

startButton.addEventListener('click', event => {
  event.preventDefault();
  timer = setInterval(() => {
    body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
  startButton.disabled = true;
});
stopButton.addEventListener('click', () => {
  startButton.disabled = false;
  clearTimeout(timer);
});
