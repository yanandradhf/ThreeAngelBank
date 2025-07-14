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

        const fetchedTransactions = await getAllTransactionsByUser(localUser.id);
        setTransactions(fetchedTransactions.slice(-3).reverse());
      } catch (err) {
        console.error("❌ Error loading dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="pt-20 md:pt-24 flex flex-col items-center min-h-screen bg-slate-50">
      <div className="w-full max-w-5xl mx-auto pb-16 px-2 sm:px-4">
        {/* Tombol Tambah Rekening */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate("newaccount")}
            className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:to-emerald-700 text-white font-semibold px-4 py-2 sm:px-5 sm:py-3 rounded-lg shadow-lg transition duration-200 flex items-center gap-2 text-sm sm:text-base"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Tambah Rekening
          </button>
        </div>

        {/* Ringkasan Rekening */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {accounts.map((acc) => (
            <div
              key={acc.id}
              className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-5 flex flex-col items-center hover:shadow-emerald-200 transition"
            >
              <span className="text-xs sm:text-sm text-gray-500 mb-1 capitalize">
                {acc.account_type}
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-emerald-700 mb-2">
                Rp {Number(acc.account_balance).toLocaleString()}
              </span>
              <span className="text-[10px] sm:text-xs text-gray-400 break-all">
                No. Rek: {acc.account_number}
              </span>
            </div>
          ))}
        </div>

        {/* Ringkasan Transaksi */}
        <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-emerald-700 mb-4 sm:mb-6">
            📊 Ringkasan Transaksi Terakhir
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[350px] text-left border-separate border-spacing-y-1 sm:border-spacing-y-2">
              <thead>
                <tr className="text-gray-500 text-xs sm:text-sm">
                  <th className="py-2">Tanggal</th>
                  <th className="py-2">Deskripsi</th>
                  <th className="py-2">Jumlah</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="bg-gray-50 rounded-lg border hover:bg-gray-100 transition"
                  >
                    <td className="py-2 px-2 text-[#434343] rounded-l-lg text-xs sm:text-base">
                      {new Date(tx.transaction_created_at).toLocaleDateString("id-ID")}
                    </td>
                    <td className="py-2 px-2 text-[#434343] text-xs sm:text-base">
                      {tx.transaction_description}
                    </td>
                    <td
                      className={`py-2 px-2 font-semibold text-xs sm:text-base ${
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
                    <td className="py-2 px-2 rounded-r-lg">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
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
                    <td colSpan={4} className="text-center py-6 text-gray-400 text-sm">
                      Belum ada transaksi.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
