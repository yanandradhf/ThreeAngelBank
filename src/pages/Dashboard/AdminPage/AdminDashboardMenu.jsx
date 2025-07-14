import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const API_JSON_SERVER = "http://localhost:5001"; // transaksi
const API_MOCKAPI =
  "https://687288d776a5723aacd50eeb.mockapi.io/ThreeAngelsBank"; // rekening & nasabah

export function AdminDashboardMenu() {
  const [nasabahCount, setNasabahCount] = useState(0);
  const [rekeningCount, setRekeningCount] = useState(0);
  const [transaksiCount, setTransaksiCount] = useState(0);
  const [totalDana, setTotalDana] = useState(0);
  const [savingCount, setSavingCount] = useState(0);
  const [payrollCount, setPayrollCount] = useState(0);
  const [depositCount, setDepositCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [dormantCount, setDormantCount] = useState(0);
  const [suspendCount, setSuspendCount] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [chartDataStatus, setChartDataStatus] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setTransaksiCount(transaksiRes.data.length);

      const total = rekeningRes.data.reduce(
        (acc, item) => acc + Number(item.account_balance || 0),
        0
      );
      setTotalDana(total);

      const saving = rekeningRes.data.filter(
        (item) =>
          item.account_type?.toLowerCase() === "saving" ||
          item.account_type?.toLowerCase() === "tabungan"
      ).length;
      const payroll = rekeningRes.data.filter(
        (item) =>
          item.account_type?.toLowerCase() === "payroll" ||
          item.account_type?.toLowerCase() === "gaji"
      ).length;
      const deposit = rekeningRes.data.filter(
        (item) =>
          item.account_type?.toLowerCase() === "deposit" ||
          item.account_type?.toLowerCase() === "deposito"
      ).length;

      setSavingCount(saving);
      setPayrollCount(payroll);
      setDepositCount(deposit);

      const active = rekeningRes.data.filter(
        (item) =>
          item.account_status?.toLowerCase() === "active" ||
          item.account_status?.toLowerCase() === "aktif"
      ).length;
      const dormant = rekeningRes.data.filter(
        (item) =>
          item.account_status?.toLowerCase() === "dormant" ||
          item.account_status?.toLowerCase() === "tidak aktif"
      ).length;
      const suspend = rekeningRes.data.filter(
        (item) =>
          item.account_status?.toLowerCase() === "suspend" ||
          item.account_status?.toLowerCase() === "suspended" ||
          item.account_status?.toLowerCase() === "ditangguhkan"
      ).length;

      setActiveCount(active);
      setDormantCount(dormant);
      setSuspendCount(suspend);

      setChartData([
        { name: "Saving", value: saving },
        { name: "Payroll", value: payroll },
        { name: "Deposit", value: deposit },
      ]);

      setChartDataStatus([
        { name: "Active", value: active },
        { name: "Dormant", value: dormant },
        { name: "Suspend", value: suspend },
      ]);
    } catch (error) {
      console.error("❌ Error fetching admin dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-7 flex items-center justify-center lg:ms-50">
      <div className="max-w-6xl mx-auto pb-24 w-full px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-emerald-700 mb-10"
        >
          Admin Dashboard
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <Card
            title="Jumlah Nasabah"
            value={nasabahCount}
            icon="👥"
            loading={loading}
          />
          <Card
            title="Jumlah Rekening"
            value={rekeningCount}
            icon="💳"
            loading={loading}
          />
          <Card
            title="Jumlah Transaksi"
            value={transaksiCount}
            icon="🔄"
            loading={loading}
          />
        </div>

        <div className="mb-10">
          <Card
            title="Total Dana Nasabah"
            value={`Rp ${totalDana.toLocaleString("id-ID")}`}
            icon="💰"
            isFullWidth={true}
            loading={loading}
          />
        </div>

        <Section title="Jumlah Rekening per Jenis">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card title="Saving" value={savingCount} icon="💳" loading={loading} />
            <Card title="Payroll" value={payrollCount} icon="💼" loading={loading} />
            <Card title="Deposit" value={depositCount} icon="🏦" loading={loading} />
          </div>
        </Section>

        <Section title="Jumlah Rekening per Status">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card title="Active" value={activeCount} icon="✅" loading={loading} />
            <Card title="Dormant" value={dormantCount} icon="😴" loading={loading} />
            <Card title="Suspend" value={suspendCount} icon="🚫" loading={loading} />
          </div>
        </Section>

        <Section title="Visualisasi Jenis Rekening">
          <div className="grid grid-cols-1 md:grid-cols-2">

          <div className="w-full h-72 flex items-center justify-center">
            {loading ? (
              // Skeleton lingkaran besar untuk Pie Chart
              <div className="animate-pulse rounded-full bg-gray-300 w-72 h-72" />
            ) : (
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#00b894"
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="w-full h-72 flex items-center justify-center">
            {loading ? (
              // Skeleton lingkaran besar untuk Pie Chart
              <div className="animate-pulse rounded-full bg-gray-300 w-72 h-72" />
            ) : (
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={chartDataStatus}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#00b894"
                    label
                  >
                    {chartDataStatus.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          </div>
        </Section>
      </div>
    </main>
  );
}

function Card({ title, value, icon, isFullWidth = false, loading }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`bg-white rounded-2xl shadow-xl border border-emerald-100 p-6 text-center flex flex-col items-center ${
        isFullWidth ? "py-8 col-span-full" : ""
      }`}
    >
      {/* Icon */}
      {loading ? (
        <div
          className={`animate-pulse bg-gray-300 rounded-full mb-2 ${
            isFullWidth ? "h-16 w-16" : "h-12 w-12"
          }`}
        />
      ) : (
        <div className={`mb-2 ${isFullWidth ? "text-4xl" : "text-3xl"}`}>
          {icon}
        </div>
      )}

      {/* Title */}
      {loading ? (
        <div
          className={`animate-pulse bg-gray-300 rounded mb-1 ${
            isFullWidth ? "h-6 w-40" : "h-5 w-28"
          }`}
        />
      ) : (
        <h2
          className={`text-gray-500 mb-1 ${isFullWidth ? "text-lg" : "text-md"}`}
        >
          {title}
        </h2>
      )}

      {/* Value */}
      {loading ? (
        <div
          className={`animate-pulse rounded bg-gray-300 ${
            isFullWidth ? "h-12 w-48 mx-auto" : "h-8 w-24"
          }`}
        />
      ) : (
        <span
          className={`font-bold text-emerald-700 ${
            isFullWidth ? "text-3xl" : "text-2xl"
          }`}
        >
          {value}
        </span>
      )}
    </motion.div>
  );
}

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

const COLORS = ["#00b894", "#fdcb6e", "#0984e3"];
