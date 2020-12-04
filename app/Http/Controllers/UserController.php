<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;

use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
        return Inertia::render('User', [
            'users' => $users->map(function($user){
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'edit_url' => route('users.edit', $user->id),
                    'delete_url' => route('users.destroy', $user->id),
                    ];
            }),
            'create_url' => route('users.index')
        ])->withViewData(['title' => 'User crud operations']);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Create', ['errors' => '']);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //dd($request->all());
        $request->validate([
            'name' => ['required'],
            'email' => ['required', 'email', 'unique:users'],
            'thumbnail' => ['image', 'mimes:jpg, png, jpeg'],
            'password' => ['required', 'confirmed'],
            'password_confirmation' => ['required'],
        ]);        
        
        if ($request->hasFile('thumbnail')) {
            $thumbnail = $request->thumbnail->store('images', 'public');
        }

              
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'thumbnail' => $thumbnail ?? null,
            'password' => bcrypt($request->password)
        ]);
        return redirect()->route('users.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = User::findOrFail($id);
        return Inertia::render('Edit', ['errors' => '','id' => $user->id, 'name' => $user->name, 'email' => $user->email]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'id' => ['required'],
            'name' => ['required'],                      
        ]);     
        //'email' => ['required', 'email', 'unique:users, email,'.$id.',id'],     
            
        User::find($id)->update($request->all());
        return redirect()->route('users.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        User::findOrFail($id)->delete();
        return redirect()->route('users.index');
    }
}
