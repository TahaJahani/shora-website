<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'amount',
        'user_id',
        'description',
        'link',
        'idpay_id',
        'status',
        'track_id',
        'card_no',
        'hashed_card_no',
        'paid_at',
        'verified_at',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
