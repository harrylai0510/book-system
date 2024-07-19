<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Models\Book;

class BookController extends Controller
{
    public function CreateABook(Request $request) {
        $res = [
            "msg" => ""
        ];

        try {
            $validated = $request->validate([
                'bookName' => 'required',
            ]);
            $formData = $request->collect();
            $Book = new Book();
            $Book->bookName = $formData['bookName'];
            $Book->save();

            $res = [
                "ok"  => true,
                "msg" => "1 Record(s) has been successfully created.",
            ];
        }
        catch (ValidationException $e) {
            $res = [
                "msg" => "Not Enough Data.",
                "err" => "ValidationException"
            ];
        }

        return $res;
    }

    public function GetAllBooks() {
        $Books = Book::all();
        return $Books->toArray();
    }

    public function GetOneBook(string $id) {
        try {
            $Book = Book::where('id', '=', $id)->firstOrFail();
            return $Book->toArray();
        }
        catch( \Illuminate\Database\Eloquent\ModelNotFoundException $e ) {
            return json_encode([], JSON_FORCE_OBJECT);
        }

    }

    public function UpdateABook(string $id, Request $request) {
        $res = [
            "msg" => ""
        ];

        try {
            $validated = $request->validate([
                'bookName' => 'required',
            ]);
            $formData = $request->collect();
            $Book = Book::where('id', '=', $id)->firstOrFail();
            $Book->bookName = $formData['bookName'];
            $Book->save();
            $res = [
                "ok"  => true,
                "msg" => "1 Record(s) has been successfully created."
            ];
        }
        catch( \Illuminate\Database\Eloquent\ModelNotFoundException $e ) {
            $res = [
                "msg" => "Cannot find the record(s).",
                "err" => "ModelNotFoundException"
            ];
        }
        catch (ValidationException $e) {
            $res = [
                "msg" => "Not Enough Data.",
                "err" => "ValidationException"
            ];
        }

        return $res;
    }

    public function DeleteABook(string $id) {
        $res = [
            "msg" => ""
        ];

        try {
            $Book = Book::where('id', '=', $id)->firstOrFail();
            $Book->forceDelete();
            $res = [
                "ok"  => true,
                "msg" => "1 Record(s) has been successfully removed."
            ];
        }
        catch( \Illuminate\Database\Eloquent\ModelNotFoundException $e ) {
            $res = [
                "msg" => "Cannot find the record(s).",
                "err" => "ModelNotFoundException"
            ];
        }

        return $res;
    }

}
