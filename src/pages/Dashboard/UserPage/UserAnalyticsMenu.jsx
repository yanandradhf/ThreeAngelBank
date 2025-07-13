import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useTransaction } from "../../../context/useTransaction";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function UserAnalyticsMenu() {
  const { getAllTransactionsByUser } = useTransaction();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getAllTransactionsByUser(user?.id);
        setTransactions(data);
      } catch (err) {
        console.error("Gagal memuat transaksi:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchTransactions();
  }, [user?.id]);

  const pemasukan = transactions
    .filter(
      (tx) =>
        tx.transaction_type === "deposit" ||
        tx.transaction_type === "incoming_transfer"
    )
    .reduce((total, tx) => total + Number(tx.transaction_amount), 0);

  const pengeluaran = transactions
    .filter(
      (tx) =>
        tx.transaction_type === "withdraw" ||
        tx.transaction_type === "outgoing_transfer"
    )
    .reduce((total, tx) => total + Number(tx.transaction_amount), 0);

  const monthlyStats = Array(12)
    .fill(0)
    .map((_, i) => {
      const txsPerMonth = transactions.filter((tx) => {
        const date = new Date(tx.transaction_created_at);
        return date.getMonth() === i;
      });

      const pemasukanBulan = txsPerMonth
        .filter(
          (tx) =>
            tx.transaction_type === "deposit" ||
            tx.transaction_type === "incoming_transfer"
        )
        .reduce((sum, tx) => sum + Number(tx.transaction_amount), 0);

      const pengeluaranBulan = txsPerMonth
        .filter(
          (tx) =>
            tx.transaction_type === "withdraw" ||
            tx.transaction_type === "outgoing_transfer"
        )
        .reduce((sum, tx) => sum + Number(tx.transaction_amount), 0);

      return {
        pemasukan: pemasukanBulan,
        pengeluaran: pengeluaranBulan,
      };
    });

  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ],
    datasets: [
      {
        label: "Pemasukan",
        data: monthlyStats.map((m) => m.pemasukan),
        backgroundColor: "#10b981",
      },
      {
        label: "Pengeluaran",
        data: monthlyStats.map((m) => m.pengeluaran),
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Memuat data analitik...
      </div>
    );
  }

  return (
    <main className="ps-50 flex items-center justify-center pt-24 pb-24">
      <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-8 w-full max-w-3xl flex flex-col gap-8 mx-4">
        <h2 className="text-2xl font-bold text-emerald-700 mb-2 text-center">
          User Analytics
        </h2>

        {/* Grafik */}
        <div>
          <Bar data={chartData} options={chartOptions} />
        </div>

        {/* Ringkasan */}
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div className="bg-emerald-50 rounded-xl shadow p-6 flex flex-col items-center border border-emerald-100">
            <span className="text-sm text-gray-500 mb-2">Total Pemasukan</span>
            <span className="text-2xl font-bold text-emerald-700 mb-2">
              Rp {pemasukan.toLocaleString()}
            </span>
          </div>
          <div className="bg-red-50 rounded-xl shadow p-6 flex flex-col items-center border border-red-100">
            <span className="text-sm text-gray-500 mb-2">
              Total Pengeluaran
            </span>
            <span className="text-2xl font-bold text-red-500 mb-2">
              Rp {pengeluaran.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Semua Transaksi */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-emerald-100">
          <h2 className="text-xl font-semibold text-emerald-700 mb-4">
            Semua Riwayat Transaksi
          </h2>
          <div className="overflow-y-auto max-h-80">
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-white z-10">
                <tr className="text-gray-500 text-sm border-b">
                  <th className="py-2">Tanggal</th>
                  <th className="py-2">Deskripsi</th>
                  <th className="py-2">Jumlah</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions
                  .slice()
                  .reverse()
                  .map((tx) => (
                    <tr key={tx.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 text-[#434343]">
                        {new Date(tx.transaction_created_at).toLocaleDateString(
                          "id-ID"
                        )}
                      </td>
                      <td className="py-2 text-[#434343]">
                        {tx.transaction_description || tx.transaction_type}
                      </td>
                      <td
                        className={`py-2 font-semibold ${
                          tx.transaction_type === "withdraw" ||
                          tx.transaction_type === "outgoing_transfer"
                            ? "text-red-500"
                            : "text-green-600"
                        }`}
                      >
                        {tx.transaction_type === "withdraw" ||
                        tx.transaction_type === "outgoing_transfer"
                          ? `-Rp ${Number(
                              tx.transaction_amount
                            ).toLocaleString()}`
                          : `+Rp ${Number(
                              tx.transaction_amount
                            ).toLocaleString()}`}
                      </td>

                      <td className="py-2">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            tx.transaction_status === "success"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {tx.transaction_status}
                        </span>
                      </td>
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
