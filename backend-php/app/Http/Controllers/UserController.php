<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Models\User;

class UserController extends Controller
{
    // CRUD

    public function createUser(Request $request)
    {
        $res = [
            "msg" => ""
        ];

        try {
            $validated = $request->validate([
                'lemail' => 'required',
                'password' => 'required',
            ]);
            $formData = $request->collect();
            $User = new User();

            if (isset($formData['firstName'])) {
                $User->firstName = $formData['firstName'];
            }

            if (isset($formData['lastName'])) {
                $User->lastName = $formData['lastName'];
            }

            $User->lemail = $formData['lemail'];
            $User->password = $formData['password'];
            $User->save();

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

    public function getAllUsers()
    {
        $Users = User::all();
        return $Users->toArray();
    }

    public function getUser(string $id)
    {
        try {
            $User = User::where('id', '=', $id)->firstOrFail();
            return $User->toArray();
        } catch (ModelNotFoundException $e) {
            return json_encode([], JSON_FORCE_OBJECT);
        }
    }

    public function updateUser(string $id, Request $request)
    {
        $res = [
            "msg" => ""
        ];

        try {
            $formData = $request->collect();
            $User = User::where('id', '=', $id)->firstOrFail();

            if (isset($formData['firstName'])) {
                $User->firstName = $formData['firstName'];
            }

            if (isset($formData['lastName'])) {
                $User->lastName = $formData['lastName'];
            }

            if (isset($formData['password'])) {
                $User->password = $formData['password'];
            }

            $User->save();
            $res = [
                "ok"  => true,
                "msg" => "1 Record(s) has been successfully updated."
            ];
        } catch (ModelNotFoundException $e) {
            $res = [
                "msg" => "Cannot find the record(s).",
                "err" => "ModelNotFoundException"
            ];
        }

        return $res;
    }

    public function deleteUser(string $id)
    {
        $res = [
            "msg" => ""
        ];

        try {
            $User = User::where('id', '=', $id)->firstOrFail();
            $User->forceDelete();
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
