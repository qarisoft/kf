<?php

namespace App\Http\Controllers\Vendor;

use App\Events\ServiceCreated;
use App\Http\Controllers\Controller;
use App\Models\Service\Service;
use App\Models\Service\ServiceCategory;
use App\Models\Service\ServiceContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ServicesController extends Controller
{
    /**
     * Display a listing of the resource.
     */


    private string $path = 'vendor/services';
    public function index(): Response
    {

        //        Broadcast::broadcast(['hi'],'event',[
        //            'user'=>auth()->user(),
        //        ]);
        //        Broadcast::on('hi')->send();
        // ServiceCreated::dispatch(Service::first());

        return Inertia::render($this->path . '/index', [
            'pageData' => $this->scopeVendor(Service::query()->with(['category']))->paginate()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render($this->path . '/create', [
            'categories' => ServiceCategory::all(),
            'service' => ServiceContent::factory()->make()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            //            'main_image_url'=>'required|image',
            'service_category_id' => 'required|exists:service_categories,id',
            'title' => 'required|min:8',
            'description' => 'required',
            'price' => 'required',
            'time' => 'required',
            'time_unit' => 'required',
            'instructions' => 'required',
        ]);

        $user = $request->user();

        //        dd($user->vendor);

        $imageName = time() . '.' . $request->main_image_url?->extension();

        $request->main_image_url->move(public_path('images'), $imageName);



        if ($user->vendor()->exists()) {

            $s = $user->vendor->services()->create([
                'category_id' => $request->service_category_id
            ]);

            $c = ServiceContent::create([
                //                'main_image_url'=>$imageName,
                'title' => $request->title,
                'service_id' => $s->id,
                'price' => $request->price,
                'time' => $request->time,
                'time_unit' => $request->time_unit,
                'instructions' => $request->instructions,
                'youtube_url' => $request->youtube_url,
                'description' => $request->description
            ]);
            $c->addMedia(public_path('images/' . $imageName))->toMediaCollection('services');
            $s->update(['service_content_id' => $c->id]);
            ServiceCreated::dispatch($s);
            return redirect()->route('vendor.services.show', ['service' => $s]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render($this->path . '/show', [
            'service' => Service::query()->findOrFail($id)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {


        return Inertia::render($this->path . '/edit', [
            'service' => Service::query()->findOrFail($id),
            'categories' => ServiceCategory::query()->get()
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
