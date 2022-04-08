<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('amount')->min(1000)->max(500000000);
            $table->foreignId('user_id');
            $table->string('description');
            $table->string('link')->nullable();
            $table->string('idpay_id')->nullable();
            $table->unsignedSmallInteger('status')->default(1);
            $table->unsignedBigInteger('track_id')->nullable();
            $table->string('card_no')->nullable();
            $table->string('hashed_card_no')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('verified_at')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payments');
    }
}
