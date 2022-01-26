<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PasswordReset extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'hash', 'used'
    ];

    protected static function booted()
    {
        static::addGlobalScope('notUsed', function (Builder $builder) {
            $builder->where('created_at', '>', now()->subMinutes(20))->where('used', '=', 0);
        });
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
