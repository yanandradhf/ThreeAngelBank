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
  const [loading, setLoading] = useState(true); // 🔹 Tambah loading state

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
        setTransactions(fetchedTransactions.slice(-3).reverse());
      } catch (err) {
        console.error("❌ Error loading dashboard data:", err);
      } finally {
        setLoading(false); // 🔹 Set selesai loading
      }
    };

    fetchData();
  }, []);

  return (
    <main className="pt-24 ps-50 flex items-center justify-center">
      <div className="max-w-5xl mx-auto pb-24 w-full px-4">
        {/*Tombol Tambah Rekening */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate("newaccount")}
            className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:to-emerald-700 text-white font-semibold px-5 py-3 rounded-lg shadow-lg transition duration-200 flex items-center gap-2"
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
            </svg>{" "}
            Tambah Rekening
            {/*Tambah Rekening*/}
          </button>
        </div>
        {/* Ringkasan Rekening */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {loading
            ? Array.from({ length: accounts.length || 3 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl animate-pulse shadow-xl"
                >
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                  <div className="h-6 bg-gray-300 rounded w-1/2 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                </div>
              ))
            : accounts.map((acc) => {
                const bgClass =
                  acc.account_type === "saving"
                    ? "bg-red-50 border-red-200"
                    : acc.account_type === "deposit"
                    ? "bg-sky-50 border-sky-200"
                    : acc.account_type === "payroll"
                    ? "bg-amber-50 border-amber-200"
                    : "bg-gray-50 border-gray-200";

                const textClass =
                  acc.account_type === "saving"
                    ? "text-red-700"
                    : acc.account_type === "deposit"
                    ? "text-sky-700"
                    : acc.account_type === "payroll"
                    ? "text-amber-700"
                    : "text-gray-700";

                return (
                  <div
                    key={acc.id}
                    className={`rounded-2xl shadow-xl p-6 flex flex-col items-center transition hover:shadow-md ${bgClass}`}
                  >
                    <span className="text-sm text-gray-500 mb-1">
                      {acc.account_type}
                    </span>
                    <span className={`text-3xl font-bold mb-2 ${textClass}`}>
                      Rp {Number(acc.account_balance).toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-400">
                      No. Rek: {acc.account_number}
                    </span>
                  </div>
                );
              })}
        </div>
        {/* Ringkasan Transaksi */}
        <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-6">
          <h2 className="text-2xl font-bold text-emerald-700 mb-6">
            Ringkasan Transaksi Terakhir
          </h2>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: transactions.length || 3 }).map(
                  (_, i) => (
                    <div
                      key={i}
                      className="flex justify-between animate-pulse bg-gray-50 p-3 rounded-lg"
                    >
                      <div className="w-1/5 h-4 bg-gray-200 rounded" />
                      <div className="w-2/5 h-4 bg-gray-200 rounded" />
                      <div className="w-1/5 h-4 bg-gray-200 rounded" />
                      <div className="w-1/5 h-4 bg-gray-200 rounded" />
                    </div>
                  )
                )}
              </div>
            ) : (
              <table className="w-full text-left border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-gray-500 text-sm">
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
                      <td className="py-3 px-2 text-[#434343] rounded-l-lg">
                        {new Date(tx.transaction_created_at).toLocaleDateString(
                          "id-ID"
                        )}
                      </td>
                      <td className="py-3 px-2 text-[#434343]">
                        {tx.transaction_description}
                      </td>
                      <td
                        className={`py-3 px-2 font-semibold ${
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
                      <td className="py-3 px-2 rounded-r-lg">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
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
                      <td
                        colSpan={4}
                        className="text-center py-6 text-gray-400 text-sm"
                      >
                        Belum ada transaksi.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
