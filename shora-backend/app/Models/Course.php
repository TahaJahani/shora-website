<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name', 'course_number'
    ];

    public function semesters() {
        return $this->hasMany(CourseSemester::class);
    }
}
