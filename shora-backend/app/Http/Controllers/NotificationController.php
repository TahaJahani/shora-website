<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotificationResource;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class NotificationController extends Controller
{
    public function getAll() {
        $user = Auth::user();
        $lastSeen = $user->last_seen_notification_id;
        $data = Notification::select('notifications.*', 
            DB::raw("CASE WHEN notifications.id > $lastSeen THEN FALSE ELSE TRUE END AS seen"))->orderBy('id', 'DESC')->get();
        User::where('id', $user->id)->update(['last_seen_notification_id' => $data[0]->id]);
        return response()->json(['status' =>'ok', 'data' => ['notifications' => NotificationResource::collection($data)]]);
    }

    public function add(Request $request) {
        $validator = Validator::make($request-> all(), [
            'body' => 'required|string|max:500',
            'severity' => ['required', Rule::in(Notification::$SEVERITY)],
        ]);
        if ($validator->fails())
            return response()->json(['status' => 'error', 'message' => $validator->errors()->first()]);
        
        $notification = Notification::create([
            'body' => $request->body,
            'severity' => $request->severity,
            'creator_user_id' => Auth::id(),
        ]);

        return response()->json(['status' => 'ok', 'data' => ['notification' => NotificationResource::make($notification)]]);
    }

}
