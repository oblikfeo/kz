<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

// Публичные маршруты
Route::get('/', function () {
    return redirect('/auth');
});

// Авторизация
Route::middleware('guest')->group(function () {
    Route::get('/auth', [AuthController::class, 'show'])->name('auth');
    Route::post('/auth/send-code', [AuthController::class, 'sendVerificationCode'])->name('auth.send-code');
    Route::post('/auth/register', [AuthController::class, 'register'])->name('auth.register');
    Route::post('/auth/verify', [AuthController::class, 'verify'])->name('auth.verify');
    Route::post('/auth/login', [AuthController::class, 'login'])->name('auth.login');
});

// Защищенные маршруты
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('/dashboard/email/request', [DashboardController::class, 'requestEmailChange'])->name('dashboard.email.request');
    Route::post('/dashboard/email/verify', [DashboardController::class, 'verifyEmailChange'])->name('dashboard.email.verify');
    Route::post('/logout', [LogoutController::class, 'destroy'])->name('logout');
});
