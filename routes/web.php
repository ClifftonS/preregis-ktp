<?php

use App\Http\Controllers\PraRegisController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', function () {
    return Auth::check() ? redirect()->route('dashboard') : redirect()->route('login');
});




Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/praregistrasi', function () {
        $user = Auth::user();
        if (!$user->nama) {
            return Inertia::render('PraRegistrasi');
        }

        return Inertia::render('PraRegistrasiDetail');
    })->name('praregistrasi');
    Route::get('/praregistrasidetail', function () {
        return Inertia::render('PraRegistrasiDetail');
    })->name('praregistrasidetail');
    Route::post('/praregistrasi', [PraRegisController::class, 'update'])->name('praregistrasi.update');
    Route::post('/praregistrasidetail', [PraRegisController::class, 'update2'])->name('praregistrasi.update2');
});

require __DIR__.'/auth.php';
