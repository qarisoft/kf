<?php

namespace Database\Factories\Service;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service\ServiceContent>
 */
class ServiceContentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title'=>fake()->realText(40),
            'description'=>fake()->text(),
            'instructions'=>fake()->text(),
        ];
    }
}
