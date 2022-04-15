<?php

namespace App\Http\Controllers;

use App\Http\Resources\EventResource;
use App\Models\Event;
use App\Models\EventUser;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller
{
    public function add(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "name" => 'required',
            "start_at" => 'required|date',
            "finish_at" => 'required|date',
            "fee" => 'required|numeric|min:0',
            "gift" => 'required|numeric|min:0',
            "description" => 'required',
        ]);
        if ($validator->fails())
            return response()->json(['status' => 'error', 'message' => $validator->errors()->first()]);
        $event = Event::create([
            "name" => $request->name,
            "start_at" => $request->start_at,
            "finish_at" => $request->finish_at,
            "fee" => $request->fee,
            "gift" => $request->gift,
            "description" => $request->description,
        ]);
        $event->users = [];
        return response()->json(['status' => 'ok', 'data' => ['event' => $event]]);
    }

    public function delete($id)
    {
        $event = Event::with('users')->where('id', $id)->first();
        if (!$event)
            return response()->json(['status' => 'error', 'message' => 'رویداد پیدا نشد']);
        if (sizeof($event->users) > 0)
            return response()->json(['status' => 'error', 'message' => 'افرادی در این رویداد ثبت نام کرده‌اند. برای حذف آن با مدیر تماس بگیرید ']);
        $event->delete();
        return response()->json(['status' => 'ok', 'message' => 'با موفقیت حذف شد']);
    }

    public function edit(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "event_id" => 'required|numeric',
            "start_at" => 'date',
            "finish_at" => 'date',
            "fee" => 'numeric|min:0',
            "gift" => 'numeric|min:0',
        ]);
        $to_edit = $request->only(['name', 'start_at', 'finish_at', 'fee', 'gift', 'description']);
        if ($request->fee) {
            $num_registered = EventUser::where('event_id', $request->event_id)->count();
            if ($num_registered > 0)
                return response()->json(['status' => 'error', 'message' => 'این رویداد افراد شرکت کننده دارد و نمی‌توان هزینه آن‌را تغییر داد']);
        }
        Event::where('id', $request->event_id)->update($to_edit);
        return response()->json(['status' => 'ok', 'message' => 'با موفقیت ویرایش شد']);
    }

    public function getAll(Request $request)
    {
        $user = Auth::user();
        if ($user->tokenCan("owner") || $user->tokenCan("welfare")) {
            $events = Event::with([
                "users" => function ($query) {
                    $query->orderBy("event_users.id");
                },
                "payments" => function ($query) {
                    $query->join('users', 'users.id', 'payments.user_id')
                        ->where('payments.status', '10')
                        ->select('payments.id', 'payments.payable_id', 'payments.amount', 'users.name as name', 'users.surname as surname');
                },
                "anonymousPayments",
            ])->orderBy('start_at', 'DESC')->get();
        } else {
            $events = Event::with("users")->orderBy('start_at', 'DESC')->get();
        }

        return response()->json(['status' => 'ok', 'data' => ['events' => EventResource::collection($events)]]);
    }

    public function addUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'event_id' => 'required|numeric',
            'user_id' => 'required|numeric',
        ]);
        if ($validator->fails())
            return response()->json(['status' => 'error', 'message' => $validator->errors()->first()]);
        $userToRgister = User::where('id', $request->user_id)->first();
        $event = Event::where('id', $request->event_id)->first();
        if (!$userToRgister)
            return response()->json(['status' => 'error', 'message' => 'کاربر یافت نشد']);
        if (!$event)
            return response()->json(['status' => 'error', 'message' => 'رویداد یافت نشد']);

        EventUser::create([
            'event_id' => $request->event_id,
            'user_id' => $request->user_id,
        ]);
        if ($event->fee > 0) {
            $full_name = $userToRgister->name . ' ' . $userToRgister->surname;
            $event_name = $event->name;
            $description = "ثبت نام شخص $full_name در رویداد $event_name";
            $transaction = Transaction::create([
                'amount' => $event->fee,
                'description' => $description,
                'type' => Transaction::TYPE_DEPOSIT,
                'at' => now(),
            ]);
        }
        return response()->json(['status' => 'ok', 'message' => 'با موفقیت ثبت شد', 'data' => ['user' => $userToRgister]]);
    }

    public function enroll(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'event_id' => 'required|numeric|min:1',
        ]);
        if ($validator->fails())
            return response()->json(['status' => 'error', 'message' => $validator->errors()->first()]);
        EventUser::insertOrIgnore([
            'event_id' => $request->event_id,
            'user_id' => Auth::id(),
        ]);
        return response()->json(['status' => 'ok', 'message' => 'با موفقیت ثبت نام شدید']);
    }
}
