<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReportProblem extends Model
{
    use HasFactory;

    public static $REPORTABLE_TYPES = ['assignment'];

    protected $fillable = [
        'user_id', 'description', 'reportable_id', 'reportable_type',
    ];

    public function reportable() {
        return $this->morphTo();
    }
}
