<?php

namespace App\Http\Controllers;

use App\Http\Resources\DemandResource;
use App\Models\Demand;
use App\Models\Like;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

use function GuzzleHttp\Promise\all;

class DemandController extends Controller
{
    public function getAll(Request $request) {
        $validator = Validator::make($request->all(), [
            'search' => 'string',
        ]);

        if ($validator->fails())
            return response()->json(['status' => 'error', 'message' => $validator->errors()->first()]);
        
        $demands = Demand::with(['user', 'likes']);
        if ($request->search)
            $demands->where('body', 'LIKE', '%' . $request->search . '%');
        $demands = $demands->orderBy('created_at', 'DESC')->paginate($request->limit ?? 15);
        return response()->json(['status' => 'ok', 'data' => ['demands' => DemandResource::collection($demands), 
                'has_next' => $demands->hasMorePages(), 'last_page' => $demands->lastPage()]]);
    }

    public function addDemand(Request $request) {
        $validator = Validator::make($request->all(), [
            'body' => 'string'
        ]);

        if ($validator->fails())
            return response()->json(['status' => 'error', 'message' => $validator->errors()->first()]);

        $user = Auth::user();
        if ($user->is_banned)
            return response()->json(['status' => 'error', 'message' => 'حساب شما مسدود شده است. لطفا با مدیر وب‌سایت تماس بگیرید']);
        
        $demand = Demand::create([
            'user_id' => $user->id,
            'status' => Demand::PENDING,
            'body' => $request->body,
        ]);
        $demand->user = $user;
        $demand->likes = [];
        
        // Telegram Bot To Notif Groups
        // $body = $demand->body;
        // $id = $demand->id;
        // Http::post("http://bot.shora.taha7900.ir/api/send/AAGtaU5keojVefl8dDAmU4YwVYqaR1k2YYQ", [
        //     'body' => $body,
        //     'id' => $id,
        // ]);

        return response()->json(['status' => 'ok', 'data' => ['demand' => DemandResource::make($demand)]]);
    }

    public function banUser($deman_id) {
        $demand = Demand::find($deman_id);
        if (!$demand)
            return response()->json(['status' => 'error', 'messge' => 'درخواست مورد نظر یافت نشد']);
        User::where('id', $demand->user_id)->update([
            'is_banned' => true
        ]);
        return response()->json(['status' => 'ok']);
    }

    public function delete($id) {
        Demand::where('id', $id)->delete();
        return response()->json(['status' => 'ok']);
    }

    public function likeDemand($id) {
        $userId = Auth::id();
        $demandClass = addslashes(Demand::class);
        $demand = Demand::where('id', $id)
            ->whereRaw(DB::raw("id NOT IN (SELECT likeable_id FROM likes WHERE likeable_type = '$demandClass' AND likes.user_id = $userId AND likeable_id = $id)"))->first();
        if (!$demand)
            return response()->json(['status' => 'error', 'message' => 'درخواست مورد نظر یافت نشد']);

        $like = $demand->likes()->create([
            'user_id' => $userId,
        ]);

        return response()->json(['status' => 'ok', 'data' => ['like' => $like]]);
    }

    public function unlikeDemand($id) {
        $userId = Auth::id();
        Like::where('likeable_type', Demand::class)->where('likeable_id', $id)->where('user_id', $userId)->delete();
        return response()->json(['status' => 'ok']);
    }

    public function changeStatus(Request $request) {
        $validator = Validator::make($request->all(), [
            'demand_id' => 'required|numeric',
            'status' => ['required', Rule::in(Demand::$status)]
        ]);

        if ($validator->fails())
            return response()->json(['status' => 'error', 'message' => $validator->errors()->first()]);

        Demand::where('id', $request->demand_id)->update([
            'status' => $request->status,
        ]);

        return response()->json(['status' => 'ok']);
    }
}
