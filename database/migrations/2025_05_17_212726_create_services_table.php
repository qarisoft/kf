<?php

use App\Models\Service\ServiceCategory;
use App\Models\Service\ServiceContent;
use App\Models\Vendor;
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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->boolean('is_active')->default(false);
            $table->foreignIdFor(Vendor::class)->constrained('vendors');
            $table->foreignIdFor(ServiceCategory::class,'category_id')->nullable();
            $table->foreignIdFor(ServiceCategory::class,'sub_category_id')->nullable();
            $table->foreignId('service_content_id')->nullable();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
