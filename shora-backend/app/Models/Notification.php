<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Notification extends Model
{
    use HasFactory, SoftDeletes;

    public const INFO = 'info';
    public const ALERT = 'alert';
    public static $SEVERITY = ['info', 'alert'];

    protected $fillable = [
        'body', 'creator_user_id', 'severity'
    ];

    public function creatorUser() {
        return $this->belongsTo(User::class, 'creator_user_id');
    }
}
