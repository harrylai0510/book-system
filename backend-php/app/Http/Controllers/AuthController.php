<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Models\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthController extends Controller
{
    //
    public function login(Request $request) {
        $res = [
            "msg" => ""
        ];

        try {
            $validated = $request->validate([
                'lemail' => 'required',
                'password' => 'required'
            ]);
            $formData = $request->collect();
            $loginEmail = $formData['lemail'];
            $loginPw    = $formData['password'];

            $User = User::where('lemail', '=', $loginEmail)
                            ->where('password', '=', $loginPw)
                            ->get();
            if ( isset($User) && !empty($User) && $User != '[]' ) {
                $User = $User[0];
                $userId = $User->id;
                $userName = $User->userName;


                $key = 'aaaa';
                $payload = [
                    "id" => $userId,
                    "lemail" => $loginEmail,

                    'iss' => env('APP_URL'),
                    'aud' => env('APP_URL'),
                    'iat' => time(),
                    "exp" => time() + (60 * 60 * 1)
                ];
                $jwt = JWT::encode($payload, $key, 'HS256');

                setcookie("id",    $userId,   time()+3600, '/', env('APP_URL'), false, true);
                setcookie("name",  $userName, time()+3600, '/', env('APP_URL'), false, true);
                setcookie("token", $jwt,      time()+3600, '/', env('APP_URL'), false, true);

                unset($res["msg"]);
                $res = [
                    "userId" => $userId,
                    "userName" => $userName,
                    "token" => $jwt
                ];
            }
            else {
                $res['msg'] = "failed";
            }
        }
        catch( ModelNotFoundException $e ) {
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

    public function logout(Request $request) {
        $res = [
            "ok" => true
        ];

        if (isset($_COOKIE['id'])) {
            unset($_COOKIE['id']);
            setcookie('id', '', time() - 3600, '/'); // empty value and old timestamp
        }

        if (isset($_COOKIE['name'])) {
            unset($_COOKIE['name']);
            setcookie('name', '', time() - 3600, '/'); // empty value and old timestamp
        }

        if (isset($_COOKIE['token'])) {
            unset($_COOKIE['token']);
            setcookie('token', '', time() - 3600, '/'); // empty value and old timestamp
        }

        return $res;
    }
}
