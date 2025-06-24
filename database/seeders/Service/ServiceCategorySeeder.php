<?php

namespace Database\Seeders\Service;

use App\Models\Service\ServiceCategory;
use Illuminate\Database\Seeder;

class ServiceCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        serviceCategory::factory()->active()->createMany([
            ['name' => 'marketing'],
            ['name' => 'programming'],
            ['name' => 'seo'],
            ['name' => 'social media'],
            ['name' => 'tiktok'],
        ]);
    }
}
