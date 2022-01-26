<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Exception;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // User::create([
        //     'name' => 'محمد طه',
        //     'surname' => 'جهانی نژاد',
        //     'email' => 'jahaninezhad@ce.sharif.edu',
        //     'student_number' => '98101363',
        //     'phone_number' => '09367642209',
        //     'password' => Hash::make('mohammad79'),
        // ]);

        $csv_file = storage_path() . '/Users.csv';
        $data = $this->readCSV($csv_file);
        foreach ($data as $user) {
            try {
                $created = User::create([
                    'name' => '',
                    'surname' => '',
                    'email' => $user[1] . '@ce.sharif.edu',
                    'student_number' => $user[0],
                    'password' => '',
                ]);
                $created->roles()->create([
                    'role' => Role::user,
                ]);
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
}
