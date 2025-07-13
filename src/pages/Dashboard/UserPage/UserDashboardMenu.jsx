import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/useAuth";
import { useAccount } from "../../../context/useAccount";
import { useTransaction } from "../../../context/useTransaction";

export function UserDashboardMenu() {
  const navigate = useNavigate();
  const { getUserById } = useAuth();
  const { getAccountsByUserId } = useAccount();
  const { getAllTransactionsByUser } = useTransaction();

  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const localUser = JSON.parse(localStorage.getItem("user"));
      if (!localUser || !localUser.id) {
        navigate("/login");
        return;
      }

      try {
        const fetchedUser = await getUserById(localUser.id);
        setUser(fetchedUser);

        const fetchedAccounts = await getAccountsByUserId(localUser.id);
        setAccounts(fetchedAccounts);

        const fetchedTransactions = await getAllTransactionsByUser(
          localUser.id
        );
        setTransactions(fetchedTransactions.slice(-3).reverse()); // ambil 3 transaksi terakhir
      } catch (err) {
        console.error("❌ Error loading dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="pt-30 ps-50 flex items-center justify-center">
      <div className="max-w-5xl mx-auto pb-30">
        {/* Tombol Tambah Rekening */}
        <div className="flex justify-end mb-4">
          <button
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition-colors duration-200 flex items-center gap-2"
            onClick={() => navigate("newaccount")}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Tambah Rekening
          </button>
        </div>

        {/* Ringkasan Rekening */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {accounts.map((acc) => (
            <div
              key={acc.id}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border border-emerald-100"
            >
              <span className="text-sm text-gray-500 mb-2">
                {acc.account_type}
              </span>
              <span className="text-2xl font-bold text-emerald-700 mb-2">
                Rp {Number(acc.account_balance).toLocaleString()}
              </span>
              <span className="text-xs text-gray-400">
                No. Rekening: {acc.account_number}
              </span>
            </div>
          ))}
        </div>

        {/* Ringkasan Transaksi */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-emerald-100">
          <h2 className="text-xl font-semibold text-emerald-700 mb-4">
            Ringkasan Transaksi Terakhir
          </h2>
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
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b">
                  <td className="py-2 text-[#434343]">
                    {new Date(tx.transaction_created_at).toLocaleDateString()}
                  </td>
                  <td className="py-2 text-[#434343]">
                    {tx.transaction_description}
                  </td>
                  <td
                    className={`py-2 font-semibold ${
                      tx.transaction_type === "deposit" ||
                      tx.transaction_type === "incoming_transfer"
                        ? "text-emerald-600"
                        : "text-red-500"
                    }`}
                  >
                    {tx.transaction_type === "deposit" ||
                    tx.transaction_type === "incoming_transfer"
                      ? "+"
                      : "-"}
                    Rp {Number(tx.transaction_amount).toLocaleString()}
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
              {transactions.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-400">
                    Belum ada transaksi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
