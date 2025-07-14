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
    } catch (error) {
      console.error("❌ Error fetching admin dashboard data:", error);
    }
  };

  return (
    <main className="pt-7 flex items-center justify-center ms-50">
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
          <Card title="Jumlah Nasabah" value={nasabahCount} icon="👥" />
          <Card title="Jumlah Rekening" value={rekeningCount} icon="💳" />
          <Card title="Jumlah Transaksi" value={transaksiCount} icon="🔄" />
        </div>

        <div className="mb-10">
          <Card
            title="Total Dana Nasabah"
            value={`Rp ${totalDana.toLocaleString("id-ID")}`}
            icon="💰"
            isFullWidth={true}
          />
        </div>

        <Section title="Jumlah Rekening per Jenis">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card title="Saving" value={savingCount} icon="💳" />
            <Card title="Payroll" value={payrollCount} icon="💼" />
            <Card title="Deposit" value={depositCount} icon="🏦" />
          </div>
        </Section>

        <Section title="Jumlah Rekening per Status">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card title="Active" value={activeCount} icon="✅" />
            <Card title="Dormant" value={dormantCount} icon="😴" />
            <Card title="Suspend" value={suspendCount} icon="🚫" />
          </div>
        </Section>

        <Section title="Visualisasi Jenis Rekening">
          <div className="w-full h-72">
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
          </div>
        </Section>
      </div>
    </main>
  );
}

function Card({ title, value, icon, isFullWidth = false }) {
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03 }}
        className={`bg-white rounded-2xl shadow-xl border border-emerald-100 p-6 text-center flex flex-col items-center ${
          isFullWidth ? "py-8 col-span-full" : ""
        }`}
      >
        <div className={`mb-2 ${isFullWidth ? "text-4xl" : "text-3xl"}`}>
          {icon}
        </div>
        <h2
          className={`text-gray-500 mb-1 ${
            isFullWidth ? "text-lg" : "text-md"
          }`}
        >
          {title}
        </h2>
        <span
          className={`font-bold text-emerald-700 ${
            isFullWidth ? "text-3xl" : "text-2xl"
          }`}
        >
          {value}
        </span>
      </motion.div>
    </>
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
