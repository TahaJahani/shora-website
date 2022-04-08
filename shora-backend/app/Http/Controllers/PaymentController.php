<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Payment;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Morilog\Jalali\Jalalian;

class PaymentController extends Controller
{
    private $origins = [
        'event' => "رویداد",
    ];

    public function newPayment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'amount' => 'required|numeric|min:1000|max:500000000',
            'origin' => ['required', Rule::in($this->origins)],
            'origin_id' => 'required|numeric|min:1',
        ]);
        if ($validator->fails())
            return response()->json(['status' => 'error', 'message' => $validator->errors()->first()]);
        $relatedModel = null;
        if ($request->origin === $this->origins['event']) {
            $relatedModel = Event::class;
        } //TODO: add other origins...

        if (!$relatedModel)
            return response()->json(['status' => 'error', 'message' => 'bad origin']);
        $relatedModel = $relatedModel::where('id', $request->origin_id)->first();
        if (!$relatedModel)
            return response()->json(['status' => 'error', 'message' => 'origin not found']);
        $description = "پرداخت برای " . $request->origin . " به شناسه‌ی " . $request->origin_id . " در تاریخ " . Jalalian::now();
        $user = Auth::user();
        $payment = Payment::create([
            'amount' => $request->amount,
            'user_id' => $user->id,
            'description' => $description,
        ]);
        if (!$payment)
            return response()->json(['status' => 'error', 'message' => 'خطایی هنگام ایجاد تراکنش رخ داده. دوباره تلاش کنید']);


        $response = Http::withHeaders([
            "X-API-KEY" => "0bd8a496-ce9d-485f-9f44-2ee1f77cf662",
            "X-SANDBOX" => "true",
        ])->post("https://api.idpay.ir/v1.1/payment", [
            "order_id" => $payment->id,
            "amount" => $payment->amount,
            "mail" => $user->email,
            "desc" => $payment->description,
            "callback" => "https://taha7900.ir/shora/payments/finish",
        ]);

        if ($response->ok()) {
            $response = $response->json();
            $payment->link = $response['link'];
            $payment->idpay_id = $response['id'];
            $payment->save();
            return response()->json(['status' => 'ok', 'data' => ['payment' => $payment]]);
        } else
            return response()->json(['status' => 'error', 'message' => 'خطایی هنگام ایجاد تراکنش رخ داده. دوباره تلاش کنید']);
    }

    public function completePayment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|numeric',
            'track_id' => 'required|numeric',
            'id' => 'required|numeric',
            'order_id' => 'required|string',
            'amount' => 'required|numeric',
            'card_no' => 'required|string',
            'hashed_card_no' => 'required|string',
            'date' => 'required|timestamp',
        ]);
        if ($validator->fails())
            return response()->json(['status' => 'error', 'message' => $validator->errors()->first()]);
        $isPaid = Payment::where('track_id', $request->track_id)
            ->orWhere('idpay_id', $request->id)->exists();
        if ($isPaid)
            return response()->json(['status' => 'error', 'message' => 'این تراکنش قبلا پایان یافته است']);
        $response = Http::post("https://api.idpay.ir/v1.1/payment/verify", [
            "id" => $request->id,
            "order_id" => $request->order_id,
        ]);
        if ($response->ok()) {
            $payment = Payment::where('id', $request->order_id)->first();
            $payment->update([
                "status" => $request->status,
                'track_id' => $request->track_id,
                'amount' => $request->amount,
                'card_no' => $request->card_no,
                'hashed_card_no' => $request->hashed_card_no,
                'paid_at' => $request->date,
                'verified_at' => now(),
            ]);
            Transaction::create([
                'amount' => $request->amount,
                'description' => $payment->description . ' از طرف کاربر به شناسه‌ی ' . $payment->user_id,
                'type' => Transaction::TYPE_DEPOSIT,
                'at' => now(),
            ]);
            return redirect("https://shora.taha7900.ir/home");
        } else {
            return response()->json(['status' => 'error', 'message' => 'مشکلی در پرداخت پیش آمده. مبلغ به حساب شما باز خواهد گشت']);
        }
    }

    public function myPayments(Request $request)
    {
        $user_id = Auth::id();
        $payments = Payment::where('user_id', $user_id)->whereNotNull('track_id')->get();
        return response()->json(['status' => 'ok', 'data' => ['payments' => $payments]]);
    }
}
