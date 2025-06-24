<?php

namespace App\Http\Controllers\Admin\Services;

use App\Http\Controllers\Controller;
use App\Models\Service\ServicePublishRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublishRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    static string $path='admin/services/publish-requests';
    public function index(): Response
    {
        return Inertia::render(self::$path.'/index', [
            'requests' => ServicePublishRequest::query()->paginate()
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
