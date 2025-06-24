<?php

namespace Database\Seeders;

use App\Models\Specialization;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SpecializationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Specialization::factory()->createMany([
            ['name' => 'programmer','created_by' => 1],
            ['name' => 'marketing','created_by' => 1],
            ['name' => 'information technology','created_by' => 1],
            ['name' => 'teacher','created_by' => 1],
            ['name' => 'designer','created_by' => 1],
            ['name' => 'Data engineer','created_by' => 1],
            ['name' => 'cyber security','created_by' => 1],
            ['name' => 'front-end developer','created_by' => 1],
            ['name' => 'php developer','created_by' => 1],
        ]);
    }
}
