<?php

use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\DemandCategoryController;
use App\Http\Controllers\DemandController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\LockerController;
use App\Http\Controllers\LostAndFoundContoller;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\RentController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
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

Route::get('/info', function() {
    return phpinfo();
});

Route::prefix('/auth')->middleware('auth:sanctum')->group(function () {
    Route::post("/complete-info", [UserController::class, 'completeUserInfo']);
    Route::withoutMiddleware('auth:sanctum')->post('/send-reset-mail', [UserController::class, 'sendResetEmail']);
    Route::withoutMiddleware('auth:sanctum')->post('/reset-pass', [UserController::class, 'resetPassword']);
    Route::withoutMiddleware('auth:sanctum')->get('/check-login', [UserController::class, 'checkLogin']);
    Route::middleware('ability:admin,owner')->post('/register', [UserController::class, 'register']);
    Route::withoutMiddleware('auth:sanctum')->post('/login', [UserController::class, 'login']);
    Route::post('/change-password', [UserController::class, 'changePassword']);
    Route::post('/logout', [UserController::class, 'logout']);
    Route::middleware('ability:admin,owner')->get('/{student_number}', [UserController::class, 'getUser'])
        ->whereNumber('student_number');
});

Route::prefix('users')->middleware('auth:sanctum')->group(function() {
    Route::middleware('ability:admin,owner')->get('/', [UserController::class, 'getUsers']);
    Route::middleware('ability:financial,admin,owner')->get('/student-numbers', [UserController::class, 'getAllUsersStudentNumber']);
    Route::middleware('ability:owner,admin')->post('/ban/{id}', [UserController::class, 'banUser'])->whereNumber('id');
    Route::middleware('ability:owner,admin')->post('/unban/{id}', [UserController::class, 'unbanUser'])->whereNumber('id');
});

Route::prefix('rents')->middleware(['auth:sanctum', 'ability:owner,financial'])->group(function() {
    Route::get('/', [RentController::class, 'getRents']);
    Route::post('/add', [RentController::class, 'addRent']);
    Route::post('/return', [RentController::class, 'returnRent']);
});

Route::prefix('transactions')->middleware(['auth:sanctum', 'ability:owner,financial'])->group(function() {
    Route::get('/', [TransactionController::class, 'getTransactions']);
    Route::post('/add', [TransactionController::class, 'addTransaction']);
});

Route::prefix('lockers')->middleware(['auth:sanctum', 'ability:owner,financial'])->group(function() {
    Route::get('/', [LockerController::class, 'getLockers']);
    Route::get('/all', [LockerController::class, 'getLockersStatus']);
});

Route::prefix('books')->middleware(['auth:sanctum'])->group(function() {
    Route::middleware('ability:owner,financial')->get('data/{id}', [BookController::class, 'getData'])->whereNumber('id');
    Route::middleware('ability:owner,financial')->post('/', [BookController::class, 'add']);
});

Route::prefix('lost-and-found')->middleware(['auth:sanctum'])->group(function() {
    Route::get('/', [LostAndFoundContoller::class, 'getAll']);
    Route::middleware('ability:owner,admin,financial')->post('/', [LostAndFoundContoller::class, 'add']);
    Route::middleware('ability:owner,admin,financial')->delete('/{found_id}', [LostAndFoundContoller::class, 'remove'])->whereNumber('found_id');
    Route::middleware('ability:owner,admin,financial')->post('/{found_id}', [LostAndFoundContoller::class, 'return'])->whereNumber('found_id');
});

Route::prefix('events')->middleware(['auth:sanctum', 'ability:owner,welfare'])->group(function() {
    Route::get('/', [EventController::class, 'getAll']);
    Route::post('/', [EventController::class, 'add']);
    Route::delete('/{id}', [EventController::class, 'delete'])->whereNumber('id');
    Route::put('/', [EventController::class, 'edit']);
    Route::post('/register', [EventController::class, 'registerUser']);
});

Route::prefix('demands')->middleware(['auth:sanctum'])->group(function() {
    Route::get('/{id}', [DemandController::class, 'get'])->whereNumber('id');
    Route::get('/', [DemandController::class, 'getAll']);
    Route::post('/', [DemandController::class, 'addDemand']);
    Route::post('/like/{id}', [DemandController::class, 'likeDemand'])->whereNumber('id');
    Route::delete('/unlike/{id}', [DemandController::class, 'unlikeDemand'])->whereNumber('id');
    Route::middleware(['ability:owner,admin'])->post('/ban-user/{demand_id}', [DemandController::class, 'banUser'])->whereNumber('demand_id');
    Route::middleware(['ability:owner,admin'])->delete('/{id}', [DemandController::class, 'delete'])->whereNumber('id');
    Route::middleware(['ability:owner,admin'])->post('/status', [DemandController::class, 'changeStatus']);

    Route::prefix('categories')->group(function() {
        Route::get('/', [DemandCategoryController::class, 'get']);
    });
});

Route::prefix('/notifications')->middleware('auth:sanctum')->group(function() {
    Route::get('/', [NotificationController::class, 'getAll']);
    Route::middleware('ability:owner,admin')->post('/', [NotificationController::class, 'add']);
});

Route::prefix('/courses')->middleware('auth:sanctum')->group(function() {
    Route::get('/assignments', [AssignmentController::class, 'getAssignments']);
    Route::get('/', [AssignmentController::class, 'getCourses']);
    Route::post('/', [AssignmentController::class, 'addAssignment']);
});

Route::get('/install', function (Request $request) {
    if (!$request->password || $request->password != 'thisismysecurepassword')
        return response()->json(['message' => 'What The Hell Are You Doing?']);
    Artisan::call('migrate');
    echo Artisan::output();
    Artisan::call('db:seed');
    echo Artisan::output();
});