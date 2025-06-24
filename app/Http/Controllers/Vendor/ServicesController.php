<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\Service\Service;
use App\Models\Service\ServiceCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ServicesController extends Controller
{
    /**
     * Display a listing of the resource.
     */


    private string $path='vendor/services';
    public function index(): Response
    {
        return Inertia::render($this->path.'/index', [
            'pageData'=>$this->scopeVendor(Service::query()->with(['category']))->paginate()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render($this->path.'/create', [
            'categories'=>ServiceCategory::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
//        title: '',
//        description: '',
//        tags: [],
//        main_image_url: null,
//        hours: 1,
//        price: 0,
//        instructions: '',
//        timeUnit: 'hour',
//        youtube_url: '',
        $request->validate([
            'main_image_url'=>'required|image',
            'tags'=>'required|array',
            'title'=>'required|min:8',
            'description'=>'required',
            'price'=>'required',
            'hours'=>'required',
            'instructions'=>'required',
        ]);
        $a = $request->file('main_image_url');
        $imageName = time().'.'.$request->main_image_url->extension();
        $request->main_image_url->move(public_path('images'), $imageName);
        $user = $request->user();
        if ($user->vendor()->exists()) {

        $user->vendor()->services()->create([
            'main_image_url'=>'images/'.$imageName,

        ]);
        }




    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render($this->path.'/show', [
            'service'=>Service::query()->findOrFail($id)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {


        return Inertia::render($this->path.'/edit', [
            'service'=>Service::query()->findOrFail($id),
            'categories'=>ServiceCategory::query()->get()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
//        dd($request->file('main_image_url'));
//        $request->validate([
//            'title' => 'required',
//            'description' => 'required',
//            'main_image_url' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
//        ]);
//        $imageName = time().'.'.$request->main_image_url->extension();
//        $request->main_image_url->move(public_path('images'), $imageName);


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
