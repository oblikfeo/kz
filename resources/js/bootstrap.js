import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Функция для обновления CSRF токена
function updateCsrfToken() {
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (token) {
        window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
    }
}

// Обновляем токен при загрузке
updateCsrfToken();

// Обновляем токен при каждом ответе от сервера
window.axios.interceptors.response.use(
    (response) => {
        const newToken = response.headers['x-csrf-token'];
        if (newToken) {
            document.querySelector('meta[name="csrf-token"]')?.setAttribute('content', newToken);
            updateCsrfToken();
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);
