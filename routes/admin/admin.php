<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\Services\CategoryController;
use App\Http\Controllers\Admin\Services\PublishRequestController;
use App\Http\Controllers\Admin\Services\ServiceController;
use App\Http\Controllers\Admin\Services\UpdateRequestController;
use App\Http\Controllers\Admin\Vendor\VendorController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified', AdminMiddleware::class])->group(function () {

    Route::name('admin.')->prefix('admin')->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
        //
        Route::name('services.')->prefix('services')->group(function () {
            Route::resource('/', ServiceController::class);
            Route::resource('categories', CategoryController::class);
            Route::resource('publish-requests', PublishRequestController::class);
            Route::resource('update-requests', UpdateRequestController::class);

        });

        //
        Route::name('vendors.')->prefix('vendors')->group(function () {
            Route::resource('', VendorController::class);
        });

    })->middleware([AdminMiddleware::class]);
});

