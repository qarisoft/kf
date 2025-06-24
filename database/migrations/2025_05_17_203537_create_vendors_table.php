<?php

use App\Models\Profile;
use App\Models\Specialization;
use App\Models\User;
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
        Schema::create('vendors', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained('users');
            $table->timestamps();
        });
        Schema::create('specialization_vendor', function (Blueprint $table) {
            $table->primary(['vendor_id', 'specialization_id']);
            $table->foreignIdFor(Specialization::class)->constrained('specializations');
            $table->foreignIdFor(Vendor::class)->constrained('vendors');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vendors');
    }
};
