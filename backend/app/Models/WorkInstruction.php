<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkInstruction extends Model
{
    use HasFactory;
    protected $table = 'work_instruction';
   
    protected $guarded = [];
}
