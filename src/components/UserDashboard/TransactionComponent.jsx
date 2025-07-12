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
import { useAccount } from "../../hooks/useAccount";

// Warna untuk tiap jenis transaksi
const COLORS = {
  deposit: "#22c55e", // green
  withdraw: "#ef4444", // red
  outgoing_transfer: "#3b82f6", // blue
  incoming_transfer: "#f59e0b", // amber
};

export default function UserTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const { getAllTransactionsByUser } = useTransaction();
  const { getAccountsByUserId } = useAccount();

  useEffect(() => {
    let isFetched = false;

    const fetchData = async () => {
      if (!user?.id || isFetched) return;

      isFetched = true;
      try {
        const [tx, acc] = await Promise.all([
          getAllTransactionsByUser(user.id),
          getAccountsByUserId(user.id),
        ]);

        setTransactions(tx || []);
        setAccounts(acc || []);
      } catch (err) {
        console.error("⚠️ Gagal fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter transaksi berdasarkan jenis & akun
  const filtered =
    filterType === "all" && selectedAccountId === "all"
      ? transactions
      : transactions.filter((tx) => {
          const byType =
            filterType === "all" || tx.transaction_type === filterType;
          const byAccount =
            selectedAccountId === "all" ||
            String(tx.account_id_sender) === selectedAccountId;
          return byType && byAccount;
        });

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

      {/* Filter Dropdowns */}
      <div className="flex items-center gap-4 flex-wrap">
        {/* Filter Jenis Transaksi */}
        <div className="flex items-center gap-2">
          <label className="font-medium">Jenis:</label>
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

        {/* Filter Rekening */}
        <div className="flex items-center gap-2">
          <label className="font-medium">Rekening:</label>
          <select
            className="border rounded px-2 py-1"
            value={selectedAccountId}
            onChange={(e) => setSelectedAccountId(e.target.value)}
          >
            <option value="all">Semua</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={String(acc.id)}>
                {acc.account_number} - {acc.account_type}
              </option>
            ))}
          </select>
        </div>
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
                  animationDuration={0}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Riwayat Transaksi */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Log Transaksi</h3>
        {loading ? (
          <p className="text-gray-400 italic">Memuat log transaksi...</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-400">Belum ada transaksi.</p>
        ) : (
          <ul className="space-y-2 max-h-72 overflow-y-auto text-sm">
            {[...filtered]
              .sort(
                (a, b) =>
                  new Date(b.transaction_created_at) -
                  new Date(a.transaction_created_at)
              )
              .map((tx) => (
                <li key={tx.id} className="border-b pb-2">
                  <p className="font-semibold text-gray-800">
                    {tx.transaction_description}
                  </p>
                  <p className="text-gray-600">
                    {tx.transaction_type.toUpperCase()} - Rp
                    {Number(tx.transaction_amount).toLocaleString("id-ID")}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(tx.transaction_created_at).toLocaleString(
                      "id-ID"
                    )}
                  </p>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
