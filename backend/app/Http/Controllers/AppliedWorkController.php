<?php

namespace App\Http\Controllers;

use App\Models\AppliedWork;
use App\Models\MasterWork;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AppliedWorkController extends Controller
{

    public function index($id)
    {
        $data = AppliedWork::where('work_id', $id)->get();
        return response()->json($data);
    }
    public function store(Request $request)
    {
        AppliedWork::create([
            'work_id' => $request->work_id,
            'applied_date' => Carbon::now(),
            'applied_id' => $request->user->id,
            'proposal' => $request->proposal,
            'proposal_rate' => $request->proposal_rate,
            'proposal_currency' => $request->proposal_currency,
            'status' => 1,
        ]);
    }

    public function checkApplication($id)
    {
        $data = AppliedWork::where('work_id', $id)
            ->where('applied_id', Request()->user->id)->exists();
        if ($data) {
            return response()->json(['hasApplied' => true], 200);
        }
        $client = MasterWork::where('id', $id)
            ->where('client_id', Request()->user->id)->exists();
        if ($client) {
            return response()->json(['hasApplied' => true], 200);
        }
        return response()->json(['hasApplied' => false], 200);
    }
}
