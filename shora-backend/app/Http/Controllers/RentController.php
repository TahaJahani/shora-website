<?php

namespace App\Http\Controllers;

use App\Models\Locker;
use App\Models\Rent;
use App\Models\User;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class RentController extends Controller
{
    public function getRents(Request $request)
    {
        $rents = Rent::with('user', 'rentable')->whereNull('returned_at')->get();
        return response()->json(['status' => 'ok', 'data' => ['rents' => $rents]]);
    }

    public function addRent(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'rentable_type' => ['required', Rule::in(Rent::$frontTypes)],
            'rentable_id' => ['required', 'numeric'],
            'user_id' => ['required', 'numeric'],
            'amount_paid' => ['numeric', 'min:0'],
            'rented_at' => ['date'],
            'return_deadline' => ['required', 'date']
        ]);
        if ($validator->fails())
            return response()->json(['status' => 'error', 'message' => $validator->errors()->first()]);
        $rent_user = User::where('id', $request->user_id)->first();
        $rentable = (Rent::mapType($request->rentable_type))::where('id', $request->rentable_id)->first();
        if (!$rentable)
            return response()->json(['status' => 'error', 'message' => 'شماره لاکر / کتاب نادرست می‌باشد']);
        if (!$rent_user)
            return response()->json(['status' => 'error', 'message' => 'کاربری با این شماره وجود ندارد']);
        $rent = Rent::create([
            'rentable_id' => $request->rentable_id,
            'rentable_type' => Rent::mapType($request->rentable_type),
            'user_id' => $request->user_id,
            'amount_paid' => $request->amount_paid ?? 0,
            'rented_at' => $request->rented_at ?? now()->toDateString(),
            'return_deadline' => $request->return_deadline,
        ]);
        if ($request->amount_paid) {
            $rent_user_name = $rent_user->name . ' ' . $rent_user->surname;
            $rentable_number = $rentable instanceof Locker ? $rentable->letter . $rentable->number : $rentable->id;
            $description = "پرداخت ودیعه شخص $rent_user_name برای کرایه‌ی $rentable_number";
            $transaction = Transaction::create([
                'amount' => $request->amount_paid,
                'description' => $description,
                'type' => Transaction::TYPE_DEPOSIT,
                'at' => $request->rented_at ?? now()->toDateString(),
            ]);
        }
        $rent['user'] = $rent_user;
        $rent['rentable'] = $rentable;
        return response()->json(['status' => 'ok', 'message' => 'با موفقیت اضافه شد', 'data' => ['rent' => $rent]]);
    }

    public function returnRent(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'rent_id' => 'required|numeric',
            'returned_at' => 'required|date',
            'amount_returned' => 'required|numeric|min:0',
        ]);
        if ($validator->fails())
            return response()->json(['status' => 'error', 'message' => $validator->errors()->first()]);
        $updated = Rent::where('id', $request->rent_id)
            ->whereNull('returned_at')->update([
                'returned_at' => $request->returned_at,
                'amount_returned' => $request->amount_returned,
            ]);

        if ($request->amount_returned && $updated) {
            $rent_id = $request->rent_id;
            $description = "بازگشت ودیعه کرایه شماره $rent_id";
            $transaction = Transaction::create([
                'amount' => $request->amount_returned,
                'description' => $description,
                'type' => Transaction::TYPE_WITHDRAW,
                'at' => $request->returned_at,
            ]);
        }
        return response()->json(['status' => 'ok', 'message' => 'با موفقیت ثبت شد']);
    }
}
