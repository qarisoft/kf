<?php

use App\Enums\UserType;
use App\Http\Controllers\BalanceController;
use App\Http\Controllers\BuyingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified','has_profile'])->group(function () {
    Route::get('dashboard', function () {
        if (request()->user()->type == UserType::Admin) {
            return redirect()->route('admin.dashboard');
        }
        if (request()->user()->type == UserType::Vendor) {
            return redirect()->route('vendor.dashboard');
        }
        return Inertia::render('dashboard');
    })->name('dashboard');



    Route::resource('buying',BuyingController::class);
    Route::resource('balance',BalanceController::class);
});

require __DIR__ . '/admin/admin.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/vendor/vendor.php';
