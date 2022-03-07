<?php

namespace App\Services;

use Morilog\Jalali\Jalalian;

class SemesterService
{
    public static function getCurrentSemester() {
        $date = Jalalian::now();
        $month = $date->getMonth();
        $year = $date->getYear();
        $result = '';

        if ($month >= 1 && $month <= 3) {
            $year--;
            $result = $year . '2';
        }
        else if($month >= 4 && $month <= 6) {
            $year--;
            $result = $year . '3';
        }
        else if ($month >= 7 && $month <= 10) {
            $result = $year . '1';
        }
        else {
            $result = $year . '2';
        }
        return $result;
    }
}