import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/useAuth";
import { useAccount } from "../../../context/useAccount";
import { useTransaction } from "../../../context/useTransaction";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export function AdminDashboardMenu() {
  const navigate = useNavigate();
  const { getAllUsers} = useAuth();
  const { getAllTransactions } = useTransaction();

  const [userCount, setUserCount] = useState(0);
  const [transactionCount, setTransactionCount] = useState(0);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getAllUsers();
        const transactions = await getAllTransactions();

        setUserCount(users.length);
        setTransactionCount(transactions.length);

        // Hitung transaksi per user
        const userTransactionCounts = {};
        transactions.forEach((tx) => {
          const userId = tx.transaction_user_id;
          userTransactionCounts[userId] = (userTransactionCounts[userId] || 0) + 1;
        });

        const labels = Object.keys(userTransactionCounts).map((id) => `User ${id}`);
        const data = Object.values(userTransactionCounts);

        setChartData({
          labels,
          datasets: [
            {
              label: "Jumlah Transaksi per User",
              data,
              backgroundColor: "rgba(16, 185, 129, 0.7)", // emerald
              borderRadius: 6,
            },
          ],
        });
      } catch (err) {
        console.error("❌ Error loading admin dashboard:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="pt-30 ps-50 flex items-center justify-center">
      <div className="max-w-5xl mx-auto pb-30">

        {/* Ringkasan Stat */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border border-emerald-100">
            <span className="text-sm text-gray-500 mb-2">Total User</span>
            <span className="text-3xl font-bold text-emerald-700 mb-2">
              {userCount}
            </span>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border border-emerald-100">
            <span className="text-sm text-gray-500 mb-2">Total Transaksi</span>
            <span className="text-3xl font-bold text-emerald-700 mb-2">
              {transactionCount}
            </span>
          </div>
        </div>

        {/* Grafik Transaksi */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-emerald-100">
          <h2 className="text-xl font-semibold text-emerald-700 mb-4">
            Grafik Jumlah Transaksi per User
          </h2>
          {chartData ? (
            <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false }}}} />
          ) : (
            <p className="text-gray-400 text-center">Loading grafik...</p>
          )}
        </div>
      </div>
    </main>
  );
}