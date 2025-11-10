import './bootstrap';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import axios from 'axios';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Настраиваем InertiaJS для обновления CSRF токена
axios.interceptors.response.use(
    (response) => {
        // Обновляем CSRF токен из заголовков ответа
        const newToken = response.headers['x-csrf-token'];
        if (newToken) {
            const metaTag = document.querySelector('meta[name="csrf-token"]');
            if (metaTag) {
                metaTag.setAttribute('content', newToken);
            }
            axios.defaults.headers.common['X-CSRF-TOKEN'] = newToken;
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx', { eager: true })),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

