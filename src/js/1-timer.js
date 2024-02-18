// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";


// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

// HTML елементи
const dateTimePicker = document.getElementById("datetime-picker");
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

// Змінна для збереження обраної користувачем дати
let userSelectedDate;

// Налаштування flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

// Ініціалізація flatpickr
flatpickr(dateTimePicker, options);

// Функція для додавання лідируючого нуля
function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

// Функція для перетворення мілісекунд в об'єкт з днями, годинами, хвилинами і секундами
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

// Обробник натискання кнопки "Start"
startButton.addEventListener('click', () => {
  startButton.disabled = true;

  const intervalId = setInterval(() => {
    const now = new Date();
    const timeDifference = userSelectedDate - now;

    if (timeDifference <= 0) {
      clearInterval(intervalId);
      updateTimerDisplay(0, 0, 0, 0);
      iziToast.success({
        title: 'Success',
        message: 'Countdown timer has ended!',
      });
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeDifference);
      updateTimerDisplay(days, hours, minutes, seconds);
    }
  }, 1000);
});

// Функція для оновлення інтерфейсу таймера
function updateTimerDisplay(days, hours, minutes, seconds) {
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}
