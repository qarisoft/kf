<?php

namespace App\Models;

use App\Traits\BelongsToUser;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Profile extends Model
{
    /** @use HasFactory<\Database\Factories\ProfileFactory> */
    use HasFactory,BelongsToUser;
    protected $fillable = [
        'user_id',
        'id_photos',
        'is_vendor',
        'phone_number'
    ];
    protected $casts = [
        'id_photos'=>'array',
        'is_vendor'=>'boolean',
    ];


    public function specializations(): BelongsToMany
    {
        return $this->belongsToMany(Specialization::class, 'profile_specialization');
    }

    public function isVendor(): bool
    {
        return $this->is_vendor;
    }

}
