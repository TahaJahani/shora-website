<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\Course;
use App\Models\CourseSemester;
use App\Services\SemesterService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class AssignmentController extends Controller
{
    public function getAssignments() {
        $current_semester = SemesterService::getCurrentSemester();
        $courses = CourseSemester::with('assignments')->has('assignments')
            ->join('courses', 'courses.id', 'course_semsters.course_id')
            ->where('course_semesters.semester', '=', $current_semester)
            ->select('course_semesters.*', 'courses.teacher', 'courses.name');
        return response()->json(['status' => 'ok', 'data' => ['courses' => $courses]]);
    }

    public function addAssignment(Request $request) {
        $validator = Validator::make($request->all(), [
            'course_semester_id' => 'required|numeric|min:1',
            'type' => ['required', Rule::in(Assignment::$TYPES)],
            'release_date' => 'required|date',
            'due_date' => 'required|date',
            'link' => 'string',
        ]);
        if ($validator->fails())
            return response()->json(['status' => 'error', 'message' => $validator->errors()->first()]);
        
        $user_id = Auth::id();
        $course_semester = CourseSemester::find($request->course_semester_id);
        if (!$course_semester)
            return response()->json(['status' => 'error', 'message' => 'درس مورد نظر یافت نشد']);
        $assignment = $course_semester->assignments()->create([
            'user_id' => $user_id,
            'release_date' => $request->release_date,
            'due_date' => $request->due_date,
            'type' => $request->type,
            'link' => $request->link ?? null,
        ]);
        return response()->json(['status' => 'ok', 'data' => ['assignment' => $assignment]]);
    }
}
