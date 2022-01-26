<?php

namespace App\Http\Controllers;

use App\Models\RequestGroup;
use App\Services\ChatService;
use App\Services\TelegramService;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Log;

class MessageController extends Controller
{
    private $commands = [
        '/subscribe@shora_cesharif_bot' => 'handleSubscribe',
        '/subscribe' => 'handleSubscribe',
        '/unsubscribe' => 'handleUnsubscribe',
    ];

    public function received(Request $request) {
        Log::info($request);
        try {
            $message = $request->message ?? $request->channel_post;
            $type = ($message)['entities'][0]['type'];
            $text = ($message)['text'];
            if (array_key_exists($text, $this->commands)) {
                $method = $this->commands[$text];
                $this->$method($message);
            }
        }catch (Exception $e) {
            Log::info($e);
        }
        return response()->json(['message' => 'ok']);
    }

    private function handleSubscribe($message) {
        $chat_id = $message['chat']['id'];
        if (ChatService::subscribe($chat_id))
            TelegramService::sendMessage($chat_id, "باشه سابسکرایب شد");
        else
            TelegramService::sendMessage($chat_id, "چند بار دیگه میگی؟");
    }

    private function handleUnsubscribe($message) {
        $chat_id = $message['chat']['id'];
        ChatService::unsubscribe($chat_id);
    }

    public function send(Request $request) {
        $body = $request->body;
        $id = $request->id;
        $text = "درخواست شماره $id:\n\n";
        $text .= $body;
        $text .= "\n\n\nاین درخواست در سایت شورای صنفی دانشکده کامپیوتر ثبت شده است\n";
        $text .= 'https://shora.taha7900.ir';

        $groups = RequestGroup::get();
        foreach($groups as $group) {
            Log::info("Group Id Is " . $group->chat_id);
            TelegramService::sendMessage($group->chat_id, $text);
        }
        return response()->json(['status' => 'ok']);
    }
}
