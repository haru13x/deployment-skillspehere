<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkSkills extends Model
{
    use HasFactory;
    protected $connection = 'mysql';
    protected $table = 'work_skills';
    protected $guarded = [];
}
