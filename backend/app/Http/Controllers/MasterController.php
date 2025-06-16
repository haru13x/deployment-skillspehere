<?php

namespace App\Http\Controllers;

use App\Models\MasterWork;
use DB;
use Illuminate\Http\Request;
use App\Models\WorkInstruction;

class MasterController extends Controller
{
    public function store(Request $request)
    {
        DB::connection('mysql')->beginTransaction();
        try {
            $work = MasterWork::create([
                'title' => $request->title,
                'rate' => $request->amount,
                'priority' => $request->priority,
                'status' => 1,
                'currency' => $request->currency,
                'paymentType' => $request->paymentType,

                'client_id' => $request->user->id,
                'description' => $request->description
            ]);

            $skills = $request->skills;
            // return $instruction;
            // if ($work) {
            foreach ($skills as $row) {
                $work->skills()->create([
                    'work_id' => $work->id,
                    'skills' => $row['skill'],

                ]);
            }
            // }
            DB::connection('mysql')->commit();
            return response()->json('Succfully created', 201);
        } catch (\Exception $e) {
            DB::connection('mysql')->rollBack();
            return response()->json(['msg' => 'Failed to store data', 'error' => $e->getMessage()], 500);
        }
    }

    public function details($id)
    {
        $query = MasterWork::query();
        $query->where('id', $id);
        $data = $query->paginate();
        return response()->json($data);
    }

    public function index(Request $request)
    {
        $query = MasterWork::query();
        $query->where('assigned_user_id', null)->where('client_id', '!=', $request->user->id);
        $data = $query->paginate();
        return response()->json($data);
    }

    public function myProject(Request $request)
    {
        $query = MasterWork::query();
        $query->with('appliedUsers')->where('client_id', $request->user->id);
        $data = $query->paginate();
        return response()->json($data);
    }
    public function myTask(Request $request)
    {
        $query = MasterWork::query();
        $query->with('appliedUsers')->where('client_id', $request->user->id)->orWhere('assigned_user_id', $request->user->id);
        $data = $query->paginate();
        return response()->json($data);
    }

    public function AppliedList(Request $request)
    {
        $query = MasterWork::query();
        $query->whereHas('appliedUsers', function ($q) use ($request) {
            $q->where('applied_id', $request->user->id);
        })
            ->with([
                'appliedUsers' => function ($q) use ($request) {
                    $q->where('applied_id', $request->user->id);
                }
            ]);
        $data = $query->paginate();
        return response()->json($data);
    }

    public function getInstruction($id)
    {

        $query = WorkInstruction::query();
        if ($id) {
            $query->where('work_id', $id);
        }
        $data = $query->get();

        $work = MasterWork::query()->where('id', $id)->with('client', 'assigned')->first();

        return response()->json(['data' => $data, 'work' => $work], 200);
    }
    public function addWorkInstruction(Request $request)
    {
        $request->validate([
            'work_id' => 'required|integer',
            'title' => 'required|string',
            'description' => 'required|string',
            'deadline_at' => 'nullable|date',
        ]);

        $instruction = new WorkInstruction();
        $instruction->work_id = $request->work_id;
        $instruction->title = $request->title;
        $instruction->description = $request->description;
        $instruction->deadline_at = $request->deadline_at;
        $instruction->status = 1;
        $instruction->step_order = WorkInstruction::where('work_id', $request->work_id)->count() + 1;
        $instruction->save();

        return response()->json(['message' => 'Instruction added successfully.'], 201);
    }
    public function updateProgress(Request $request, $id)
    {
        $instruction = WorkInstruction::findOrFail($id);

        $request->validate([
            'status' => 'required|in:1,2,3',
            'comment' => 'nullable|string',
        ]);

        $instruction->status = $request->status;
        $instruction->comment = $request->comment;
        $instruction->save();

        return response()->json([
            'message' => 'Instruction progress updated successfully.',
            'data' => $instruction,
        ]);
    }
    public function hired(Request $request)
    {
        $applicant = $request->applied_id;
        $work = $request->work_id;

        $works = MasterWork::where('id', $work);

        if (!$work) {
            return response()->json('error no work found', 401);
        }
        $works->update([
            'assigned_user_id' => $applicant,
        ]);
        return response()->json('Success', 201);
    }
}
