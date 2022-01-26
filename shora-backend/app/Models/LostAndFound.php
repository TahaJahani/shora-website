<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LostAndFound extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name', 'found_in', 'found_at', 'retunred_at',
    ];

    public function scopeNotReturned($query) {
        $query->whereNull('returned_at');
    }
}
