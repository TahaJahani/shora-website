<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\MissingValue;
use Illuminate\Support\Facades\Auth;

class EventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $user = Auth::user();
        $showUsers = $user->tokenCan("welfare") || $user->tokenCan("owner");
        $enrolled = false;
        foreach ($this->users as $enrolledUser) {
            if ($user->id == $enrolledUser->id) {
                $enrolled = true;
                break;
            }
        }
        $payments = $this->whenLoaded('payments');
        $anonymousPayments = $this->whenLoaded('anonymousPayments');
        if (!$payments instanceof MissingValue)
            $payments = $payments->merge($anonymousPayments);

        return [
            "id" => $this->id,
            "name" => $this->name,
            "start_at" => $this->start_at,
            "finish_at" => $this->finish_at,
            "fee" => $this->fee,
            "gift" => $this->gift,
            "description" => $this->description,
            "users" => $showUsers ? $this->users : [],
            "enrolled" => $enrolled,
            "payments" => PaymentResource::collection($payments),
        ];
    }
}
