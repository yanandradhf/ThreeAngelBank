import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const API_JSON_SERVER = "http://localhost:5001"; // transaksi
const API_MOCKAPI =
  "https://687288d776a5723aacd50eeb.mockapi.io/ThreeAngelsBank"; // rekening & nasabah

export function AdminNasabahMenu() {
  const [nasabahCount, setNasabahCount] = useState(0);
  const [rekeningCount, setRekeningCount] = useState(0);
  const [topTransactions, setTopTransactions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [nasabahRes, rekeningRes, transaksiRes] = await Promise.all([
        axios.get(`${API_MOCKAPI}/users`),
        axios.get(`${API_MOCKAPI}/accounts`),
        axios.get(`${API_JSON_SERVER}/transactions`),
      ]);

      setNasabahCount(nasabahRes.data.length);
      setRekeningCount(rekeningRes.data.length);

      const sortedTransactions = transaksiRes.data
        .sort(
          (a, b) => Number(b.transaction_amount) - Number(a.transaction_amount)
        )
        .slice(0, 5);
      setTopTransactions(sortedTransactions);
    } catch (error) {
      console.error("❌ Error fetching data:", error);
    }
  };

  return (
    <main className="pt-24 ps-50 flex items-center justify-center">
      <div className="max-w-5xl mx-auto pb-24 w-full px-4">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-emerald-700 mb-10"
        >
          Kelola Nasabah
        </motion.h1>

        {/* Summary Cards */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 w-full">
            <Card title="Total Nasabah" value={nasabahCount} icon="👥" />
            <Card title="Total Rekening" value={rekeningCount} icon="💳" />
          </div>
        </div>

        {/* Top 5 Transaksi */}
        <Section title="🔥 Top 5 Transaksi Terbesar">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr className="text-gray-500 text-sm">
                  <th className="py-2">Tanggal</th>
                  <th className="py-2">Deskripsi</th>
                  <th className="py-2">Jumlah</th>
                  <th className="py-2">Tipe</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {topTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="bg-gray-50 rounded-lg border hover:bg-gray-100 transition"
                  >
                    <td className="py-3 px-2 rounded-l-lg text-[#434343]">
                      {new Date(tx.transaction_created_at).toLocaleDateString(
                        "id-ID"
                      )}
                    </td>
                    <td className="py-3 px-2 text-[#434343]">
                      {tx.transaction_description}
                    </td>
                    <td className="py-3 px-2 font-semibold text-emerald-700">
                      Rp {Number(tx.transaction_amount).toLocaleString()}
                    </td>
                    <td className="py-3 px-2">{tx.transaction_type}</td>
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

                {topTransactions.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-6 text-gray-400 text-sm"
                    >
                      Belum ada transaksi.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Section>
      </div>
    </main>
  );
}

// Card Component
function Card({ title, value, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-6 text-center flex flex-col items-center"
    >
      <div className="text-3xl mb-2">{icon}</div>
      <h2 className="text-md text-gray-500 mb-1">{title}</h2>
      <span className="text-2xl font-bold text-emerald-700">{value}</span>
    </motion.div>
  );
}

// Section Component
function Section({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-6 mb-10"
    >
      <h2 className="text-2xl font-bold text-emerald-700 mb-6">{title}</h2>
      {children}
    </motion.div>
  );
}
