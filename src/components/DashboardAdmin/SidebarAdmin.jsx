import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Users,
  ArrowLeftCircle,
  ArrowRightCircle,
} from "lucide-react";
import { useState } from "react";

export function SidebarAdmin() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Nasabah",
      path: "/admin/dashboard/nasabah",
      icon: <Users size={18} />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* Tombol Toggle Sidebar di luar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-emerald-600 text-white rounded-lg shadow-lg hover:bg-emerald-700 transition"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -250, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -250, opacity: 0 }}
            transition={{ type: "spring", stiffness: 80 }}
            className="fixed top-0 left-0 h-full bg-gradient-to-br from-emerald-600 via-emerald-500 to-green-500 text-white w-64 p-6 shadow-2xl z-40"
            style={{ paddingTop: "4rem" }}
          >
            {/* Tombol Hide Sidebar di dalam */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-emerald-200 transition"
            >
              <ArrowLeftCircle size={24} />
            </button>

            <motion.h2
              className="text-3xl font-extrabold text-center tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-lime-300 via-white to-emerald-100 drop-shadow-lg mb-10"
              animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              Three Angels
            </motion.h2>

            <nav className="space-y-3">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  whileHover={{ scale: 1.05, x: 8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => navigate(item.path)}
                  className="flex items-center gap-3 w-full p-3 rounded-lg text-lg font-medium hover:bg-white/20 transition-colors duration-200 text-left"
                >
                  {item.icon}
                  {item.name}
                </motion.button>
              ))}
            </nav>

            <div className="mt-10 border-t border-white/30 pt-6 flex flex-col gap-3">
              <motion.button
                whileHover={{ scale: 1.05, x: 8 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={handleLogout}
                className="flex items-center gap-3 w-full p-3 rounded-lg text-lg font-medium hover:bg-red-500/80 transition-colors duration-200 text-left"
              >
                <LogOut size={18} />
                Logout
              </motion.button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
