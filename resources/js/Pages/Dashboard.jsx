import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    LineElement,
    PointElement,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    LineElement,
    PointElement
);

export default function Dashboard({ genderData, ageData, dailyRegistrations }) {
    // Data untuk pie chart (Laki-laki vs Perempuan)
    const genderChartData = {
        labels: ["Laki-laki", "Perempuan"],
        datasets: [
            {
                label: "Jumlah",
                data: [genderData.laki_laki, genderData.perempuan],
                backgroundColor: ["#36A2EB", "#FF6384"],
            },
        ],
    };

    // Data untuk bar chart (Perbandingan Usia)
    const ageChartData = {
        labels: ["17-25", "26-35", "36-40", "40+"],
        datasets: [
            {
                label: "Jumlah",
                data: [
                    ageData.usia_17_25,
                    ageData.usia_26_35,
                    ageData.usia_36_40,
                    ageData.usia_40_keatas,
                ],
                backgroundColor: "#4CAF50",
            },
        ],
    };

    // Data untuk line chart (Pendaftar Harian)
    const dailyRegistrationChartData = {
        labels: dailyRegistrations.map((item) => {
            const date = new Date(item.tanggal); // Konversi ke Date object
            return date.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
            });
        }),
        datasets: [
            {
                label: "Pendaftar Harian",
                data: dailyRegistrations.map((item) => item.jumlah),
                borderColor: "#FF9800",
                backgroundColor: "#FF9800",
                pointBackgroundColor: "#000000",
                fill: false,
                tension: 0.1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                ticks: {
                    precision: 0,
                },
                beginAtZero: true,
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    title: function (tooltipItems) {
                        const index = tooltipItems[0].dataIndex;
                        const fullDate = new Date(
                            dailyRegistrations[index].tanggal
                        );
                        return fullDate.toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        });
                    },
                    label: function (tooltipItem) {
                        return `Jumlah: ${tooltipItem.raw}`;
                    },
                },
            },
        },
    };
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg py-10 min-h-[calc(10/12*100vh)]">
                        {/* Grafik Line (Pendaftar Harian) */}
                        <div className="bg-white p-4 shadow rounded-lg lg:w-4/6 w-5/6 mx-auto">
                            <h3 className="text-lg font-semibold mb-4">
                                Pendaftar Harian (30 Hari Terakhir)
                            </h3>
                            <Line
                                options={options}
                                data={dailyRegistrationChartData}
                            />
                        </div>
                        <div className="flex flex-wrap md:flex-nowrap lg:w-4/6 w-5/6 mt-5 gap-6 mx-auto">
                            {/* Grafik Pie (Gender) */}
                            <div className="bg-white p-4 shadow rounded-lg w-full md:w-2/6">
                                <h3 className="text-lg font-semibold mb-4">
                                    Perbandingan Laki-laki & Perempuan
                                </h3>
                                <div className="md:w-full w-8/12 mx-auto">
                                    <Pie
                                        options={chartOptions}
                                        data={genderChartData}
                                    />
                                </div>
                            </div>

                            {/* Grafik Bar (Usia) */}
                            <div className="bg-white p-4 shadow rounded-lg w-full md:w-4/6">
                                <h3 className="text-lg font-semibold mb-4">
                                    Perbandingan Usia
                                </h3>
                                <Bar
                                    options={chartOptions}
                                    data={ageChartData}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
