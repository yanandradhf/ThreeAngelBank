import { useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function MainDashboardUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (!localUser) {
      navigate("/login");
    } else {
      setUser(localUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-sky-50 via-blue-100 to-indigo-100 overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 80 }}
        className="w-64 bg-gradient-to-br from-indigo-500 via-blue-600 to-blue-500 text-white shadow-xl px-6 py-8 flex flex-col backdrop-blur-xl bg-opacity-70 rounded-r-3xl"
      >
        <motion.h1
          className="text-3xl font-extrabold text-white mb-8 text-center tracking-wide"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          Three Angels
        </motion.h1>

        <nav className="flex flex-col gap-6">
          <SidebarButton path="/dashboard" label="📊 Dashboard" />
          <SidebarButton
            path="/dashboard/transactions"
            label="💳 Transactions"
          />
          <SidebarButton
            path="/dashboard/actionTransaction"
            label="📈 Action"
          />
          <SidebarButton path="/dashboard/profile" label="🙍‍♂️ My Profile" />
        </nav>

        {/* Profile Info */}
        {user && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 p-4 bg-white bg-opacity-20 backdrop-blur-md rounded-xl text-center text-white"
          >
            <div className="flex justify-center mb-3">
              <div className="w-16 h-16 rounded-full bg-indigo-300 flex items-center justify-center text-2xl font-bold shadow-inner">
                {user.user_firstname.charAt(0)}
              </div>
            </div>
            <h3 className="text-lg font-semibold">
              {user.user_firstname} {user.user_lastname}
            </h3>
            <p className="text-sm text-blue-100">{user.user_email}</p>
            <p className="text-xs mt-1 bg-blue-600 inline-block px-2 py-1 rounded-full">
              {user.user_role}
            </p>
          </motion.div>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-auto bg-red-400 hover:bg-red-500 text-white font-semibold py-2 rounded-xl transition"
        >
          🚪 Logout
        </button>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 p-8 overflow-y-auto"
      >
        <h2 className="text-3xl font-bold text-slate-800 mb-6">
          Welcome,{" "}
          <span className="text-indigo-600">{user?.user_firstname}</span> 👋
        </h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white bg-opacity-70 backdrop-blur-xl rounded-3xl shadow-xl p-6 min-h-[calc(100vh-150px)] transition"
        >
          <Outlet />
        </motion.div>
      </motion.main>
    </div>
  );
}

function SidebarButton({ path, label }) {
  const navigate = useNavigate();
  return (
    <motion.button
      whileHover={{ scale: 1.06, x: 8 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={() => navigate(path)}
      className="text-left font-medium text-lg text-white hover:text-yellow-300 transition"
    >
      {label}
    </motion.button>
  );
}
