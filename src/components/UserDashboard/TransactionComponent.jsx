import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { useTransaction } from "../../hooks/useTransaction";

// Warna untuk tiap jenis transaksi
const COLORS = {
  deposit: "#22c55e", // green
  withdraw: "#ef4444", // red
  outgoing_transfer: "#3b82f6", // blue
  incoming_transfer: "#f59e0b", // amber
};

export default function UserTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const { getTransactionsByAccount } = useTransaction();

  // Ambil data saat mount
  useEffect(() => {
    if (user) {
      getTransactionsByAccount(user.id).then((data) => {
        setTransactions(data || []);
        setLoading(false);
      });
    }
  }, [user]);

  // Filter transaksi sesuai pilihan dropdown
  const filtered =
    filterType === "all"
      ? transactions
      : transactions.filter((tx) => tx.transaction_type === filterType);

  // Siapkan data untuk chart
  const chartData = filtered.map((tx) => ({
    name: new Date(tx.transaction_created_at).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
    }),
    [tx.transaction_type]: tx.transaction_amount,
  }));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Riwayat Transaksi</h2>

      {/* Filter Dropdown */}
      <div className="flex items-center gap-3">
        <label className="font-medium">Filter:</label>
        <select
          className="border rounded px-2 py-1"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">Semua</option>
          <option value="deposit">Deposit</option>
          <option value="withdraw">Withdraw</option>
          <option value="outgoing_transfer">Transfer Keluar</option>
          <option value="incoming_transfer">Transfer Masuk</option>
        </select>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Grafik Transaksi</h3>

        {loading ? (
          <p className="text-gray-400 italic">Memuat grafik transaksi...</p>
        ) : chartData.length === 0 ? (
          <p className="text-gray-400">Belum ada transaksi.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(v) => `Rp${Number(v).toLocaleString("id-ID")}`}
              />
              <Legend />
              {Object.entries(COLORS).map(([type, color]) => (
                <Bar
                  key={type}
                  dataKey={type}
                  name={type.replace(/_/g, " ").toUpperCase()}
                  fill={color}
                  stackId="a"
                  barSize={30}
                  radius={[4, 4, 0, 0]}
                  animationDuration={0} // Matikan animasi agar bar muncul langsung
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Riwayat Transaksi (Log) */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Log Transaksi</h3>
        {loading ? (
          <p className="text-gray-400 italic">Memuat log transaksi...</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-400">Belum ada transaksi.</p>
        ) : (
          <ul className="space-y-2 max-h-72 overflow-y-auto text-sm">
            {filtered.map((tx) => (
              <li key={tx.id} className="border-b pb-2">
                <p className="font-semibold text-gray-800">
                  {tx.transaction_description}
                </p>
                <p className="text-gray-600">
                  {tx.transaction_type.toUpperCase()} - Rp
                  {Number(tx.transaction_amount).toLocaleString("id-ID")}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(tx.transaction_created_at).toLocaleString("id-ID")}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
