import { useNavigate } from "react-router-dom";
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

export function UserAnalyticsMenu(){
    // Dummy data analytics
    const pemasukan = 12000000;
    const pengeluaran = 8000000;
    const history = [
      {
        id: 1,
        date: "12/07/2025",
        desc: "Transfer ke BCA",
        amount: 1000000,
        type: "outgoing_transfer",
        status: "Sukses",
      },
      {
        id: 2,
        date: "11/07/2025",
        desc: "Top Up",
        amount: 2000000,
        type: "deposit",
        status: "Sukses",
      },
      {
        id: 3,
        date: "10/07/2025",
        desc: "Pembayaran PLN",
        amount: 500000,
        type: "outgoing_transfer",
        status: "Pending",
      },
    ];
    const chartData = {
      labels: [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli",
        "Agustus", "September", "Oktober", "November", "Desember"
      ],
      datasets: [
        {
          label: "Pemasukan",
          data: [2000000, 1500000, 1800000, 1700000, 1600000, 1900000, 2100000, 2200000, 2300000, 2000000, 2100000, 2200000],
          backgroundColor: "#10b981",
        },
        {
          label: "Pengeluaran",
          data: [1200000, 1300000, 1100000, 1400000, 1500000, 1200000, 1300000, 1250000, 1350000, 1400000, 1200000, 1300000],
          backgroundColor: "#f87171",
        },
      ],
    };
    const chartOptions = {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: { display: true, text: "Pemasukan & Pengeluaran Bulanan" },
      },
      scales: {
        y: { beginAtZero: true },
      },
    };
    return(
      <main className="ps-50 flex items-center justify-center pt-24 pb-24">
        <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-8 w-full max-w-3xl flex flex-col gap-8 mx-4">
          <h2 className="text-2xl font-bold text-emerald-700 mb-2 text-center">User Analytics</h2>
          {/* Chart Analytics */}
          <div className="mb-8">
            <Bar data={chartData} options={chartOptions} />
          </div>
          {/* Ringkasan Pemasukan/Pengeluaran */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-emerald-50 rounded-xl shadow p-6 flex flex-col items-center border border-emerald-100">
              <span className="text-sm text-gray-500 mb-2">Total Pemasukan</span>
              <span className="text-2xl font-bold text-emerald-700 mb-2">Rp {pemasukan.toLocaleString()}</span>
            </div>
            <div className="bg-red-50 rounded-xl shadow p-6 flex flex-col items-center border border-red-100">
              <span className="text-sm text-gray-500 mb-2">Total Pengeluaran</span>
              <span className="text-2xl font-bold text-red-500 mb-2">Rp {pengeluaran.toLocaleString()}</span>
            </div>
          </div>
          {/* History Transaksi */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-emerald-100">
              <h2 className="text-xl font-semibold text-emerald-700 mb-4">Ringkasan Transaksi Terakhir</h2>
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-500 text-sm border-b">
                    <th className="py-2">Tanggal</th>
                    <th className="py-2">Deskripsi</th>
                    <th className="py-2">Jumlah</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 text-[#434343]">12/07/2025</td>
                    <td className="py-2 text-[#434343]">Transfer ke BCA</td>
                    <td className="py-2 text-emerald-600 font-semibold">-Rp 1.000.000</td>
                    <td className="py-2"><span className="px-2 py-1 rounded bg-emerald-100 text-emerald-700 text-xs">Sukses</span></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-[#434343]">11/07/2025</td>
                    <td className="py-2 text-[#434343]">Top Up</td>
                    <td className="py-2 text-emerald-600 font-semibold">+Rp 2.000.000</td>
                    <td className="py-2"><span className="px-2 py-1 rounded bg-emerald-100 text-emerald-700 text-xs">Sukses</span></td>
                  </tr>
                  <tr>
                    <td className="py-2 text-[#434343]">10/07/2025</td>
                    <td className="py-2 text-[#434343]">Pembayaran PLN</td>
                    <td className="py-2 text-emerald-600 font-semibold">-Rp 500.000</td>
                    <td className="py-2"><span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs">Pending</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>
      </main>
    );
}