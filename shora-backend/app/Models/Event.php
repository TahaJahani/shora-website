<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'start_at', 'finish_at', 'fee', 'gift', 'description',
    ];

    public function users() {
        return $this->belongsToMany(User::class, 'event_users');
    }

    public function payments() {
        return $this->morphMany(Payment::class, 'payable');
    }
}
