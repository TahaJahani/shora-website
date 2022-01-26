<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rent extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'rentable_type', 'rentable_id',
        'user_id', 'amount_paid', 'amount_returned',
        'rented_at', 'returned_at', 'return_deadline'
    ];

    public static $types = [Locker::class, Book::class];
    public static $frontTypes = ['locker', 'book'];

    public static function mapType($type) {
        $map = [
            'locker' => Locker::class,
            'book' => Book::class,
        ];
        return $map[$type];
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function rentable() {
        return $this->morphTo();
    }
}
