<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    public const user = 'user';
    public const admin = 'admin';
    public const owner = 'owner';
    public const welfare = 'welfare';
    public const financial = 'financial';

    public static $roles = [
        'owner', 'admin', 'financial', 'welfare','user',
    ];

    protected $fillable = [
        'role',
    ];
}
