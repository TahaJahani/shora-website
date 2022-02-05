<?php

namespace App\Http\Controllers;

use App\Models\DemandCategory;
use Illuminate\Http\Request;

class DemandCategoryController extends Controller
{
    public function get() {
        $data = DemandCategory::all();
        return response()->json(['status' => 'ok', 'data' => ['categories' => $data]]);
    }
}
