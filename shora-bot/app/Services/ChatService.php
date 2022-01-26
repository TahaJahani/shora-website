<?php

namespace App\Services;

use App\Models\RequestGroup;
use Illuminate\Support\Facades\Log;

class ChatService {
    public static function subscribe($chat_id) {
        $model = RequestGroup::updateOrCreate([
            'chat_id' => strval($chat_id)
        ], [
            'chat_id' => strval($chat_id)
        ]);
        return $model->wasRecentlyCreated;
    }

    public static function unsubscribe($chat_id) {
        RequestGroup::where('chat_id', strval($chat_id))->delete();
    }
}