// Описаный в документации
import iziToast from "izitoast";
// Дополнительный импорт стилей
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

// Обработчик событий submit формы
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Получение значений из формы
  const delay = parseInt(form.elements.delay.value, 10);
  const state = form.elements.state.value;

  // Создание и обработка промиса
  const snackbarPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  
  snackbarPromise
    .then((delay) => {
      // Вывод сообщения об успешном исполнении
      iziToast.success({
        title: 'Fulfilled promise',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch((delay) => {
      // Вывод сообщения о неудачном исполнении
      iziToast.error({
        title: 'Rejected promise',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
});
