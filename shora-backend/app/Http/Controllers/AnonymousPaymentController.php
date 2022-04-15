<?php

namespace App\Http\Controllers;

use App\Models\AnonymousPayment;
use App\Models\Event;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Log;

class AnonymousPaymentController extends Controller
{
    //this part should be moved to database
    private $gateway_links = [
        "https://idpay.ir/ramadan-shora-1400" => [
            "type" => Event::class,
            "id" => 1,
        ],
    ];
    private $types = [
        Event::class => 'رویداد',
    ];

    public function submit(Request $request, $password)
    {
        if ($password != 'thisismysecurepassword') {
            abort(404);
            return;
        }
        Log::build([
            'driver' => 'single',
            'path' => storage_path('logs/payments.log'),
        ])->info(json_encode($request->all())); //to ensure that no data is lost

        // this part oa code may not work, depending on the version on IdPay api
        $link = $request->gateway['link'];
        $type = $this->gateway_links[$link]['type'];
        $id = $this->gateway_links[$link]['id'];
        AnonymousPayment::create([
            'payable_id' => $id,
            'payable_type' => $type,
            'track_id' => $request->track_id,
            'idpay_id' => $request->id,
            'payment_track_id' => $request->payment['track_id'],
            'amount' => $request->amount,
            'payer_name' => $request->payer['name'],
            'payer_email' => $request->payer['mail'],
            'payer_phone_number' => $request->payer['phone'],
            'description' => $request->payer['desc'],
            'card_no' => $request->payment['card_no'],
            'hashed_card_no' => $request->payment['hashed_card_no'],
            'paid_at' => Date::createFromTimestamp($request->date),
            'gateway_link' => $link,
        ]);

        $description = 'کمک هزینه ' . $this->types[$type] . ' شماره ' . $id . ' از طرف ' . $request->payer['name'];
        Transaction::create([
            'amount' => floor(($request->amount) / 10),
            'description' => $description,
            'type' => Transaction::TYPE_DEPOSIT,
            'at' => now(),
        ]);
        return response()->json('OK');
    }
}
