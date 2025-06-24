<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Specialization extends Model
{
    /** @use HasFactory<\Database\Factories\SpecializationFactory> */
    use HasFactory;
    protected $fillable=[
        'name',
        'created_by',
    ];

    static function search(string $str): Collection
    {
        return self::query()->whereLike('name','%'.$str.'%')->get();
    }
//    public function scopeSearch(Builder $q,string $name): void
//    {
//        $q->whereLike('name', '%'.$name.'%');
//    }
    public function profiles(): BelongsToMany
    {
        return $this->belongsToMany(Specialization::class, 'profile_specialization');
    }
}
