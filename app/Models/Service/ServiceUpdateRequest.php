<?php

namespace App\Models\Service;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServiceUpdateRequest extends Model
{
    /** @use HasFactory<\Database\Factories\Service\ServiceUpdateRequestFactory> */
    use HasFactory;

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function content(): BelongsTo
    {
        return $this->belongsTo(ServiceContent::class);
    }
}
