import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const API_JSON_SERVER = "http://localhost:5001"; // transaksi
const API_MOCKAPI =
  "https://687288d776a5723aacd50eeb.mockapi.io/ThreeAngelsBank"; // rekening & nasabah

export function AdminDashboardMenu() {
  const [nasabahCount, setNasabahCount] = useState(0);
  const [rekeningCount, setRekeningCount] = useState(0);
  const [transaksiCount, setTransaksiCount] = useState(0);
  const [totalDana, setTotalDana] = useState(0);
  const [rekeningByType, setRekeningByType] = useState({});

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

      // Jumlah data
      setNasabahCount(nasabahRes.data.length);
      setRekeningCount(rekeningRes.data.length);
      setTransaksiCount(transaksiRes.data.length);

      // Total dana
      const total = rekeningRes.data.reduce(
        (acc, item) => acc + Number(item.account_balance),
        0
      );
      setTotalDana(total);

      // Rekening berdasarkan type
      const typeCounts = rekeningRes.data.reduce((acc, item) => {
        const type = item.account_type || "lainnya";
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {});
      setRekeningByType(typeCounts);
    } catch (error) {
      console.error("❌ Error fetching admin dashboard data:", error);
    }
  };

  return (
    <main className="pt-24 ps-50 flex items-center justify-center">
      <div className="max-w-6xl mx-auto pb-24 w-full px-4">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-emerald-700 mb-10"
        >
          Admin Dashboard
        </motion.h1>

        {/* Summary Cards */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 w-full">
            <Card title="Jumlah Nasabah" value={nasabahCount} icon="👥" />
            <Card title="Jumlah Rekening" value={rekeningCount} icon="💳" />
            <Card title="Jumlah Transaksi" value={transaksiCount} icon="🔄" />
            <Card
              title="Total Dana Nasabah"
              value={`Rp ${totalDana.toLocaleString()}`}
              icon="💰"
            />
          </div>
        </div>

        {/* Rekening by Type */}
        <Section title="📂 Rekening Berdasarkan Tipe">
          <div className="flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
              {Object.entries(rekeningByType).map(([type, count], i) => (
                <Card key={i} title={type} value={count} />
              ))}

              {Object.keys(rekeningByType).length === 0 && (
                <p className="text-gray-400 text-sm">
                  Belum ada data rekening.
                </p>
              )}
            </div>
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
