<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class TransactionController extends Controller
{
    public function getTransactions(Request $request) {
        $validator = Validator::make($request->all(), [
            'from' => 'date',
            'to' => 'date',
            'type' => [Rule::in(Transaction::$types)],
        ]);
        if ($validator->fails())
            return response()->json(['status' => 'error', 'message' => $validator->errors()->first()]);
        
        $transactions = Transaction::select('id','amount', 'type', 'at', 'description');
        if ($request->from)
            $transactions->where('at', '>', $request->from);
        if ($request->to)
            $transactions->where('at', '<', $request->to);
        if ($request->type)
            $transactions->where('type', $request->type);
        $transactions = $transactions->get();
        return response()->json(['status' => 'ok', 'data' => ['transactions' => $transactions]]);
    }

    public function addTransaction(Request $request) {
        $validator = Validator::make($request->all(), [
            'amount' => 'required|numeric',
            'description' => 'required',
            'type' => ['required', Rule::in(Transaction::$types)],
            'at' => 'required|date',
        ]);
        if ($validator->fails())
            return response()->json(['status' => 'error', 'message' => $validator->errors()->first()]);
        
        $transaction = Transaction::create([
            'amount' => $request->amount,
            'description' => $request->description,
            'type' => $request->type,
            'at' => $request->at,
        ]);
        return response()->json(['status' => 'ok', 'message' => 'با موفقیت ثبت شد', 'data' => ['transaction' => $transaction]]);
    }

    public function deleteTransaction($id) {
        Transaction::where('id', $id)->delete();
        return response()->json(['status' => 'ok', 'message' => 'با موفقیت حذف شد']);
    }
}
