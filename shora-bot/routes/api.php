<?php

use App\Http\Controllers\MessageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/received/AAGtaU5keojVefl8dDAmU4YwVYqaR1k2YYQ', [MessageController::class, 'received']);

Route::post('/send/AAGtaU5keojVefl8dDAmU4YwVYqaR1k2YYQ', [MessageController::class, 'send']);

Route::get('/install', function (Request $request) {
    if (!$request->password || $request->password != 'thisismysecurepassword')
        return response()->json(['message' => 'What The Hell Are You Doing?']);
    Artisan::call('migrate');
    echo Artisan::output();
});