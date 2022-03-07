<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseSemester extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'course_id', 'teacher', 'group_number', 'semester', 'color',
    ];

    public function course() {
        return $this->belongsTo(Course::class);
    }

    public function assignments() {
        return $this->hasMany(Assignment::class);
    }
}
