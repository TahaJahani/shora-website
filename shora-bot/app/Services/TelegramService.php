<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TelegramService {

    const bot_token = '5124378277:AAGtaU5keojVefl8dDAmU4YwVYqaR1k2YYQ';

    public static function sendMessage($chat_id, $text) {
        $token = TelegramService::bot_token;
        $url = "https://api.telegram.org/bot$token/sendMessage";
        $resp = Http::post("https://api.telegram.org/bot$token/sendMessage", [
            'chat_id' => $chat_id,
            'text' => $text,
        ]);
        return;
    }
}