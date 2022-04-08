<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'phone_number',
        'email',
    ];

    protected $fillable = [
        'name',
        'surname',
        'email',
        'role',
        'student_number',
        'phone_number',
        'password',
        'is_banned'
    ];

    public function rents() {
        return $this->hasMany(Rent::class);
    }

    public function roles() {
        return $this->hasMany(Role::class);
    }

    public function registeredEvents() {
        return $this->belongsToMany(Event::class);
    }

    public function passwordResets() {
        return $this->hasMany(PasswordReset::class);
    }

    public function payments() {
        return $this->hasMany(Payment::class);
    }
}
