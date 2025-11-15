<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AuthController extends Controller
{
    /**
     * Показать страницу авторизации
     */
    public function show()
    {
        return Inertia::render('Auth');
    }

    /**
     * Отправка кода подтверждения на почту
     */
    public function sendVerificationCode(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
        ]);

        // Генерируем 4-значный код
        $verificationCode = str_pad((string) rand(0, 9999), 4, '0', STR_PAD_LEFT);

        // Сохраняем код в сессии
        $request->session()->put('registration_verification', [
            'email' => $validated['email'],
            'code' => $verificationCode,
        ]);

        // TODO: Отправить код на почту через SMTP
        // Mail::to($validated['email'])->send(new VerificationCodeMail($verificationCode));

        return back()->with([
            'verification_code' => $verificationCode, // Временно для тестирования
            'verification_sent' => true,
        ]);
    }

    /**
     * Регистрация пользователя
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
            'code' => ['required', 'string', 'size:4'],
        ]);

        // Проверяем код из сессии
        $verification = $request->session()->get('registration_verification');
        
        if (!$verification || 
            $verification['email'] !== $validated['email'] || 
            $verification['code'] !== $validated['code']) {
            return back()->withErrors([
                'code' => 'Неверный код подтверждения',
            ]);
        }

        // Создаем пользователя
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'email_verified' => true,
            'email_verified_at' => now(),
        ]);

        // Очищаем сессию
        $request->session()->forget('registration_verification');

        // Автоматически авторизуем пользователя
        Auth::login($user);

        return redirect('/dashboard');
    }

    /**
     * Подтверждение почты по коду
     */
    public function verify(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'code' => ['required', 'string', 'size:4'],
        ]);

        $user = User::where('email', $validated['email'])
            ->where('verification_code', $validated['code'])
            ->first();

        if (!$user) {
            return back()->withErrors([
                'code' => 'Неверный код подтверждения',
            ]);
        }

        $user->update([
            'email_verified' => true,
            'verification_code' => null,
            'email_verified_at' => now(),
        ]);

        // Автоматически авторизуем пользователя
        Auth::login($user);

        return redirect('/dashboard');
    }

    /**
     * Вход в систему
     */
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($validated, $request->boolean('remember'))) {
            $request->session()->regenerate();

            return redirect('/dashboard');
        }

        return back()->withErrors([
            'email' => 'Неверный email или пароль',
        ]);
    }

    /**
     * Выход из системы
     */
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
