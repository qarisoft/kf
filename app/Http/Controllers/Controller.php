<?php

namespace App\Http\Controllers;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
abstract class Controller
{
    public function paginate(Builder $model): LengthAwarePaginator
    {
        $page = request()->query('page');
        $perPage = request()->query('perPage') ;
        $search = request()->query('search');
        $filters = request()->query('fltrs');
        $model->search($search);

        if ($filters) {
            $model->whereAll([$filters], true);
        }
        return $model->paginate($perPage, page: $page);

    }

    public function scopeVendor(Builder $model): Builder
    {
        $vendor_id = request()->user()->vendor->id;
        return $model->whereHas('vendor', function ($query) use ($vendor_id) {
            $query->where('id', $vendor_id);
        });
    }


    public function success(string $msg): void
    {
        request()->session()->flash('success', __($msg) . '!');
    }
    public function failure(string $msg): void
    {
        request()->session()->flash('failure', __($msg) . '!');
    }
}
