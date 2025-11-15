<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Личный кабинет
     */
    public function index()
    {
        return Inertia::render('Dashboard', [
            'user' => auth()->user(),
        ]);
    }

    /**
     * Запрос на смену почты (отправка кода)
     */
    public function requestEmailChange(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
        ]);

        $user = $request->user();

        // Генерируем 4-значный код
        $verificationCode = str_pad((string) rand(0, 9999), 4, '0', STR_PAD_LEFT);

        // Сохраняем новый email и код во временное поле (или можно использовать отдельную таблицу)
        // Для простоты сохраняем в verification_code и используем новое поле new_email
        // Но так как у нас нет поля new_email, используем сессию или создадим миграцию
        // Пока используем простое решение - сохраняем код, а новый email передадим при проверке

        // TODO: Отправить код на новую почту через SMTP
        // Mail::to($validated['email'])->send(new EmailChangeVerificationCodeMail($verificationCode));

        // Сохраняем код в сессии вместе с новым email
        $request->session()->put('email_change', [
            'new_email' => $validated['email'],
            'code' => $verificationCode,
        ]);

        return back()->with([
            'verification_code' => $verificationCode, // Временно для тестирования
            'new_email' => $validated['email'],
        ]);
    }

    /**
     * Подтверждение смены почты по коду
     */
    public function verifyEmailChange(Request $request)
    {
        $validated = $request->validate([
            'code' => ['required', 'string', 'size:4'],
        ]);

        $user = $request->user();
        $emailChange = $request->session()->get('email_change');

        if (!$emailChange || $emailChange['code'] !== $validated['code']) {
            return back()->withErrors([
                'code' => 'Неверный код подтверждения',
            ]);
        }

        // Меняем почту
        $user->update([
            'email' => $emailChange['new_email'],
            'email_verified' => true,
            'email_verified_at' => now(),
        ]);

        // Очищаем сессию
        $request->session()->forget('email_change');

        return redirect('/dashboard')->with('success', 'Почта успешно изменена');
    }
}
