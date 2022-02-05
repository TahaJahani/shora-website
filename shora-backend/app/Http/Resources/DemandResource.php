<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class DemandResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $is_liked = false;
        $userId = Auth::id();
        $count = 0;
        if ($this->likes) {
            foreach ($this->likes as $like) {
                if ($like->user_id == $userId) {
                    $is_liked = true;
                    break;
                }
            }
            $count = sizeof($this->likes);
        }

        return [
            'id' => $this->id,
            'status' => $this->status,
            'body' => $this->body,
            'likes_count' => $count,
            'is_liked' => $is_liked,
            'category' => $this->category ? $this->category['name'] : '',
            'created_at' => $this->created_at,
        ];
    }
}
