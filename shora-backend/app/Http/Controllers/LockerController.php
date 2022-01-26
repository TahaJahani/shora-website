<?php

namespace App\Http\Controllers;

use App\Models\Locker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class LockerController extends Controller
{
    public function addLocker(Request $request) {
        $validator = Validator::make($request->all(), [
            'letter' => 'required|alpha|size:1',
            'number' => 'required|numeric',
        ]);
        if ($validator->fails())
            return response()->json(['status' => 'error', 'message' => $validator->errors()->first()]);
        $locker = Locker::create([
            'letter' => $request->letter,
            'number' => $request->number,
        ]);
        return response()->json(['status' => 'ok', 'message' => 'با موفقیت اضافه شد']);
    }

    public function getLockers(Request $request) {
        $className = Locker::class;
        $lockers = Locker::whereNotIn('lockers.id', function ($query) {
            $query->select('rentable_id')->from('rents')->where('rentable_type', Locker::class)
                ->whereNull('returned_at');
        })->get();
        return response()->json(['status' => 'ok', 'data' => ['lockers' => $lockers]]);
    }

    public function getLockersStatus(Request $request) {
        $lockers = Locker::with(['rents' => function($query) {
            $query->whereNull('returned_at');
        }, 'rents.user'])->get();
        return response()->json(['status' => 'ok', 'data' => ['lockers' => $lockers]]);
    }
}
