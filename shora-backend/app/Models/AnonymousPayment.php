<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnonymousPayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'payable_id',
        'payable_type',
        'track_id',
        'idpay_id',
        'payment_track_id',
        'amount',
        'payer_name',
        'payer_email',
        'payer_phone_number',
        'description',
        'card_no',
        'hashed_card_no',
        'paid_at',
        'gateway_link',
    ];

    public function payable() {
        return $this->morphTo();
    }
}
