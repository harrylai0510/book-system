<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('Histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('userId')->constrained('Users')->onUpdate('cascade');
            $table->foreignId('bookId')->constrained('Books')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Histories');
    }
};
