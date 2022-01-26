<?php

namespace Database\Seeders;

use App\Models\Locker;
use Illuminate\Database\Seeder;

class LockerSeeder extends Seeder
{
    private $letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K' ,'L', 'N', 'O', 'P', 'Q'];
    private $numbers = [];

    public function __construct()
    {
        for ($i = 1; $i <= 3 ; $i++) {
            for ($j = 1 ; $j <= 4 ; $j++)
                array_push($this->numbers, $j * 10 + $i);
        }
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->letters as $letter) {
            foreach($this->numbers as $number){
                Locker::create([
                    'letter' => $letter,
                    'number' => $number,
                ]);
            }
        }
    }
}
