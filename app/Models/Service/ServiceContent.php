<?php

namespace App\Models\Service;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\InteractsWithMedia;

class ServiceContent extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\Service\ServiceContentFactory> */
    use HasFactory,InteractsWithMedia;


    protected $with=['media'];

    public function registerMediaConversions(?Media $media = null): void
    {
        $this
            ->addMediaConversion('preview')
            ->fit(Fit::Contain, 300, 300)
            ->nonQueued();
    }

//    public function a()
//    {
//        $this->getMedia();
//    }

    protected $fillable = [
        'title',
        'description',
        'main_image_url',
        'youtube_url',
        'time',
        'time_unit',
        'price',
        'instructions',
        'service_id',

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
