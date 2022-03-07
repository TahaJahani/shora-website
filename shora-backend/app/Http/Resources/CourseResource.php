<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'course_id' => $this->course_id,
            'teacher' => $this->teacher,
            'group_number' => $this->group_number,
            'semester' => $this->semester,
            'color' => $this->color,
            'name' => $this->name,
            'course_number' => $this->course_number,
            'selected' => $this->select ? true : false,
            'assignments' => $this->assignments,
        ];
    }
}
