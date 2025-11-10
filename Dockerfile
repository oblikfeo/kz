# Используем PHP 8.2 с Apache
FROM php:8.2-cli

# Устанавливаем зависимости системы
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev

# Очищаем кеш
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Устанавливаем расширения PHP
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Устанавливаем Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Создаем пользователя для Laravel
RUN useradd -G www-data,root -u 1000 -d /home/laravel laravel
RUN mkdir -p /home/laravel/.composer && \
    chown -R laravel:laravel /home/laravel

# Устанавливаем рабочую директорию
WORKDIR /var/www/html

# Копируем файлы приложения
COPY --chown=laravel:laravel . /var/www/html

# Переключаемся на пользователя laravel
USER laravel

# Открываем порт
EXPOSE 8000

# Запускаем Laravel
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]


