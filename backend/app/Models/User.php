<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Skill;
use App\Models\Experiences;
use App\Models\Profile;
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $guarded = [];
    protected $connection = 'mysql';
    protected $table = 'users';
    protected $with = ['profile'];
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    public function details()
    {
        return $this->hasOne(UserDetails::class, 'id', 'user_id');
    }
    public function profile(){
          return $this->hasOne(Profile::class,  'user_id','id');
    }
    public function skills(){
          return $this->hasMany(Skill::class, 'id', 'user_id');
    }
    public function experiences(){
          return $this->hasMany(Experiences::class, 'id', 'user_id');
    }
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
