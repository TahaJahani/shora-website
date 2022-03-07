<?php

namespace App\Http\Controllers;

use App\Models\ReportProblem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ReportController extends Controller
{
    public function addReport(Request $request) {
        $validator = Validator::make($request->all(), [
            'reportable_type' => ['required', Rule::in(ReportProblem::$REPORTABLE_TYPES)],
            'reportable_id' => 'required|numeric|min:1',
            'description' => 'string',
        ]);
        if ($validator->fails())
            return response()->json(['status' => 'error', 'message' => $validator->errors()->first()]);
        $user_id = Auth::id();
        $reportable_class = 'App\Models\\' . ucfirst($request->reportable_type);
        ReportProblem::create([
            'user_id' => $user_id,
            'description' => $request->description ?? null,
            'reportable_id' => $request->reportable_id,
            'reportable_type' => $reportable_class,
        ]);
        return response()->json(['status' => 'ok', 'message' => 'با تشکر از ثبت نظر شما']);
    }
}
