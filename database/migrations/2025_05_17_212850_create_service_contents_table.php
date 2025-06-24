<?php

use App\Models\Service\Service;
use App\Models\Service\ServiceCategory;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('service_contents', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->foreignIdFor(Service::class)->constrained('services');
            $table->text('description')->nullable();
            $table->string('main_image_url')->nullable();
            $table->text('youtube_url')->nullable();
            $table->text('instructions')->nullable();
            $table->double('price')->default(0);
            $table->double('time')->default(0);
            $table->string('time_unit')->default('hour');
//            hour day week month
            $table->timestamps();
        });


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_contents');
    }
//6465 912 045
//3021 324 410
};
