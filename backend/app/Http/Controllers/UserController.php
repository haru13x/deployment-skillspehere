<?php

namespace App\Http\Controllers;

use App\Models\User;
use DB;
use Hash;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\Skill;
use App\Models\Experiences;
use Carbon\Carbon;
use App\Models\Profile;
class UserController extends Controller
{
    public function store(Request $request)
    {
        try {
            DB::connection('mysql')->beginTransaction();

            $name = $request->firstname . $request->lastname;
            $user = User::updateOrcreate(
                [
                    'name' => $name,
                    'email' => $request->email,
                    'username' => $request->username
                ],
                [
                    'username' => $request->username,
                    'name' => $name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                    'number' => $request->mobile,
                    'status' => 1,
                    'role_id' => 3,
                    'api_token' => Str::random(60),

                ]
            );
            $user->details()->updateOrCreate(
                [
                    'user_id' => $user->id,
                    'firstname' => $request->firstname,
                    'lastname' => $request->lastname,

                ],
                [
                    'user_id' => $user->id,
                    'firstname' => $request->firstname,
                    'lastname' => $request->lastname,
                    'number' => $request->mobile,
                    'email' => $request->email,
                    'status' => 1,
                ]
            );
            $data = User::with('details')->where('id', $user->id)->first();
            DB::connection('mysql')->commit();
            return response()->json(['msg' => 'save succesfully', 'user' => $data, 'token' => $user->api_token], 201);
        } catch (\Exception $e) {
            DB::connection('mysql')->rollBack();

            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function store_profile(Request $request)
    {
    $user = User::where('id', $request->user->id)->first(); // Authenticated user

    // Upload profile picture if exists
    $profilePicturePath = null;
    if ($request->hasFile('profile_picture')) {
        $profilePicturePath = $request->file('profile_picture')->store('profiles', 'public');
    }

    // Create or update profile
    $profile = Profile::updateOrCreate(
        ['user_id' => $user->id],
        [
            'about_title' => $request->input('about_title'),
            'about_description' => $request->input('about_description'),
            'birth_date' => $request->input('birth_date'),
            'profile_picture' => $profilePicturePath,
        ]
    );

    // Save skills
    $skills = json_decode($request->input('skills'), true);
    if (is_array($skills)) {
        // Delete old skills
      

        // Add new ones
        foreach ($skills as $skillName) {
            Skill::create([
                'user_id' => $user->id,
                'name' => $skillName,
            ]);
        }
    }

    // Save experiences
    $experiences = json_decode($request->input('experiences'), true);
    if (is_array($experiences)) {
        // Delete old experiences
       

        // Add new ones
        foreach ($experiences as $exp) {
            Experiences::create([
                'user_id' => $user->id,
                'title' => $exp['title'] ?? '',
                'company' => $exp['company'] ?? '',
                'start_date' =>  null,
                'end_date' =>  null,
            ]);
        }
    }

    return response()->json([
        'message' => 'Profile saved successfully.',
        'profile' => $profile,
        'skills' => $user->skills,
        'experiences' => $user->experiences
    ]);
    }
    public function getProfile($id)
    {
    $profile = Profile::where('user_id', $id)->first();
    $skills = Skill::where('user_id', $id)->pluck('name');
    $experiences = Experiences::where('user_id', $id)->get();

    return response()->json([
        'profile' => $profile,
        'skills' => $skills,
        'experiences' => $experiences,
    ]);
}



public function store_picture(Request $request)
{
    // $request->validate([
    //     'user_id' => 'required|exists:users,id',
    //     'profile_picture' => 'nullable|image|max:2048',
    //     'cover_photo' => 'nullable|image|max:4096',
    // ]);

    $profile = Profile::firstOrNew(['user_id' => $request->user_id]);

    if ($request->hasFile('profile_picture')) {
        $profilePic = $request->file('profile_picture');
        $profilePicName = 'profile_' . $request->user_id . '_' . now()->format('Ymd_His') . '.' . $profilePic->getClientOriginalExtension();
        $profilePicPath = $profilePic->storeAs('profiles', $profilePicName, 'public');
        $profile->profile_picture = $profilePicPath;
    }

    if ($request->hasFile('cover_photo')) {
        $coverPhoto = $request->file('cover_photo');
        $coverPhotoName = 'cover_' . $request->user_id . '_' . now()->format('Ymd_His') . '.' . $coverPhoto->getClientOriginalExtension();
        $coverPhotoPath = $coverPhoto->storeAs('covers', $coverPhotoName, 'public');
        $profile->cover_photo = $coverPhotoPath;
    }

    $profile->save();

    return response()->json([
        'message' => 'Profile updated successfully.',
        'profile' => $profile,
        'profile_picture_url' => $profile->profile_picture ? asset('storage/' . $profile->profile_picture) : null,
        'cover_photo_url' => $profile->cover_photo ? asset('storage/' . $profile->cover_photo) : null,
    ]);
}
}
