import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { usePage } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

export default function PraRegistrasiDetail() {
    const { data, setData, post, processing, errors } = useForm({
        dukcapil: "",
        tanggal_jadwal: "",
        pukul_jadwal: "10.00",
    });
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.message) {
            toast.success(flash.message);
        }
    }, [flash.message]);

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("praregistrasi.update2"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="PreRegistrasi" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-10 min-h-[calc(10/12*100vh)]">
                        <h2 className="text-lg font-semibold mb-4 flex justify-center">
                            Pilih Lokasi & Jadwal
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <InputLabel
                                    htmlFor="dukcapil"
                                    value="Lokasi Dukcapil"
                                />
                                <select
                                    name="dukcapil"
                                    value={data.dukcapil}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                >
                                    <option value="">Pilih Lokasi</option>
                                    <option value="Kantor Dukcapil A">
                                        Kantor Dukcapil A
                                    </option>
                                    <option value="Kantor Dukcapil B">
                                        Kantor Dukcapil B
                                    </option>
                                    <option value="Kantor Dukcapil C">
                                        Kantor Dukcapil C
                                    </option>
                                    <option value="Kantor Dukcapil D">
                                        Kantor Dukcapil D
                                    </option>
                                    <option value="Kantor Dukcapil E">
                                        Kantor Dukcapil E
                                    </option>
                                </select>
                                <InputError
                                    message={errors.dukcapil}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="tanggal_jadwal"
                                    value="Tanggal"
                                />
                                <input
                                    type="date"
                                    name="tanggal_jadwal"
                                    value={data.tanggal_jadwal}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    min={new Date().toISOString().split("T")[0]}
                                    required
                                />
                                <InputError
                                    message={errors.tanggal_jadwal}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="pukul_jadwal"
                                    value="Jam"
                                />

                                <div className="flex gap-4 p-2 ">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="pukul_jadwal"
                                            value="10.00"
                                            checked={
                                                data.pukul_jadwal === "10.00"
                                            }
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        10.00
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="pukul_jadwal"
                                            value="11.00"
                                            checked={
                                                data.pukul_jadwal === "11.00"
                                            }
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        11.00
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="pukul_jadwal"
                                            value="13.00"
                                            checked={
                                                data.pukul_jadwal === "13.00"
                                            }
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        13.00
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="pukul_jadwal"
                                            value="14.00"
                                            checked={
                                                data.pukul_jadwal === "14.00"
                                            }
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        14.00
                                    </label>
                                </div>

                                <InputError
                                    message={errors.pukul_jadwal}
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
