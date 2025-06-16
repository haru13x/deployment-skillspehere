<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Str;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Attempt to find the user by email
        $user = User::with('details')->where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Create a new token for the user
        $token = Str::random(60);
        $user->update([
            'api_token' => $token
        ]);
        return response()->json(['token' => $token, 'user' => $user]);
    }
}

