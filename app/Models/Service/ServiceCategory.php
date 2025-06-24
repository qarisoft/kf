<?php

namespace App\Models\Service;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceCategory extends Model
{
    /** @use HasFactory<\Database\Factories\Service\ServiceCategoryFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'is_active',
        'is_sub',
        'parent_category_id',
        'svg'
    ];
}
