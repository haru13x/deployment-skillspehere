<?php
use App\Http\Controllers\AppliedWorkController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MasterController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
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
Route::post('/register', [UserController::class, 'store']);

Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth.token')->group(function () {
    Route::get('/get-task-details/{id}', [MasterController::class, 'details']);
    Route::post('/tasks', [MasterController::class, 'store']);
    Route::get('/get-tasks', [MasterController::class, 'index']);
    Route::get('/get-my-project', [MasterController::class, 'myProject']);
     Route::get('/get-my-task', [MasterController::class, 'myTask']);
    Route::get('/get-applied-project', [MasterController::class, 'AppliedList']);
    Route::post('/setting-up/profile', [UserController::class, 'store_profile']);
     Route::get('get-profile/{id}', [UserController::class, 'getProfile']);
     Route::post('store-profile-pic', [UserController::class, 'store_picture']);
    Route::post('/store-proposal', [AppliedWorkController::class, 'store']);
         Route::post('hire-applicant', [MasterController::class, 'hired']);
   Route::put('/instruction-progress/{id}', [MasterController::class, 'updateProgress']);

    Route::get('/get-applicants/{id}', [AppliedWorkController::class, 'index']);
    Route::get('/check-application-status/{id}', [AppliedWorkController::class, 'checkApplication']);
    Route::post('/add-work-instruction', [MasterController::class, 'addWorkInstruction']);
    Route::get('/get-instruction/{id}',[MasterController::class, 'getInstruction']);

});
