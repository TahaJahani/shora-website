<?php

namespace App\Http\Controllers;

use App\Models\PasswordReset;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Laravel\Sanctum\PersonalAccessToken;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'surname' => 'required|string',
            'student_number' => 'required|numeric',
            'roles' => ['required', 'array'],
            'roles.*' => [Rule::in(Role::$roles)],
            'phone_number' => 'numeric',
            'password' => 'confirmed|min:8'
        ]);

        if ($validator->fails())
            return response()->json(['status' => 'error', 'message' => $validator->errors()->first()]);
        $user = Auth::user();
        $roles = $request->roles;
        if ($user->tokenCan('admin'))
            $roles = [Role::user];

        $existing_user = User::where('student_number', $request->student_number)->orWhere('phone_number', $request->phone_number)->first();
        if ($existing_user) {
            $same_field = $existing_user->student_number == $request->student_number ? 'شماره دانشجویی' : 'شماره تماس';
            return response()->json(['status' => 'error', 'message' => "کاربری با این $same_field وجود دارد"]);
        }
        $password = Hash::make($request->password ?? $request->student_number);
        $user = User::create([
            'name' => $request->name,
            'surname' => $request->surname,
            'student_number' => $request->student_number,
            'phone_number' => $request->phone_number,
            'password' => $password,
        ]);
        sort($roles);
        $roles = array_map(function ($item) {
            return ['role' => $item];
        }, $roles);
        $user->roles()->createMany($roles);
        return response()->json(['status' => 'ok', 'message' => 'کاربر جدید با موفقیت ثبت شد', 'data' => ['user' => $user]]);
    }

    public function completeUserInfo(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|regex:/^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]+$/',
            'surname' => 'required|string|regex:/^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]+$/',
            'phone_number' => 'numeric',
        ]);
        if ($validator->fails())
            return response()->json(['status' => 'error', 'message' => $validator->errors()->first()]);
        
        $user = Auth::user();
        if ($user->name || $user->surname)
            return response()->json(['status' => 'error', 'message' => 'ویرایش دوباره اطلاعات امکان پذیر نیست']);
        $user->name = $request->name;
        $user->surname = $request->surname;
        if ($request->phone_number && !$user->phone_number)
            $user->phone_number = $request->phone_number;
        $user->save();
        return response()->json(['status' => 'ok', 'data' => ['user' => $user]]);
    }

    public function checkLogin(Request $request)
    {
        if (!$request->token)
            return response()->json(['status' => 'error', 'message' => 'unauthorized']);
        $token = $request->token;
        if (PersonalAccessToken::findToken($token))
            return response()->json(['status' => 'ok']);
        else
            return response()->json(['status' => 'error', 'message' => 'unauthorized']);
    }

    public function getUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'student_number' => 'required|numeric',
        ]);
        if ($validator->fails())
            return response()->json(['status' => 'error', 'message' => $validator->errors()->first()]);
        $user = User::where('student_number', $request->student_number)->select('student_number', 'created_at')->first();
        $status = $user ? 'ok' : 'error';
        return response()->json(['status' => $status, 'data' => ['user' => $user]]);
    }

    public function getUsers(Request $request)
    {
        $result = User::with('roles')->paginate()->toArray();
        $result['status'] = 'ok';
        return response()->json($result);
    }

    public function getAllUsersStudentNumber(Request $request)
    {
        $users = User::select('id', 'student_number')->get();
        return response()->json(['status' => 'ok', 'data' => ['users' => $users]]);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'student_number' => 'required|numeric',
            'password' => 'required',
        ]);
        if ($validator->fails())
            return response()->json(['status' => 'error', 'message' => $validator->errors()->first()]);
        $student_number = $request->student_number;
        $password = $request->password;
        $user = User::with('roles')->where('student_number', $student_number)->first();
        if ($user && Hash::check($password, $user->password)) {
            $roles = array_map(function ($item) {
                return $item['role'];
            }, $user->roles->toArray());
            sort($roles);
            $token = $user->createToken('default name', $roles)->plainTextToken;
            $user = [
                'name' => $user->name,
                'surname' => $user->surname,
                'student_number' => $user->student_number,
                'roles' => $roles,
                'token' => $token,
            ];
            return response()->json(['status' => 'ok', 'message' => 'خوش آمدید', 'data' => ['user' => $user]]);
        }
        return response()->json(['status' => 'error', 'message' => 'نام کاربری یا رمز عبور نادرست می‌باشد']);
    }

    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'old_password' => 'required',
            'new_password' => 'required|confirmed',
        ]);
        if ($validator->fails())
            return response()->json(['status' => 'error', 'message' => $validator->errors()->first()]);
        $old_pass = $request->old_password;
        $new_pass = $request->new_password;

        $user = Auth::user();
        if ($user && Hash::check($old_pass, $user->password)) {
            $user->password = Hash::make($new_pass);
            $user->save();
            return response()->json(['status' => 'ok', 'message' => 'رمز عبور با موفقیت تغییر کرد']);
        }
        return response()->json(['status' => 'error', 'message' => 'رمز عبور قدیمی نادرست می‌باشد']);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['status' => 'ok', 'message' => 'خدانگهدار']);
    }

    public function banUser($id)
    {
        User::where('id', $id)->update([
            'is_banned' => 1,
        ]);
        return response()->json(['status' => 'ok']);
    }

    public function unbanUser($id)
    {
        User::where('id', $id)->update([
            'is_banned' => 0,
        ]);
        return response()->json(['status' => 'ok']);
    }

    public function sendResetEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string',
        ]);
        if ($validator->fails())
            return response()->json(['status' => 'error', 'message' => $validator->errors()->first()]);
        $email = $request->email;
        if (strpos($email, '@') == false)
            $email = $email . '@ce.sharif.edu';
        $user = User::where('email', $email)->first();
        if ($user) {
            $secure_hash = Str::random(32);
            $user->passwordResets()->create([
                'hash' => $secure_hash,
            ]);
            $url = env("FRONTEND_URL") . "/reset-password" . '/' . $secure_hash; //TODO
            $data = ['url' => $url, 'student_number' => $user->student_number];
            Mail::send(['text' => 'mail'], $data, function ($message) use ($user) {
                $message->to($user->email)->subject('بازنشانی رمز عبور');
                $message->from('noreply.shora.cesharif@gmail.com', 'شورای صنفی دانشکده کامپیوتر');
            });
        }
        return response()->json(['status' => 'ok']);
    }

    public function resetPassword(Request $request) {
        $validator = Validator::make($request->all(), [
            'hash' => 'required|string|size:32',
            'password' => 'required|confirmed',
        ]);

        if ($validator->fails())
            return response()->json(['status' => 'error', 'message' => $validator->errors()->first()]);

        $password_reset = PasswordReset::where('hash', $request->hash)->first();
        if (!$password_reset)
            return response()->json(['status' => 'error', 'message' => 'لینک اشتباه است و یا منقضی شده است']);
        User::where('id', $password_reset->user_id)->update([
            'password' => Hash::make($request->password),
        ]);

        $password_reset->used = true;
        $password_reset->save();
        return response()->json(['status' => 'ok', 'message' => 'رمز عبور با موفقیت بازنشانی شد']);
    }
}
