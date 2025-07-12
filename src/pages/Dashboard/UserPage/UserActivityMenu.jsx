import { useState } from "react";
// Chart library (pakai chart.js via react-chartjs-2)
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function UserActivityMenu() {
  // Dummy data transaksi
  const transactionTypes = ["Transfer", "Setoran", "Penarikan", "Pembayaran"];
  const transactionData = [5, 3, 2, 4];
  const history = [
    { id: 1, type: "Transfer", amount: 100000, date: "2025-07-10", desc: "Ke BCA" },
    { id: 2, type: "Setoran", amount: 500000, date: "2025-07-09", desc: "Gaji" },
    { id: 3, type: "Penarikan", amount: 200000, date: "2025-07-08", desc: "ATM" },
    { id: 4, type: "Pembayaran", amount: 150000, date: "2025-07-07", desc: "Listrik" },
    { id: 5, type: "Transfer", amount: 250000, date: "2025-07-06", desc: "Ke Mandiri" },
  ];

  const chartData = {
    labels: transactionTypes,
    datasets: [
      {
        label: "Jumlah Transaksi",
        data: transactionData,
        backgroundColor: [
          "#10b981",
          "#34d399",
          "#6ee7b7",
          "#a7f3d0",
        ],
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Aktivitas Berdasarkan Tipe Transaksi" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <main className="min-h-screen w-screen bg-gradient-to-br from-emerald-50 to-emerald-100 flex flex-col items-center justify-start pt-24 pb-24">
      <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-8 w-full max-w-2xl flex flex-col gap-8 mx-4">
        <h2 className="text-2xl font-bold text-emerald-700 mb-2 text-center">Aktivitas User</h2>
        {/* Chart Aktivitas */}
        <div className="mb-8">
          <Bar data={chartData} options={chartOptions} />
        </div>
        {/* History Transaksi */}
        <div>
          <h3 className="text-lg font-semibold text-emerald-600 mb-4">History Transaksi</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-emerald-100">
                  <th className="py-2 px-4 text-left">Tanggal</th>
                  <th className="py-2 px-4 text-left">Tipe</th>
                  <th className="py-2 px-4 text-left">Jumlah</th>
                  <th className="py-2 px-4 text-left">Deskripsi</th>
                </tr>
              </thead>
              <tbody>
                {history.map((tx) => (
                  <tr key={tx.id} className="border-b">
                    <td className="py-2 px-4">{tx.date}</td>
                    <td className="py-2 px-4">{tx.type}</td>
                    <td className="py-2 px-4">Rp {tx.amount.toLocaleString()}</td>
                    <td className="py-2 px-4">{tx.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}