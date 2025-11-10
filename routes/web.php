<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\LogoutController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Публичные маршруты
Route::get('/', [\App\Http\Controllers\OrderController::class, 'board'])->name('home');

// Аутентификация
Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'create'])->name('login');
    Route::post('/login', [LoginController::class, 'store']);
    
    Route::get('/register', [RegisterController::class, 'create'])->name('register');
    Route::post('/register', [RegisterController::class, 'store']);
    
    Route::get('/forgot-password', [ForgotPasswordController::class, 'create'])->name('password.request');
    Route::post('/forgot-password', [ForgotPasswordController::class, 'store'])->name('password.email');
    
    Route::get('/reset-password/{token}', [ResetPasswordController::class, 'create'])->name('password.reset');
    Route::post('/reset-password', [ResetPasswordController::class, 'store'])->name('password.update');
});

// Защищенные маршруты
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\OrderController::class, 'index'])->name('dashboard');
    
    Route::get('/profile', [\App\Http\Controllers\ProfileController::class, 'index'])->name('profile');
    Route::put('/profile', [\App\Http\Controllers\ProfileController::class, 'update']);
    Route::put('/profile/password', [\App\Http\Controllers\ProfileController::class, 'updatePassword']);
    
    // Заказы
    Route::post('/orders', [\App\Http\Controllers\OrderController::class, 'store'])->name('orders.store');
    Route::post('/orders/{order}/accept', [\App\Http\Controllers\OrderController::class, 'accept'])->name('orders.accept');
    Route::get('/orders/accepted', [\App\Http\Controllers\OrderController::class, 'myAccepted'])->name('orders.accepted');
    
    Route::post('/logout', [LogoutController::class, 'destroy'])->name('logout');
});
