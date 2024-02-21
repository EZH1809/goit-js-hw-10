// Описаный в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css"


// Описаный в документации
import iziToast from "izitoast";
// Дополнительный импорт стилей
import "izitoast/dist/css/iziToast.min.css";

// HTML елементи
const dateTimePicker = document.getElementById("datetime-picker");
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

// Переменная для сохранения выбранной пользователем даты
let userSelectedDate;

// Настройка flatpickr
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

// Инициализация flatpickr
flatpickr(dateTimePicker, options);

// Функция для добавления лидирующего нуля
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}


// Функция для преобразования миллисекунд в объект с днями, часами, минутами и секундами
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

// Обработчик нажатия кнопки "Start"
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

// Функция для обновления интерфейса таймера
function updateTimerDisplay(days, hours, minutes, seconds) {
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}
