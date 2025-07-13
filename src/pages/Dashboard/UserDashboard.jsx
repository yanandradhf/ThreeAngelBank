import { useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";
import { motion } from "framer-motion";
import { LogOut, Menu } from "lucide-react";

export default function UserDashboard() {
  const navigate = useNavigate();
  const { getUserById } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const localUser = JSON.parse(localStorage.getItem("user"));
      if (!localUser || !localUser.id) {
        navigate("/login");
        return;
      }

      try {
        const fetchedUser = await getUserById(localUser.id);
        setUser(fetchedUser);
      } catch (error) {
        console.error("Failed to fetch user", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate, getUserById]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading user info...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-emerald-200 overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -260 }}
        animate={{ x: sidebarOpen ? 0 : -260 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-64 bg-gradient-to-br from-emerald-600 via-emerald-500 to-green-500 text-white shadow-xl px-6 py-8 flex flex-col backdrop-blur-xl bg-opacity-80"
      >
        <h1 className="text-2xl font-bold text-white mb-10">
          Three Angels Bank
        </h1>

        <nav className="flex flex-col gap-5">
          <SidebarButton path="/dashboard" label="📊 Dashboard" />
          <SidebarButton
            path="/dashboard/transactions"
            label="💳 Transactions"
          />
          <SidebarButton path="/dashboard/analytics" label="📈 Analytics" />
        </nav>

        <div className="mt-auto text-sm">
          <p className="mb-2">Logged in as:</p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-300 flex items-center justify-center text-emerald-900 font-bold">
              {user.user_firstname.charAt(0)}
            </div>
            <span>{user.user_firstname}</span>
          </div>

          <button
            onClick={handleLogout}
            className="mt-4 flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-xl transition"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md border-b">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-emerald-600 hover:text-emerald-800"
          >
            <Menu size={26} />
          </button>
          <div className="text-lg font-bold text-emerald-800 tracking-wide">
            Dashboard
          </div>
          <div className="text-emerald-700 font-semibold text-base">
            Hello, {user.user_firstname}
          </div>
        </div>

        {/* Content Area */}
        <motion.main
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 overflow-y-auto p-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-xl p-8 transition"
          >
            <Outlet />
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
}

function SidebarButton({ path, label }) {
  const navigate = useNavigate();
  return (
    <motion.button
      whileHover={{ scale: 1.05, x: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={() => navigate(path)}
      className="text-left text-lg font-medium text-white hover:text-yellow-200 transition"
    >
      {label}
    </motion.button>
  );
}
