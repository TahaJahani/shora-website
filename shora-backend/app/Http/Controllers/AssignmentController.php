<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Models\Assignment;
use App\Models\Course;
use App\Models\CourseSemester;
use App\Models\UserSemesterCourse;
use App\Services\SemesterService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Morilog\Jalali\Jalalian;

class AssignmentController extends Controller
{
    public function getAssignments()
    {
        $current_semester = SemesterService::getCurrentSemester();
        $courses = CourseSemester::with('assignments')->has('assignments')
            ->join('courses', 'courses.id', 'course_semesters.course_id')
            ->leftJoin('user_semester_courses', function($join) {
                $join->on('user_semester_courses.course_semester_id', '=','course_semesters.id')
                    ->where('user_semester_courses.user_id', '=', Auth::id());
            })
            ->where('course_semesters.semester', '=', $current_semester)
            ->select('course_semesters.*', 'courses.name', 'courses.course_number', 'user_semester_courses.id as select')->get();
        return response()->json(['status' => 'ok', 'data' => ['courses' => CourseResource::collection($courses)]]);
    }

    public function getCourses()
    {
        $current_semester = SemesterService::getCurrentSemester();
        $courses = CourseSemester::join('courses', 'courses.id', 'course_semesters.course_id')
            ->where('course_semesters.semester', '=', $current_semester)
            ->select('course_semesters.*', 'courses.name', 'courses.course_number')->get();
        return response()->json(['status' => 'ok', 'data' => ['courses' => $courses]]);
    }

    public function addAssignment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'course_semester_id' => 'required|numeric|min:1',
            'type' => ['required', Rule::in(Assignment::$TYPES)],
            'release_date' => 'required|regex:/\d{4}-\d{2}-\d{2}/',
            'due_date' => 'required|regex:/\d{4}-\d{2}-\d{2}/',
            'link' => 'string',
            'description' => 'required|string',
        ]);
        if ($validator->fails())
            return response()->json(['status' => 'error', 'message' => $validator->errors()->first()]);

        $user_id = Auth::id();
        $course_semester = CourseSemester::find($request->course_semester_id);
        if (!$course_semester)
            return response()->json(['status' => 'error', 'message' => 'درس مورد نظر یافت نشد']);

        $assignment = $course_semester->assignments()->create([
            'user_id' => $user_id,
            'release_date' => Jalalian::fromFormat('Y-m-d', $request->release_date)->toCarbon(),
            'due_date' => Jalalian::fromFormat('Y-m-d', $request->due_date)->toCarbon(),
            'type' => $request->type,
            'link' => $request->link ?? null,
            'description' => $request->description,
        ]);
        return response()->json(['status' => 'ok', 'data' => ['assignment' => $assignment]]);
    }

    public function addCourseToUser($course_id)
    {
        try {
            UserSemesterCourse::create([
                'user_id' => Auth::id(),
                'course_semester_id' => $course_id,
            ]);
        } catch (Exception $e) {
        }
        return response()->json(['status' => 'ok']);
    }

    public function removeCourseFromUser($course_id)
    {
        UserSemesterCourse::where('user_id', Auth::id())->where('course_semester_id', $course_id)->delete();
    }
}
