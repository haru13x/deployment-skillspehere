<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MasterWork extends Model
{
    use HasFactory;
    protected $table = 'work';
    protected $with = ['skills','instrunction'];
    protected $guarded = [];

    public function instrunction()
    {
        return $this->hasMany(WorkInstruction::class,  'work_id','id');
    }

    public function skills()
    {
        return $this->hasMany(WorkSkills::class, 'work_id', 'id');
    }
    public function appliedUsers()
    {
        return $this->hasMany(AppliedWork::class, 'work_id', 'id');
    }
    public function assigned(){
        return $this->belongsTo(User::class,'assigned_user_id','id');
    }
    public function client(){
        return $this->belongsTo(User::class,'client_id','id');
    }
}
