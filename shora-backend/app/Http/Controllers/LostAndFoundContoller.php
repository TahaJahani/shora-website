<?php

namespace App\Http\Controllers;

use App\Models\LostAndFound;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LostAndFoundContoller extends Controller
{
    public function getAll(Request $request) {
        $found = LostAndFound::notReturned()->get();
        return response()->json(['status' => 'ok', 'data' => ['lost_and_found' => $found]]);
    }

    public function add(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'found_in' => 'required',
            'found_at' => 'required|date',
        ]);

        if ($validator->fails())
            return response()->json(['status' => 'error', 'message' => $validator->errors()->first()]);

        $found = LostAndFound::create([
            'name' => $request->name,
            'found_in' => $request->found_in,
            'found_at' => $request->found_at,
        ]);

        return response()->json(['status' => 'ok', 'data' => ['lost_and_found' => $found]]);
    }

    public function remove($found_id) {
        LostAndFound::where('id', $found_id)->delete();
        return response()->json(['status' => 'ok']);
    }

    public function return($found_id) {
        LostAndFound::where('id', $found_id)->update(['returned_at' => now()]);
        return response()->json(['status' => 'ok']);
    }
}
