<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function board(Request $request)
    {
        $user = $request->user();
        
        if (!$user) {
            // Для гостей показываем приветственную страницу
            return Inertia::render('Welcome', [
                'message' => 'Приложение работает корректно!',
            ]);
        }
        
        if ($user->role === 'buyer') {
            // Для покупателя показываем все доступные заказы (доска объявлений)
            $orders = Order::where('status', 'pending')
                ->whereNull('seller_id')
                ->with('buyer')
                ->latest()
                ->get();
        } else {
            // Для продавца показываем все доступные заказы
            $orders = Order::where('status', 'pending')
                ->whereNull('seller_id')
                ->with('buyer')
                ->latest()
                ->get();
        }
        
        return Inertia::render('Welcome', [
            'orders' => $orders,
        ]);
    }

    public function index(Request $request)
    {
        $user = $request->user();
        
        if ($user->role === 'buyer') {
            // Для покупателя показываем только его заказы
            $orders = Order::where('user_id', $user->id)
                ->with('seller')
                ->latest()
                ->get();
        } else {
            // Для продавца показываем только принятые заказы
            $orders = Order::where('seller_id', $user->id)
                ->with('buyer')
                ->latest()
                ->get();
        }
        
        return Inertia::render('Dashboard', [
            'orders' => $orders,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'subject' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'deadline' => ['required', 'date', 'after:today'],
        ]);

        $order = Order::create([
            'user_id' => $request->user()->id,
            'title' => $validated['title'],
            'subject' => $validated['subject'],
            'description' => $validated['description'],
            'deadline' => $validated['deadline'],
            'status' => 'pending',
        ]);

        return redirect('/')->with('success', 'Заказ успешно создан!');
    }

    public function accept(Request $request, Order $order)
    {
        if ($order->status !== 'pending' || $order->seller_id !== null) {
            return back()->with('error', 'Заказ уже принят другим продавцом');
        }

        $order->update([
            'seller_id' => $request->user()->id,
            'status' => 'accepted',
        ]);

        return redirect('/')->with('success', 'Заказ успешно принят!');
    }

    public function myAccepted(Request $request)
    {
        $orders = Order::where('seller_id', $request->user()->id)
            ->with('buyer')
            ->latest()
            ->get();

        return Inertia::render('SellerOrders', [
            'orders' => $orders,
        ]);
    }
}
