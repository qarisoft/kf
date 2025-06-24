<?php

namespace Database\Seeders;

use App\Enums\UserType;
use App\Models\Profile;
use App\Models\Service\Service;
use App\Models\Service\ServiceCategory;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Vendor;
use Database\Seeders\Service\ServiceCategorySeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{

    public function run(): void
    {
        $this->createAdmins();
        $this->call(SpecializationSeeder::class);
        $this->call(ServiceCategorySeeder::class);



        //
        $this->createVendors();

//        User::factory(200)
//            ->vendor()
//            ->has(Vendor::factory()->withServices()->programmer())
//            ->create();


    }






    private function createAdmins(): void
    {
        User::factory()
        ->admin()
        ->has(Profile::factory())
        ->create([
            'email' => 'admin@t.t',
        ]);

    }

    public function createVendors(): void
    {

        $u=
            User::factory()
            ->has(Profile::factory()->vendor())
            ->has(Vendor::factory()->withServices()->programmer()->activateService())
            ->create(['email' => 'vendor@t.t',]);


//        var_dump($u->vendor->services);
//          $u->vendor->services->each(function (Service $service) {
//              $service->activateService();
//          });


    }
}
