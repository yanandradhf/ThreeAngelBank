import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
import { useAccount } from "../../../context/useAccount";
import { useAuth } from "../../../context/useAuth";

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
  const { getAccountsByUserId } = useAccount();
  const user = JSON.parse(localStorage.getItem("user"));

  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ accountId: "", type: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const txData = await getAllTransactionsByUser(user?.id);
        setTransactions(txData);

        const accData = await getAccountsByUserId(user?.id);
        setAccounts(accData);
      } catch (err) {
        console.error("Gagal memuat data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchData();
  }, [user?.id]);

  const accountIds = accounts.map((acc) => String(acc.id));

  const filteredTx = transactions.filter((tx) => {
    const isOwnAccount = accountIds.includes(String(tx.account_id_sender));
    const accountMatch = filter.accountId
      ? String(tx.account_id_sender) === String(filter.accountId)
      : true;
    const typeMatch = filter.type ? tx.transaction_type === filter.type : true;
    return isOwnAccount && accountMatch && typeMatch;
  });

  const accountInfoMap = accounts.reduce((map, acc) => {
    map[acc.id] = `${acc.account_type} - ${acc.account_number}`;
    return map;
  }, {});

  const pemasukan = filteredTx
    .filter(
      (tx) =>
        tx.transaction_type === "deposit" ||
        tx.transaction_type === "incoming_transfer"
    )
    .reduce((total, tx) => total + Number(tx.transaction_amount), 0);

  const pengeluaran = filteredTx
    .filter(
      (tx) =>
        tx.transaction_type === "withdraw" ||
        tx.transaction_type === "outgoing_transfer"
    )
    .reduce((total, tx) => total + Number(tx.transaction_amount), 0);

  const monthlyStats = Array(12)
    .fill(0)
    .map((_, i) => {
      const txsPerMonth = filteredTx.filter((tx) => {
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
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl border border-emerald-100 p-10 w-full max-w-5xl flex flex-col gap-10 mx-4"
      >
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-600 via-emerald-400 to-green-400 bg-clip-text text-transparent text-center tracking-wide">
          User Financial Analytics
        </h2>

        {/* Filter */}
        <div className="flex flex-wrap gap-4 justify-center">
          <select
            value={filter.accountId}
            onChange={(e) =>
              setFilter((f) => ({ ...f, accountId: e.target.value }))
            }
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">Semua Rekening</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.account_number} - {acc.account_type}
              </option>
            ))}
          </select>

          <select
            value={filter.type}
            onChange={(e) => setFilter((f) => ({ ...f, type: e.target.value }))}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">Semua Tipe</option>
            <option value="deposit">Deposit</option>
            <option value="withdraw">Withdraw</option>
            <option value="incoming_transfer">Incoming Transfer</option>
            <option value="outgoing_transfer">Outgoing Transfer</option>
          </select>
        </div>

        {/* Grafik */}
        <div className="rounded-xl overflow-hidden shadow-lg border border-emerald-100 bg-emerald-50/20 p-6">
          <Bar data={chartData} options={chartOptions} />
        </div>

        {/* Summary Card */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-emerald-50 rounded-xl shadow p-6 flex flex-col items-center border border-emerald-100">
            <span className="text-sm text-gray-500 mb-2">Total Pemasukan</span>
            <span className="text-3xl font-bold text-emerald-700 mb-2">
              Rp {pemasukan.toLocaleString()}
            </span>
          </div>
          <div className="bg-red-50 rounded-xl shadow p-6 flex flex-col items-center border border-red-100">
            <span className="text-sm text-gray-500 mb-2">
              Total Pengeluaran
            </span>
            <span className="text-3xl font-bold text-red-500 mb-2">
              Rp {pengeluaran.toLocaleString()}
            </span>
          </div>
          <div className="bg-sky-50 rounded-xl shadow p-6 flex flex-col items-center border border-sky-100">
            <span className="text-sm text-gray-500 mb-2">Total Transaksi</span>
            <span className="text-3xl font-bold text-sky-600 mb-2">
              {transactions.length}
            </span>
          </div>
        </div>

        {/* Semua Transaksi */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-emerald-100">
          <h2 className="text-xl font-semibold text-emerald-700 mb-4">
            Riwayat Transaksi
          </h2>
          <div className="overflow-y-auto max-h-80">
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-white z-10">
                <tr className="text-gray-500 text-sm border-b">
                  <th className="py-2">Tanggal</th>
                  <th className="py-2">Deskripsi</th>
                  <th className="py-2">Jumlah</th>
                  <th className="py-2">Rekening Asal</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTx
                  .slice()
                  .reverse()
                  .map((tx) => (
                    <motion.tr
                      key={tx.id}
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-2 text-[#434343]">
                        {new Date(tx.transaction_created_at).toLocaleDateString(
                          "id-ID"
                        )}
                      </td>
                      <td className="py-3 px-2 text-gray-600">
                        {tx.transaction_description || tx.transaction_type}
                      </td>
                      <td
                        className={`py-3 px-2 font-semibold ${
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
                      <td className="py-2 text-[#434343] text-sm">
                        {accountInfoMap[tx.account_id_sender] ||
                          `ID ${tx.account_id_sender}`}
                      </td>

                      <td className="py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            tx.transaction_status === "success"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {tx.transaction_status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
