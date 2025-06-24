<?php

namespace App\Models;

use App\Enums\UserType;
use App\Models\Service\Service;
use App\Traits\BelongsToUser;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vendor extends Model
{
    /** @use HasFactory<\Database\Factories\VendorFactory> */
    use HasFactory,BelongsToUser;


    public function specialities(): BelongsToMany
    {
        return $this->belongsToMany(Specialization::class,'specialization_vendor');
    }

    public function services(): HasMany
    {
        return   $this->hasMany(Service::class);
    }

    public function profile()
    {
        return $this->hasOne(Profile::class);
    }

    protected static function booted()
    {
        static ::created(function (Vendor $vendor) {
                $vendor->user->updateType(UserType::Vendor);
        });
    }
}
