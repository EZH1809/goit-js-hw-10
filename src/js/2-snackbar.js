// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

// HTML елементи
const form = document.querySelector('.form');

// Обробник події submit форми
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Отримання значень з форми
  const delay = parseInt(form.elements.delay.value, 10);
  const state = form.elements.state.value;

  // Створення та обробка промісу
  const snackbarPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  // Опрацювання виконання промісу
  snackbarPromise
    .then((delay) => {
      // Виведення повідомлення при вдалому виконанні промісу
      iziToast.success({
        title: 'Fulfilled promise',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch((delay) => {
      // Виведення повідомлення при невдалому виконанні промісу
      iziToast.error({
        title: 'Rejected promise',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
});
