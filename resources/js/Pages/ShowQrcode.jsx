import { useRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import { QRCodeCanvas } from "qrcode.react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";

export default function ShowQrcode({ nopreregis }) {
    const { flash } = usePage().props;
    const qrRef = useRef(null);

    if (flash.message) {
        toast.success(flash.message);
    }

    const handleDownload = () => {
        const canvas = qrRef.current.querySelector("canvas");
        if (canvas) {
            const url = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = url;
            link.download = `${nopreregis}.png`;
            link.click();
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <AuthenticatedLayout>
            <Head title="PreRegistrasi" className="noprint" />

            <div className="noprint py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-10">
                        <h2 className="text-lg font-semibold mb-4 flex justify-center">
                            QR Code
                        </h2>
                        <p className="mb-4">
                            Nomor Pre-Registrasi: <strong>{nopreregis}</strong>
                        </p>
                        <div
                            ref={qrRef}
                            className="flex justify-center printable"
                        >
                            <QRCodeCanvas value={nopreregis} size={200} />
                        </div>
                        <div className="mt-6 flex justify-center gap-4">
                            <button
                                onClick={handleDownload}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Unduh
                            </button>
                            <button
                                onClick={handlePrint}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            >
                                Cetak
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
