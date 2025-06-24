<?php

namespace App\Models\Service;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ServiceContent extends Model
{
    /** @use HasFactory<\Database\Factories\Service\ServiceContentFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'main_image',
        'youtube_url',
        'hours',
        'price',
        'instructions',
    ];


    public function service(): HasOne
    {
        return $this->hasOne(Service::class);
    }

    public function options(): HasMany
    {
        return $this->hasMany(ServiceOption::class);
    }
}
