<?php

namespace Database\Factories\Service;

use App\Models\Service\Service;
use App\Models\Service\ServiceCategory;
use App\Models\Service\ServiceContent;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service\Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [

        ];
    }


    public function active(): static
    {
        return $this->state(fn() => ['is_active' => true]);
    }

    public function categoryOf(ServiceCategory $serviceCategory): static
    {
        return $this->afterMaking(
            fn(Service $service) => $service->category()->associate($serviceCategory)
        );
    }

    public function withCategory(?ServiceCategory $category = null): static
    {
        return $this
                ->categoryOf($category ?? ServiceCategory::query()->first());
    }


    public function withContent(): static
    {
        return  $this->has(ServiceContent::factory(),'contentHistory');
    }

//    public function endWithContent()
//    {
//
//    }

}
