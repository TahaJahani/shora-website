<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transaction extends Model
{
    use HasFactory, SoftDeletes;

    public const TYPE_WITHDRAW = 'withdraw';
    public const TYPE_DEPOSIT = 'deposit';
    public static $types = ['withdraw', 'deposit'];

    protected $fillable = [
        'amount',
        'description',
        'type',
        'at',
    ];
}
