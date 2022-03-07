<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Services\SemesterService;
use Exception;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $csv_file = storage_path() . '/Courses.csv';
        $data = $this->readCSV($csv_file);
        $current_semester = SemesterService::getCurrentSemester();
        $last_created_id = 0;
        foreach ($data as $course) {
            try {
                $created = Course::create([
                    'name' => $course[2],
                    'course_number' => $course[0],
                ]);
                $semester = $created->semesters()->create([
                    'teacher' => $course[3],
                    'group_number' => $course[1],
                    'semester' => $current_semester,
                    'color' => $this->getColor($last_created_id),
                ]);
                $last_created_id = $semester->id;
            } catch (Exception $e) {
            }
        }   
    }

    public function readCSV($csvFile)
    {
        $file_handle = fopen($csvFile, 'r');
        while (!feof($file_handle)) {
            $line_of_text[] = fgetcsv($file_handle, 0, ',');
        }
        fclose($file_handle);
        return $line_of_text;
    }

    public function getColor($id) {
        $colors = [
            'E0BBE4',
            '957DAD',
            'D291BC',
            'FEC8D8',
            'FFDFD3',
            '97E5D7',
            'D2EBD8',
            'FCF1DD',
            'FFD4B8',
            'FEB7B3',
            'FDCACE',
            'FEF1EB',
            'D2E6D5',
            'D5C5E8',
            'FBE7C5',
            'F7D3BC',
            'F7D3BC',
            'F7E9C5',
            'D0D9A8',
            'A5CBAF',
            'D29DC0',
            '9CCBC0',
            '92A0CF',
            'FF9AA2',
            'FFB7B2',
            'FFDAC1',
            'E2F0CB',
            'B5EAD7',
            'C7CEEA',
            'E7CB71',
            'A9BD95',
            'F3D6A1',
            'FDB692',
            'C0A4A5',
            'F3CCB8',
            'F5E7C5',
            'A8C898',
            '7AB495',
            '877FD7',
            'E1A7CA',
        ];
        return $colors[$id % 40];
    }
}

