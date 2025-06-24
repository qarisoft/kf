<?php

namespace App\Traits;

use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait ActiveTrait
{
    public function scopeIsActive(): BelongsTo
    {

    }

}
