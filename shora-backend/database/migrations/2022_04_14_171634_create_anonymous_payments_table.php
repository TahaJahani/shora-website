<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnonymousPaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('anonymous_payments', function (Blueprint $table) {
            $table->id();
            $table->morphs('payable');
            $table->string('idpay_id');
            $table->string('track_id');
            $table->string('payment_track_id');
            $table->unsignedBigInteger('amount');
            $table->string('payer_name')->nullable();
            $table->string('payer_email')->nullable();
            $table->string('payer_phone_number')->nullable();
            $table->string('description')->nullable();
            $table->string('card_no');
            $table->string('hashed_card_no');
            $table->timestamp('paid_at');
            $table->string('gateway_link');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('anonymous_payments');
    }
}
