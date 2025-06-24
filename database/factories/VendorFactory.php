<?php

namespace Database\Factories;

use App\Models\Service\Service;
use App\Models\Specialization;
use App\Models\Vendor;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vendor>
 */
class VendorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
        ];
    }


    public function programmer(): static
    {
        return $this->afterCreating(function (Vendor $vendor) {
            $vendor->specialities()->attach([Specialization::query()->first()->id]);
        });
    }
    public function withSpeciality(): static
    {
        return $this->afterCreating(function (Vendor $vendor) {
            $vendor->specialities()->attach([Specialization::query()->inRandomOrder()->first()->id]);
        });
    }

    public function withServices(int $serviceCount=1): static
    {
        return $this->has(Service::factory()->count($serviceCount)->active()->withCategory()->withContent(),'services');
    }


    public function activateService(): static
    {
        return $this->afterCreating(function (Vendor $vendor) {
            $vendor->services()->each(function (Service $service) {
                $service->activateService();
            });
        });
    }



}
