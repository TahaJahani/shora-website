<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookController extends Controller
{
    public function add(Request $request) {
        $validator = Validator::make($request->all(), [
            'id' => 'required|numeric|min:0',
            'name' => 'required|string',
            'bookcase' => 'required|string',
            'shelf' => 'required|numeric',
            'pages' => 'required|numeric|min:1'
        ]);
        if ($validator->fails())
            return response()->json(['status' => 'error', 'message' => $validator->errors()->first()]);
        $book = Book::find($request->id);
        if ($book)
            return response()->json(['status' => 'error', 'message' => 'شماره کتاب تکراری است']);
        $book = Book::create($request->only(['id', 'name', 'bookcase', 'shelf', 'pages']));
        return response()->json(['status' => 'ok', 'data' => ['book' => $book]]);
    }

    public function getData($id) {
        $book = Book::with('rents', 'rents.user')->find($id);
        if ($book)
            return response()->json(['status' => 'ok', 'data' => ['book' => $book]]);
        return response()->json(['status' => 'error', 'message' => 'کتاب با این شماره یافت نشد']);
    }

    public function getAll() {
        return response()->json(['status' => 'error', 'message' => 'کارگران مشغول کارند']);
    }
}
