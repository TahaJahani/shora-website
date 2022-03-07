<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
    use HasFactory;

    public static $TYPES = ['midterm', 'quiz', 'homework', 'final', 'project'];

    protected $fillable = [
        'user_id', 'release_date', 'due_date', 
        'course_semester_id', 'type', 'link', 'verified'
    ];

    public function courseSemester() {
        return $this->belongsTo(CourseSemester::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
