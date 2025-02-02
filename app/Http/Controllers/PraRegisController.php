<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PraRegisController extends Controller
{
    public function update(Request $request)
    {
        $id = Auth::id();

        $validatedData = $request->validate([
            'nama' => ['required', 'string', 'max:255'],
    'jenis_kelamin' => ['required', 'in:Laki-laki,Perempuan'],
    'pekerjaan' => ['required', 'string', 'max:255'],
    'golongan_darah' => ['required', 'in:A,B,AB,O'],
    'tempat_lahir' => ['required', 'string', 'max:255'],
    'tanggal_lahir' => ['required', 'date'],
    'alamat' => ['required', 'string', 'max:255'],
    'kecamatan' => ['required', 'string', 'max:255'],
    'kelurahan' => ['required', 'string', 'max:255'],
    'kotakabupaten' => ['required', 'string', 'max:255'],
    'provinsi' => ['required', 'string', 'max:255'],
    'foto' => ['required', 'image', 'mimes:jpeg,png', 'max:2048']
        ]);

        foreach ($validatedData as $key => $value) {
            if (is_string($value) && !in_array($key, ['golongan_darah', 'jenis_kelamin'])) {
                $validatedData[$key] = ucwords(strtolower($value));
            }
        }

        if ($request->hasFile('foto')) {

            $imageName =  'user_' . $id . '.'.request()->foto->getClientOriginalExtension();

            request()->foto->move(public_path('images'), $imageName);
            $validatedData['foto'] = $imageName;
        }

        $user = User::findorfail($id);
        $user->update($validatedData);

        return redirect()->route('praregistrasidetail')->with('message', 'Data berhasil diinput');


    }
    public function update2(Request $request)
    {
        $id = Auth::id();

        $validatedData = $request->validate([
            'dukcapil' => ['required', 'string', 'not_in:Pilih Lokasi'],
    'pukul_jadwal' => ['required', 'string'],
    'tanggal_jadwal' => ['required', 'date'],
        ]);


        $user = User::findorfail($id);
        $user->update($validatedData);

        return back()->with('message', 'Pre-registrasi Berhasil');


    }
}
