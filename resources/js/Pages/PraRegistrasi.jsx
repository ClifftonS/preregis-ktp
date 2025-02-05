import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { usePage } from "@inertiajs/react";
import { toast } from "react-hot-toast";

export default function PraRegistrasi() {
    const { data, setData, post, processing, errors } = useForm({
        nama: "",
        alamat: "",
        kecamatan: "",
        kelurahan: "",
        kotakabupaten: "",
        provinsi: "",
        jenis_kelamin: "Laki-laki",
        pekerjaan: "",
        golongan_darah: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        foto: null,
    });

    const { flash } = usePage().props;

    if (flash.message) {
        toast.success(flash.message);
    }

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleFileChange = (e) => {
        setData("foto", e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("praregistrasi.update"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="PreRegistrasi" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-10 min-h-[calc(10/12*100vh)]">
                        <h2 className="text-lg font-semibold mb-4 flex justify-center">
                            Pre-Registrasi Form
                        </h2>
                        <form
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                            className="space-y-4"
                        >
                            <div className="sm:grid grid-cols-2 gap-4">
                                <div className="mb-4 sm:mb-0">
                                    <InputLabel
                                        htmlFor="nama"
                                        value="Nama Lengkap"
                                    />
                                    <input
                                        type="text"
                                        name="nama"
                                        value={data.nama}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                    <InputError
                                        message={errors.nama}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mb-4 sm:mb-0">
                                    <InputLabel
                                        htmlFor="jenis_kelamin"
                                        value="Jenis Kelamin"
                                    />

                                    <div className="flex gap-4 p-2 ">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="jenis_kelamin"
                                                value="Laki-laki"
                                                checked={
                                                    data.jenis_kelamin ===
                                                    "Laki-laki"
                                                }
                                                onChange={handleChange}
                                                className="mr-2"
                                            />
                                            Laki-laki
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="jenis_kelamin"
                                                value="Perempuan"
                                                checked={
                                                    data.jenis_kelamin ===
                                                    "Perempuan"
                                                }
                                                onChange={handleChange}
                                                className="mr-2"
                                            />
                                            Perempuan
                                        </label>
                                    </div>

                                    <InputError
                                        message={errors.jenis_kelamin}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mb-4 sm:mb-0">
                                    <InputLabel
                                        htmlFor="pekerjaan"
                                        value="Pekerjaan"
                                    />
                                    <input
                                        type="text"
                                        name="pekerjaan"
                                        value={data.pekerjaan}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                    <InputError
                                        message={errors.pekerjaan}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mb-4 sm:mb-0">
                                    <InputLabel
                                        htmlFor="golongan_darah"
                                        value="Golongan Darah"
                                    />
                                    <select
                                        name="golongan_darah"
                                        value={data.golongan_darah}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    >
                                        <option value="">
                                            Pilih Golongan Darah
                                        </option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="AB">AB</option>
                                        <option value="O">O</option>
                                    </select>
                                    <InputError
                                        message={errors.golongan_darah}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mb-4 sm:mb-0">
                                    <InputLabel
                                        htmlFor="tempat_lahir"
                                        value="Tempat Lahir"
                                    />
                                    <input
                                        type="text"
                                        name="tempat_lahir"
                                        value={data.tempat_lahir}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                    <InputError
                                        message={errors.tempat_lahir}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mb-4 sm:mb-0">
                                    <InputLabel
                                        htmlFor="tanggal_lahir"
                                        value="Tanggal Lahir"
                                    />
                                    <input
                                        type="date"
                                        name="tanggal_lahir"
                                        value={data.tanggal_lahir}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                    <InputError
                                        message={errors.tanggal_lahir}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mb-4 sm:mb-0">
                                    <InputLabel
                                        htmlFor="alamat"
                                        value="Alamat"
                                    />
                                    <input
                                        type="text"
                                        name="alamat"
                                        value={data.alamat}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                    <InputError
                                        message={errors.alamat}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mb-4 sm:mb-0">
                                    <InputLabel
                                        htmlFor="kecamatan"
                                        value="Kecamatan"
                                    />
                                    <input
                                        type="text"
                                        name="kecamatan"
                                        value={data.kecamatan}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                    <InputError
                                        message={errors.kecamatan}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mb-4 sm:mb-0">
                                    <InputLabel
                                        htmlFor="kelurahan"
                                        value="Kelurahan"
                                    />
                                    <input
                                        type="text"
                                        name="kelurahan"
                                        value={data.kelurahan}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                    <InputError
                                        message={errors.kelurahan}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mb-4 sm:mb-0">
                                    <InputLabel
                                        htmlFor="kotakabupaten"
                                        value="Kota/Kabupaten"
                                    />
                                    <input
                                        type="text"
                                        name="kotakabupaten"
                                        value={data.kotakabupaten}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                    <InputError
                                        message={errors.kotakabupaten}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mb-4 sm:mb-0">
                                    <InputLabel
                                        htmlFor="provinsi"
                                        value="Provinsi"
                                    />
                                    <input
                                        type="text"
                                        name="provinsi"
                                        value={data.provinsi}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                    <InputError
                                        message={errors.provinsi}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="mb-4 sm:mb-0">
                                <InputLabel
                                    htmlFor="foto"
                                    value="Upload Foto"
                                />
                                <input
                                    type="file"
                                    name="foto"
                                    accept=".png, .jpeg"
                                    onChange={handleFileChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                                <InputError
                                    message={errors.foto}
                                    className="mt-2"
                                />
                            </div>
                            <div className="w-full flex justify-end mt-4">
                                <PrimaryButton
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-blue-500 text-white rounded "
                                >
                                    Submit
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
