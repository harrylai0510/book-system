<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Models\History;
use App\Models\User;
use App\Models\Book;

class HistoryController extends Controller
{
    //
    public function createHistory(Request $request)
    {
        $res = [
            "msg" => ""
        ];

        try {
            $validated = $request->validate([
                'userId' => 'required',
                'bookId' => 'required',
            ]);
            $formData = $request->collect();
            $History = new History();

            $History->userId = $formData['userId'];
            $History->bookId = $formData['bookId'];
            $History->save();

            $res = [
                "ok"  => true,
                "msg" => "1 Record(s) has been successfully created.",
            ];
        } catch (ValidationException $e) {
            $res = [
                "msg" => "Not Enough Data.",
                "err" => "ValidationException"
            ];
        }

        return $res;
    }

    public function getHistories()
    {
        $res = [];
        $Histories = History::all();
        foreach ($Histories as $History) {
            $userId = $History->userId;
            $bookId = $History->bookId;
            $userInfo = User::where('id', $userId)->get();
            $bookInfo = Book::where('id', $bookId)->get();
            $History['user'] = $userInfo[0];
            $History['book'] = $bookInfo[0];
            array_push($res, $History);
        }
        return $res;
    }

    public function getHistory(string $id)
    {
        $res = json_encode([], JSON_FORCE_OBJECT);
        try {
            $History = History::where('id', '=', $id)->firstOrFail();
            $userId = $History->userId;
            $bookId = $History->bookId;
            $userInfo = User::where('id', $userId)->get();
            $bookInfo = Book::where('id', $bookId)->get();
            $History['user'] = $userInfo[0];
            $History['book'] = $bookInfo[0];
            $res = $History;
        } catch (ModelNotFoundException $e) {
            return json_encode([], JSON_FORCE_OBJECT);
        }
        return $res;
    }

    public function deleteHistory(string $id)
    {
        $res = [
            "msg" => ""
        ];

        try {
            $History = History::where('id', '=', $id)->firstOrFail();
            $History->forceDelete();
            $res = [
                "ok"  => true,
                "msg" => "1 Record(s) has been successfully removed."
            ];
        } catch (ModelNotFoundException $e) {
            $res = [
                "msg" => "Cannot find the record(s).",
                "err" => "ModelNotFoundException"
            ];
        }

        return $res;
    }
}
