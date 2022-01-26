<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Locker extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'letter',
        'number',
    ];

    public function rents() {
        return $this->morphMany(Rent::class, 'rentable');
    }
}
