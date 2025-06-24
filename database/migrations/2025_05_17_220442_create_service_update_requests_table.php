<?php

use App\Models\Service\Service;
use App\Models\Service\ServiceContent;
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
        Schema::create('service_update_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(ServiceContent::class);
            $table->foreignIdFor(Service::class);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_update_requests');
    }
};
