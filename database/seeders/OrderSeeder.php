<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        // Получаем первого покупателя или создаем тестового
        $buyer = User::where('role', 'buyer')->first();
        
        if (!$buyer) {
            $buyer = User::create([
                'name' => 'Тестовый Покупатель',
                'email' => 'buyer@test.com',
                'password' => bcrypt('password'),
                'role' => 'buyer',
            ]);
        }

        $orders = [
            [
                'user_id' => $buyer->id,
                'title' => 'Решить задачи по математике',
                'subject' => 'Математика',
                'description' => 'Нужно решить 10 задач по алгебре и геометрии. Уровень 10 класс. С подробным решением.',
                'deadline' => now()->addDays(3),
                'status' => 'pending',
            ],
            [
                'user_id' => $buyer->id,
                'title' => 'Написать эссе по литературе',
                'subject' => 'Литература',
                'description' => 'Тема: "Образ Печорина в романе Лермонтова". Объем: 3-4 страницы. Нужен анализ характера героя.',
                'deadline' => now()->addDays(5),
                'status' => 'pending',
            ],
            [
                'user_id' => $buyer->id,
                'title' => 'Подготовить презентацию по истории',
                'subject' => 'История',
                'description' => 'Презентация на тему "Великая Отечественная война". 15-20 слайдов с иллюстрациями и кратким текстом.',
                'deadline' => now()->addDays(7),
                'status' => 'pending',
            ],
            [
                'user_id' => $buyer->id,
                'title' => 'Выполнить лабораторную по физике',
                'subject' => 'Физика',
                'description' => 'Лабораторная работа по механике. Нужно провести расчеты и оформить отчет согласно методичке.',
                'deadline' => now()->addDays(4),
                'status' => 'pending',
            ],
        ];

        foreach ($orders as $orderData) {
            Order::create($orderData);
        }
    }
}
