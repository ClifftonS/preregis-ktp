<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'nama' => fake()->name(),
            'alamat' => fake()->address(),
            'kecamatan' => 'kecamatan',
            'kelurahan' => 'kelurahan',
            'kotakabupaten' => fake()->city(),
            'provinsi' => fake()->state(),
            'jenis_kelamin' => fake()->randomElement(['Laki-laki', 'Perempuan']),
            'pekerjaan' => fake()->jobTitle(),
            'golongan_darah' => fake()->randomElement(['A', 'B', 'AB', 'O']),
            'tempat_lahir' => fake()->city(),
            'tanggal_lahir' => fake()->date(),
            'foto' => fake()->numerify('user_####.png'),
            'dukcapil' => fake()->randomElement([
                'Kantor Dukcapil A',
                'Kantor Dukcapil B',
                'Kantor Dukcapil C',
                'Kantor Dukcapil D',
                'Kantor Dukcapil E'
            ]),
            'tanggal_jadwal' => fake()->dateTimeBetween('now', '+30 days')->format('Y-m-d'),
            'pukul_jadwal' => fake()->randomElement([
                '10.00',
                '11.00',
                '13.00',
                '14.00',
            ]),
            'nomor_preregis' => fake()->numerify('PR-ID-##########'),
            'tanggal_preregis' => fake()->dateTimeBetween('-30 days', 'now')->format('Y-m-d'),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
