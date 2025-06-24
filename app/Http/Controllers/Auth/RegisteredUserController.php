<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Specialization;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
// use App\Models\User;
class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        $u = User::Factory()->vendor()->make();
        return Inertia::render('auth/register',['fake'=>$u]);
    }
    public function create_profile(): Response | RedirectResponse
    {
        if (request()->user()->hasProfile()){
            return redirect()->route('dashboard');
        }
        $specialities  = Specialization::all();

        return Inertia::render('auth/create-profile',['specialities'=>$specialities]);
    }

    public function store_profile(Request $request)
    {
        $profile = $request->user()->profile()->create([
            'is_vendor'=>$request->is_vendor
        ]);
        if ($request->is_vendor){
            $request->user()->vendor()->create([]);
        }
        $profile->specializations()->attach($request->specializations);

        return redirect()->route('dashboard');

//        dd($request->specialities);
//        $specialities  = Specialization::all();



//        return Inertia::render('auth/create-profile',['specialities'=>$specialities]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email'     => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'username' => 'required|string|lowercase|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'username'=>$request->username,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return to_route('profile.create');
    }
}
