<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return 'Book System - Backend (PHP)';
});


Route::prefix('books')->group(function () {
    // Create, Read, Update, Delete
    Route::post('/',            [BookController::class, 'CreateABook']);
    Route::get('/',             [BookController::class, 'GetAllBooks']);
    Route::get('/{bookId}',     [BookController::class, 'GetOneBook']);
    Route::put('/{bookId}',     [BookController::class, 'UpdateABook']);
    Route::delete('/{bookId}',  [BookController::class, 'DeleteABook']);
});

Route::prefix('users')->group(function() {
    Route::post('/',            [UserController::class, 'createUser']);
    Route::get('/',             [UserController::class, 'getAllUsers']);
    Route::get('/{userId}',     [UserController::class, 'getUser']);
    Route::put('/{userId}',     [UserController::class, 'updateUser']);
    Route::delete('/{userId}',  [UserController::class, 'deleteUser']);
});

Route::prefix('histories')->group(function() {
    Route::post('/',                [HistoryController::class, 'createHistory']);
    Route::get('/',                 [HistoryController::class, 'getHistories']);
    Route::get('/{historyId}',      [HistoryController::class, 'getHistory']);
    // Route::put('/{historyId}',      [HistoryController::class, 'UpdateABook']);
    Route::delete('/{historyId}',   [HistoryController::class, 'deleteHistory']);
});

Route::prefix('auth')->group(function() {
    Route::post('/login',  [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
});