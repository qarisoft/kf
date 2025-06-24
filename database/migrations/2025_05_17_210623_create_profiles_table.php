<?php

use App\Models\Profile;
use App\Models\Specialization;
use App\Models\User;
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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained('users');
            $table->boolean('is_vendor')->default(false);
            $table->string('phone_number',9)->nullable();
            $table->json('id_photos')->nullable();
            $table->timestamps();
        });
        Schema::create('profile_specialization', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Specialization::class);
            $table->foreignIdFor(Profile::class);
        });



    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
