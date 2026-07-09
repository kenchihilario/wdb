<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;

Route::apiResource('products',ProductController::class);
Route::get('/orders',[OrderController::class,'index']);
Route::post('/orders',[OrderController::class,'store']);
Route::get('/', function (Request $request) {
    return response()->json([
        'success' => true,
        'message' => 'Welcome to my backend',
        'data' => [
            'name' => 'Kenchi Hilario',
            'framework' => 'Laravel',
            'version' => app()->version(),
            'php' => PHP_VERSION,
            'host' => $request->getHttpHost(),
            'url' => $request->getSchemeAndHttpHost(),
            'timestamp' => now()->toDateTimeString(),
        ]
    ]);
});
