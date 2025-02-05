<?php

namespace App\Http\Controllers;
use App\Models\User;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $genderData = User::selectRaw("COUNT(CASE WHEN jenis_kelamin = 'Laki-laki' THEN 1 END) as laki_laki, COUNT(CASE WHEN jenis_kelamin = 'Perempuan' THEN 1 END) as perempuan")->first();

    // Data perbandingan umur
    $ageData = User::selectRaw("
            COUNT(CASE WHEN TIMESTAMPDIFF(YEAR, tanggal_lahir, CURDATE()) BETWEEN 17 AND 25 THEN 1 END) as usia_17_25,
            COUNT(CASE WHEN TIMESTAMPDIFF(YEAR, tanggal_lahir, CURDATE()) BETWEEN 26 AND 35 THEN 1 END) as usia_26_35,
            COUNT(CASE WHEN TIMESTAMPDIFF(YEAR, tanggal_lahir, CURDATE()) BETWEEN 36 AND 40 THEN 1 END) as usia_36_40,
            COUNT(CASE WHEN TIMESTAMPDIFF(YEAR, tanggal_lahir, CURDATE()) > 40 THEN 1 END) as usia_40_keatas
        ")
        ->first();

    // Data jumlah pendaftar harian dalam 1 bulan terakhir
    $dailyRegistrations = User::selectRaw('DATE(tanggal_preregis) as tanggal, COUNT(*) as jumlah')
    ->where('tanggal_preregis', '>=', now()->subDays(29))
    ->groupBy('tanggal')
    ->orderBy('tanggal', 'ASC')
    ->get()
    ->keyBy('tanggal'); // Mengubah hasil query menjadi key-value berdasarkan tanggal

// Buat daftar 30 hari terakhir
$dates = collect(range(0, 29))->map(function ($day) {
    return Carbon::today()->subDays($day)->toDateString();
})->reverse()->values(); // Reverse agar urutan dari tanggal lama ke terbaru

// Gabungkan dengan hasil query, beri default 0 jika tidak ada data
$formattedData = $dates->map(function ($date) use ($dailyRegistrations) {
    return [
        'tanggal' => $date,
        'jumlah' => $dailyRegistrations[$date]->jumlah ?? 0
    ];
});

        return Inertia::render('Dashboard', [
            'genderData' =>$genderData,
            'ageData' => $ageData,
            'dailyRegistrations' => $formattedData
        ]);
    }
}
