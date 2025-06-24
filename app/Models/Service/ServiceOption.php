<?php

namespace App\Models\Service;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServiceOption extends Model
{
    /** @use HasFactory<\Database\Factories\Service\ServiceOptionFactory> */
    use HasFactory;

    protected $fillable =[
        'name',
        'price',
        'hours'
    ];

    public function content(): BelongsTo
    {
        return $this->belongsTo(ServiceContent::class);
    }


}
